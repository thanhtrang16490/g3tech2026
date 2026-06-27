import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const productDir = './src/content/products';
const files = fs.readdirSync(productDir).filter(f => f.startsWith('makita-') && f.endsWith('.json'));

console.log('🔍 Checking image URLs for all Makita products...\n');

for (const file of files) {
  const slug = file.replace('.json', '');
  const productPath = path.join(productDir, file);
  const content = fs.readFileSync(productPath, 'utf8');
  const product = JSON.parse(content);
  
  const imageUrl = product.image;
  
  // Test if URL is accessible using curl
  try {
    const result = execSync(`curl -s -o /dev/null -w "%{http_code}" "${imageUrl}"`, { 
      stdio: 'pipe',
      timeout: 5000 
    }).toString();
    
    if (result === '200') {
      console.log(`✅ ${slug}:`);
      console.log(`   ${imageUrl}`);
      console.log(`   Status: ${result} OK\n`);
    } else {
      console.log(`❌ ${slug}:`);
      console.log(`   ${imageUrl}`);
      console.log(`   Status: ${result} FAILED\n`);
    }
  } catch (error) {
    console.log(`❌ ${slug}:`);
    console.log(`   ${imageUrl}`);
    console.log(`   Status: TIMEOUT or ERROR\n`);
  }
}
