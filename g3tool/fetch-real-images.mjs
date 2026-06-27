import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Map of product slugs to their Vietnamese names on makitavietnam.com
const productMap = {
  'makita-ddf490z': 'may-khoan-pin-ddf490z',
  'makita-dlx2215tx2': 'bo-san-pham-dlx2215tx2',
  'makita-td002g': 'may-siết-pin-td002g',
  'makita-dhk180rtj': 'may-khoan-khac-da-dhk180rtj',
  'makita-dhr183rtwj': 'may-khoan-bua-dhr183rtwj',
  'makita-dtd134z': 'may-siết-pin-dtd134z',
  'makita-dtd156sf1j': 'may-siết-pin-dtd156sf1j',
  'makita-dtp141rte': 'may-siết-pin-dtp141rte',
  'makita-ga5030': 'may-mai-ga5030',
  'makita-ga9030r': 'may-mai-ga9030r',
  'makita-gb602': 'may-mai-gb602',
  'makita-gb801': 'may-mai-gb801',
  'makita-hr008gt201': 'may-khoan-bua-hr008gt201',
  'makita-hr2470x5': 'may-khoan-bua-hr2470x5',
  'makita-m6200b': 'may-khoan-m6200b',
  'makita-pc5000c': 'may-cua-pc5000c',
  'makita-dga408rtj1': 'may-mai-pin-dga408rtj1',
};

const productDir = './src/content/products';
const results = {};

console.log('🔍 Fetching real image URLs from makitavietnam.com...\n');

for (const [slug, vietnameseName] of Object.entries(productMap)) {
  try {
    const productUrl = `https://makitavietnam.com/san-pham/${vietnameseName}/`;
    
    // Fetch product page
    const html = execSync(`curl -s -L "${productUrl}"`, { 
      stdio: 'pipe', timeout: 10000 
    }).toString();
    
    // Extract og:image
    const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) ||
                        html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
    
    if (ogImageMatch) {
      const imageUrl = ogImageMatch[1];
      results[slug] = imageUrl;
      console.log(`✅ ${slug}: ${imageUrl}`);
    } else {
      console.log(`❌ ${slug}: No image found`);
      results[slug] = null;
    }
  } catch (error) {
    console.log(`❌ ${slug}: Error - ${error.message}`);
    results[slug] = null;
  }
}

// Update product JSON files
console.log('\n\n📝 Updating product JSON files...\n');

for (const [slug, imageUrl] of Object.entries(results)) {
  if (imageUrl) {
    const productPath = path.join(productDir, `${slug}.json`);
    const content = fs.readFileSync(productPath, 'utf8');
    const product = JSON.parse(content);
    
    product.image = imageUrl;
    fs.writeFileSync(productPath, JSON.stringify(product, null, 2) + '\n', 'utf8');
    console.log(`✅ Updated ${slug}`);
  } else {
    console.log(`⏭️  Skipped ${slug} (no image found)`);
  }
}

console.log('\n✅ All products updated!\n');
