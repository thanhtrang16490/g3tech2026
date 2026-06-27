import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const productDir = './src/content/products';
const imageDir = './public/images/products';
const files = fs.readdirSync(productDir);

console.log('📥 Downloading Makita product images...\n');

let downloadedCount = 0;

for (const file of files) {
  if (!file.endsWith('.json') || !file.startsWith('makita-')) continue;
  
  const filePath = path.join(productDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const product = JSON.parse(content);
  
  if (product.image && product.image.startsWith('https://makitavietnam.com')) {
    // Extract filename from URL
    const filename = product.image.split('/').pop();
    const localPath = `/images/products/${filename}`;
    const fullPath = path.join(imageDir, filename);
    
    if (!fs.existsSync(fullPath)) {
      try {
        // Download using curl
        execSync(`curl -s -o "${fullPath}" "${product.image}"`, { stdio: 'pipe' });
        
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).size > 1000) {
          console.log(`✅ Downloaded: ${filename} (${(fs.statSync(fullPath).size / 1024).toFixed(1)}KB)`);
        } else {
          console.log(`⚠️  Failed: ${filename} (file too small or invalid)`);
          fs.unlinkSync(fullPath);
          continue;
        }
      } catch (error) {
        console.log(`❌ Error downloading: ${filename}`);
        continue;
      }
    } else {
      console.log(`✅ Exists: ${filename}`);
    }
    
    // Update product JSON to use local path
    product.image = localPath;
    fs.writeFileSync(filePath, JSON.stringify(product, null, 2) + '\n');
    downloadedCount++;
  }
}

console.log(`\n🎉 Downloaded/updated ${downloadedCount} product images!`);
