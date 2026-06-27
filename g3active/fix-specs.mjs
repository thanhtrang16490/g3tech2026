import fs from 'fs';
import path from 'path';

const productDir = './src/content/products';
const files = fs.readdirSync(productDir).filter(f => f.endsWith('.json'));

console.log('🔧 Fixing specs format for all products...\n');

for (const file of files) {
  const productPath = path.join(productDir, file);
  const content = fs.readFileSync(productPath, 'utf8');
  const product = JSON.parse(content);
  
  // Convert specs from object {key: value} to array ["key: value"]
  if (product.specs && typeof product.specs === 'object' && !Array.isArray(product.specs)) {
    product.specs = Object.entries(product.specs).map(([key, value]) => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      return `${label}: ${value}`;
    });
    console.log(`✅ ${file}: Converted ${product.specs.length} specs`);
  }
  
  // Write back
  fs.writeFileSync(productPath, JSON.stringify(product, null, 2) + '\n', 'utf8');
}

console.log('\n✅ All specs fixed!\n');
