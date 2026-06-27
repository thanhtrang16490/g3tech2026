import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const productDir = './src/content/products';
const imageDir = './public/images/products';

console.log('🔄 Renaming SVG files from .jpg to .svg...\n');

// Get all makita product files
const files = fs.readdirSync(productDir).filter(f => f.startsWith('makita-') && f.endsWith('.json'));

let renamedCount = 0;

for (const file of files) {
  const slug = file.replace('.json', '');
  const oldImagePath = path.join(imageDir, `${slug}.jpg`);
  const newImagePath = path.join(imageDir, `${slug}.svg`);
  
  if (fs.existsSync(oldImagePath)) {
    // Rename file
    fs.renameSync(oldImagePath, newImagePath);
    console.log(`📝 Renamed: ${slug}.jpg → ${slug}.svg`);
    
    // Update product JSON
    const productPath = path.join(productDir, file);
    const content = fs.readFileSync(productPath, 'utf8');
    const product = JSON.parse(content);
    
    product.image = product.image.replace('.jpg', '.svg');
    fs.writeFileSync(productPath, JSON.stringify(product, null, 2) + '\n');
    console.log(`✅ Updated: ${file} image path\n`);
    
    renamedCount++;
  }
}

console.log(`\n🎉 Renamed ${renamedCount} files from .jpg to .svg!`);
