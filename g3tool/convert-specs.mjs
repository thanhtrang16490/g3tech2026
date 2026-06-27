import fs from 'fs';
import path from 'path';

const productDir = './src/content/products';

// Read all makita product JSON files
const files = fs.readdirSync(productDir).filter(f => f.startsWith('makita-') && f.endsWith('.json'));

console.log('🔧 Converting specs from objects to string arrays...\n');

for (const file of files) {
  const productPath = path.join(productDir, file);
  const content = fs.readFileSync(productPath, 'utf8');
  const product = JSON.parse(content);
  
  // Convert specs from [{label, value}] to ['label: value']
  if (Array.isArray(product.specs) && product.specs.length > 0) {
    if (typeof product.specs[0] === 'object') {
      product.specs = product.specs.map((spec) => 
        `${spec.label}: ${spec.value}`
      );
      console.log(`✅ ${file}: Converted ${product.specs.length} specs`);
    }
  }
  
  // Write back
  fs.writeFileSync(productPath, JSON.stringify(product, null, 2) + '\n', 'utf8');
}

console.log('\n✅ All specs converted to string arrays!\n');
