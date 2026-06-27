/**
 * Scrape product images from thaihungsmarthome.com
 * Run: yarn scrape-images
 */
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Product categories and URLs from thaihungsmarthome.com
const PRODUCT_PAGES = [
  { id: 'aqara-hub-m3', url: 'https://thaihungsmarthome.com/bo-dieu-khien-trung-tam/', name: 'Aqara Hub M3' },
  { id: 'aqara-n100', url: 'https://thaihungsmarthome.com/khoa-thong-minh/', name: 'Aqara N100' },
  { id: 'aqara-z1-pro', url: 'https://thaihungsmarthome.com/cong-tac-thong-minh/', name: 'Aqara Z1 Pro' },
  { id: 'aqara-fp300', url: 'https://thaihungsmarthome.com/cac-loai-cam-bien/', name: 'Aqara FP300' },
  { id: 'aqara-g3', url: 'https://thaihungsmarthome.com/camera-thong-minh/', name: 'Aqara G3' },
];

// Fetch HTML from URL
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        fetchHTML(response.headers.location).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url}: ${response.statusCode}`));
        return;
      }
      
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

// Extract image URLs from HTML
function extractImages(html, productId) {
  const images = [];
  
  // Match WordPress image patterns
  const imgRegex = /<img[^>]+src=["']([^"']*?(?:wp-content|uploads)[^"']*?)["']/gi;
  let match;
  
  while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1];
    if (url.match(/\.(jpg|jpeg|png|webp)$/i)) {
      images.push(url);
    }
  }
  
  return images;
}

// Download file from URL
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(dest);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

// Main function
async function scrapeImages() {
  console.log('🚀 Scraping product images from thaihungsmarthome.com...\n');
  
  if (!fs.existsSync(IMAGES_DIR)) {
    await fsPromises.mkdir(IMAGES_DIR, { recursive: true });
    console.log('📁 Created images directory\n');
  }
  
  let downloaded = 0;
  
  for (const product of PRODUCT_PAGES) {
    try {
      console.log(`🔍 Fetching: ${product.name}...`);
      const html = await fetchHTML(product.url);
      const images = extractImages(html, product.id);
      
      if (images.length > 0) {
        console.log(`✅ Found ${images.length} images for ${product.name}`);
        
        // Download first image
        const imageUrl = images[0];
        const filename = `${product.id}.jpg`;
        const destPath = path.join(IMAGES_DIR, filename);
        
        if (fs.existsSync(destPath)) {
          console.log(`⏭️  Skipped: ${filename} (already exists)\n`);
          continue;
        }
        
        console.log(`⬇️  Downloading: ${filename}...`);
        await downloadFile(imageUrl, destPath);
        console.log(`✅ Downloaded: ${filename}\n`);
        downloaded++;
      } else {
        console.log(`⚠️  No images found for ${product.name}\n`);
      }
    } catch (error) {
      console.error(`❌ Error with ${product.name}: ${error.message}\n`);
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Downloaded: ${downloaded}`);
  console.log(`📁 Total pages: ${PRODUCT_PAGES.length}`);
  console.log('\n✨ Done!');
}

// Run
scrapeImages().catch(console.error);
