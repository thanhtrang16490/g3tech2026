import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Corrected product URLs from makitavietnam.com
const productUrls = {
  'makita-ddf490z': 'https://makitavietnam.com/san-pham/may-khoan-van-vit-dung-pin-18v-makita-ddf490/',
  'makita-dlx2215tx2': 'https://makitavietnam.com/san-pham/bo-san-phamdhp484＋dga408-makita-dlx2215tx2/',
  'makita-td002g': 'https://makitavietnam.com/san-pham/td002gd202-may-bat-vit-dung-pinbl40v-max-kem-02-pin-2-5ah-1sac/',
  'makita-dhk180rtj': 'https://makitavietnam.com/san-pham/may-khoan-khac-da-dhk180rtj/',
  'makita-dhr183rtwj': 'https://makitavietnam.com/san-pham/may-khoan-be-tong-dhr183rtwj/',
  'makita-dtd134z': 'https://makitavietnam.com/san-pham/may-siet-pin-dtd134z/',
  'makita-dtd156sf1j': 'https://makitavietnam.com/san-pham/may-van-vit-makita-dtd156sf1j/',
  'makita-dtp141rte': 'https://makitavietnam.com/san-pham/may-bat-vit-4-che-do-dung-pin-dtp141rte-bl18v-sac-nhanhdc18rc-2-pin-5-0ahbl1850b/',
  'makita-ga5030': 'https://makitavietnam.com/san-pham/may-mai-goc-ga5030r/',
  'makita-ga9030r': 'https://makitavietnam.com/san-pham/may-mai-cam-tay-makita-ga9030-ga9030r/',
  'makita-gb602': 'https://makitavietnam.com/san-pham/may-mai-ban-gb602/',
  'makita-gb801': 'https://makitavietnam.com/san-pham/may-mai-ban-gb801/',
  'makita-hr008gt201': 'https://makitavietnam.com/san-pham/may-khoan-be-tong-3-chuc-nang-dung-pin-hr008gt201-kem-02-pin-5-0-sac-nhanh/',
  'makita-hr2470x5': 'https://makitavietnam.com/san-pham/may-khoan-be-tong-3-chuc-nang-makita-hr2470x5/',
  'makita-m6200b': 'https://makitavietnam.com/san-pham/may-khoan-m6200b/',
  'makita-pc5000c': 'https://makitavietnam.com/san-pham/may-cua-gach-pc5000c/',
  'makita-dga408rtj1': 'https://makitavietnam.com/san-pham/may-mai-dung-pin-dga408rtj1/',
};

const productDir = './src/content/products';

console.log('🔍 Fetching real image URLs from makitavietnam.com...\n');

const results = {};

for (const [slug, url] of Object.entries(productUrls)) {
  try {
    console.log(`Fetching: ${slug}...`);
    
    // Fetch product page
    const html = execSync(`curl -s -L "${url}"`, { 
      stdio: 'pipe', timeout: 10000 
    }).toString();
    
    // Extract og:image
    const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) ||
                        html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
    
    if (ogImageMatch) {
      const imageUrl = ogImageMatch[1];
      results[slug] = imageUrl;
      console.log(`✅ Found: ${imageUrl}\n`);
    } else {
      console.log(`❌ No image found\n`);
      results[slug] = null;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
    results[slug] = null;
  }
}

// Update product JSON files
console.log('\n📝 Updating product JSON files...\n');

let updated = 0;
for (const [slug, imageUrl] of Object.entries(results)) {
  if (imageUrl) {
    const productPath = path.join(productDir, `${slug}.json`);
    const content = fs.readFileSync(productPath, 'utf8');
    const product = JSON.parse(content);
    
    product.image = imageUrl;
    fs.writeFileSync(productPath, JSON.stringify(product, null, 2) + '\n', 'utf8');
    console.log(`✅ Updated ${slug}`);
    updated++;
  } else {
    console.log(`⏭️  Skipped ${slug}`);
  }
}

console.log(`\n✅ Updated ${updated} products!\n`);
