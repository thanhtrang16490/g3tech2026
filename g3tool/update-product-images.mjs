#!/usr/bin/env node

import https from 'https';
import fs from 'fs';
import path from 'path';

const productsDir = './src/content/products';

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' },
      followRedirect: true
    }, (res) => {
      // Follow redirects manually
      if (res.statusCode === 301 || res.statusCode === 302) {
        const location = res.headers.location;
        if (location) {
          fetchPage(location.startsWith('http') ? location : `https://thaihungsmarthome.com${location}`)
            .then(resolve)
            .catch(reject);
          return;
        }
      }
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function getProductImage(productUrl) {
  try {
    const html = await fetchPage(productUrl);
    
    // Try to find main product image (various patterns)
    const patterns = [
      /<meta[^>]*property="og:image"[^>]*content="([^"]*)"/i,
      /<meta[^>]*content="([^"]*)"[^>]*property="og:image"/i,
      /<img[^>]*class="[^"]*wp-post-image[^""]*"[^>]*src="([^"]*)"/i,
      /<div[^>]*class="[^"]*woocommerce-product-gallery__image[^"]*"[^>]*href="([^"]*)"/i,
      /<a[^>]*class="[^"]*woocommerce-product-gallery__image[^"]*"[^>]*href="([^"]*)"/i,
      /<img[^>]*data-src="(https:\/\/[^"']*wp-content\/uploads\/[^"']*\.(jpg|png|webp))"/i,
      /<img[^>]*src="(https:\/\/[^"']*wp-content\/uploads\/[^"']*\.(jpg|png|webp))"[^>]*class="[^"]*attachment-/i,
    ];
    
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        // Get the base URL without size suffix
        let imageUrl = match[1];
        // Remove size suffix like -400x300, -768x500, etc.
        imageUrl = imageUrl.replace(/-\d+x\d+(\.\w+)$/, '$1');
        return imageUrl;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching ${productUrl}:`, error.message);
    return null;
  }
}

async function updateProductImage(filePath, imageUrl) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const updated = content.replace(
    /"image":\s*"[^"]*"/,
    `"image": "${imageUrl}"`
  );
  fs.writeFileSync(filePath, updated, 'utf-8');
}

async function main() {
  const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));
  
  console.log(`📦 Found ${files.length} products to update\n`);
  
  for (const file of files) {
    const filePath = path.join(productsDir, file);
    const product = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    const productId = file.replace('.json', '');
    const sourceUrl = product.sourceUrl || `https://thaihungsmarthome.com/san-pham/${productId}`;
    
    console.log(`🔍 Processing: ${product.name}`);
    console.log(`   URL: ${sourceUrl}`);
    
    const imageUrl = await getProductImage(sourceUrl);
    
    if (imageUrl) {
      console.log(`✅ Image: ${imageUrl}`);
      await updateProductImage(filePath, imageUrl);
    } else {
      console.log(`⚠️  No image found, keeping placeholder`);
    }
    
    // Delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n✅ Done! All products updated.');
}

main().catch(console.error);
