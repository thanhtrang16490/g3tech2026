import fs from 'fs';
import path from 'path';

const productDir = './src/content/products';
const files = fs.readdirSync(productDir).filter(f => f.startsWith('makita-') && f.endsWith('.json'));

const baseUrl = 'https://g3tool.com/images/products';

console.log('🌐 Updating products to use external URLs...\n');

let updatedCount = 0;

for (const file of files) {
  const slug = file.replace('.json', '');
  const productPath = path.join(productDir, file);
  const content = fs.readFileSync(productPath, 'utf8');
  const product = JSON.parse(content);
  
  const oldPath = product.image;
  const filename = oldPath.split('/').pop();
  const externalUrl = `${baseUrl}/${filename}`;
  
  if (product.image !== externalUrl) {
    product.image = externalUrl;
    fs.writeFileSync(productPath, JSON.stringify(product, null, 2) + '\n');
    console.log(`✅ ${slug}:`);
    console.log(`   ${externalUrl}\n`);
    updatedCount++;
  }
}

console.log(`\n🎉 Updated ${updatedCount} products to use external URLs!`);
console.log(`\nBase URL: ${baseUrl}`);
