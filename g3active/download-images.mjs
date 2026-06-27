/**
 * Download product images from thaihungsmarthome.com
 * Run: yarn download-images
 */
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Product images mapping from thaihungsmarthome.com
const PRODUCT_IMAGES = [
  {
    id: 'aqara-hub-m3',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-hub-m3.jpg',
    filename: 'aqara-hub-m3.jpg'
  },
  {
    id: 'aqara-magicpad-s1',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-magicpad-s1.jpg',
    filename: 'aqara-magicpad-s1.jpg'
  },
  {
    id: 'aqara-z1-pro',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-z1-pro.jpg',
    filename: 'aqara-z1-pro.jpg'
  },
  {
    id: 'aqara-h1',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-h1.jpg',
    filename: 'aqara-h1.jpg'
  },
  {
    id: 'aqara-s1e',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-s1e.jpg',
    filename: 'aqara-s1e.jpg'
  },
  {
    id: 'aqara-led-bulb-t2',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-led-t2.jpg',
    filename: 'aqara-led-t2.jpg'
  },
  {
    id: 'aqara-downlight-t2',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-downlight.jpg',
    filename: 'aqara-downlight.jpg'
  },
  {
    id: 'aqara-light-strip',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-strip.jpg',
    filename: 'aqara-strip.jpg'
  },
  {
    id: 'aqara-n100',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-n100.jpg',
    filename: 'aqara-n100.jpg'
  },
  {
    id: 'aqara-a100',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-a100.jpg',
    filename: 'aqara-a100.jpg'
  },
  {
    id: 'aqara-u400',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-u400.jpg',
    filename: 'aqara-u400.jpg'
  },
  {
    id: 'ezviz-y3000',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/ezviz-y3000.jpg',
    filename: 'ezviz-y3000.jpg'
  },
  {
    id: 'aqara-fp300',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-fp300.jpg',
    filename: 'aqara-fp300.jpg'
  },
  {
    id: 'aqara-p100',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-p100.jpg',
    filename: 'aqara-p100.jpg'
  },
  {
    id: 'aqara-fp2',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-fp2.jpg',
    filename: 'aqara-fp2.jpg'
  },
  {
    id: 'aqara-curtain-c1',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-curtain-c1.jpg',
    filename: 'aqara-curtain-c1.jpg'
  },
  {
    id: 'aqara-c3',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-c3.jpg',
    filename: 'aqara-c3.jpg'
  },
  {
    id: 'aqara-g3',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-g3.jpg',
    filename: 'aqara-g3.jpg'
  },
  {
    id: 'aqara-g400',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-g400.jpg',
    filename: 'aqara-g400.jpg'
  },
  {
    id: 'aqara-pet-feeder',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-pet-feeder.jpg',
    filename: 'aqara-pet-feeder.jpg'
  },
  {
    id: 'aqara-drying-rack',
    url: 'https://thaihungsmarthome.com/wp-content/uploads/2024/06/aqara-drying-rack.jpg',
    filename: 'aqara-drying-rack.jpg'
  }
];

// Download file from URL
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(dest);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(dest, () => {}); // Delete the file if there's an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Main function
async function downloadImages() {
  console.log('🚀 Downloading product images from thaihungsmarthome.com...\n');
  
  // Create images directory if it doesn't exist
  if (!fs.existsSync(IMAGES_DIR)) {
    await fsPromises.mkdir(IMAGES_DIR, { recursive: true });
    console.log('📁 Created images directory\n');
  }
  
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const product of PRODUCT_IMAGES) {
    const destPath = path.join(IMAGES_DIR, product.filename);
    
    // Skip if file already exists
    if (fs.existsSync(destPath)) {
      console.log(`⏭️  Skipped: ${product.filename} (already exists)`);
      skipped++;
      continue;
    }
    
    try {
      console.log(`⬇️  Downloading: ${product.filename}...`);
      await downloadFile(product.url, destPath);
      console.log(`✅ Downloaded: ${product.filename}`);
      downloaded++;
    } catch (error) {
      console.error(`❌ Failed: ${product.filename} - ${error.message}`);
      failed++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Downloaded: ${downloaded}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📁 Total: ${PRODUCT_IMAGES.length}`);
  console.log('\n✨ Done! Images saved to public/images/');
}

// Run
downloadImages().catch(console.error);
