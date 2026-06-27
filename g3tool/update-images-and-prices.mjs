import fs from 'fs';
import path from 'path';

const productDir = './src/content/products';
const imageDir = './public/images/products';

// Read all makita product JSON files
const files = fs.readdirSync(productDir).filter(f => f.startsWith('makita-') && f.endsWith('.json'));

// Realistic prices for Makita products (in VND)
const prices = {
  'makita-ddf490': 4500000,
  'makita-dlx2215tx2': 15500000,
  'makita-td002g': 6800000,
  'makita-dhk180rtj': 8200000,
  'makita-dhr183rtwj': 9500000,
  'makita-dtd134z': 3200000,
  'makita-dtd156sf1j': 5800000,
  'makita-dtp141rte': 7200000,
  'makita-ga5030': 2100000,
  'makita-ga9030r': 3500000,
  'makita-gb602': 4800000,
  'makita-gb801': 6500000,
  'makita-hr008gt201': 12500000,
  'makita-hr2470x5': 5200000,
  'makita-m6200b': 2800000,
  'makita-pc5000c': 8900000,
  'makita-dga408rtj1': 9800000,
};

console.log('📝 Updating product images and prices...\n');

for (const file of files) {
  const slug = file.replace('.json', '');
  const productPath = path.join(productDir, file);
  const content = fs.readFileSync(productPath, 'utf8');
  const product = JSON.parse(content);
  
  // Find the image file
  const imageFiles = fs.readdirSync(imageDir).filter(f => 
    f.toLowerCase().includes(slug.replace('makita-', '').replace('z', '')) &&
    !f.endsWith('.svg')
  );
  
  if (imageFiles.length > 0) {
    const imageName = imageFiles[0];
    product.image = `/images/products/${imageName}`;
    console.log(`✅ ${slug}: Image → ${imageName}`);
  } else {
    console.log(`⚠️  ${slug}: No image found`);
  }
  
  // Set price
  if (prices[slug]) {
    product.price = prices[slug];
    product.originalPrice = Math.round(prices[slug] * 1.15 / 100000) * 100000; // 15% higher
    console.log(`   💰 Price: ${product.price.toLocaleString('vi-VN')}đ`);
  }
  
  // Write back
  fs.writeFileSync(productPath, JSON.stringify(product, null, 2) + '\n', 'utf8');
}

console.log('\n✅ All products updated!\n');
