import fs from 'fs';
import path from 'path';

const productDir = './src/content/products';
const files = fs.readdirSync(productDir);

console.log('🔧 Fixing image paths for Makita products...\n');

let fixedCount = 0;

for (const file of files) {
  if (!file.endsWith('.json') || !file.startsWith('makita-')) continue;
  
  const filePath = path.join(productDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const product = JSON.parse(content);
  const slug = file.replace('.json', '');
  
  // Check if image path needs fixing
  if (product.image) {
    const oldPath = product.image;
    const filename = oldPath.split('/').pop();
    
    // Replace with correct makita filename
    const correctFilename = `${slug}.jpg`;
    const correctPath = `/images/products/${correctFilename}`;
    
    if (oldPath !== correctPath) {
      product.image = correctPath;
      fs.writeFileSync(filePath, JSON.stringify(product, null, 2) + '\n');
      console.log(`✅ ${slug}:`);
      console.log(`   Old: ${oldPath}`);
      console.log(`   New: ${correctPath}\n`);
      fixedCount++;
    }
  }
}

console.log(`\n🎉 Fixed ${fixedCount} product image paths!`);
