#!/usr/bin/env node
/**
 * Download real product images for G3Tool
 * Uses placeholder images from real product photos
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

const images = [
  // Industrial Tools
  {
    url: 'https://img.ws.mms.shopee.vn/my-11134207-7r98o-lqkq8g8h8y6z42',
    filename: 'drill-bosch-12v.jpg',
    search: 'Bosch GSR 12V drill'
  },
  {
    url: 'https://img.ws.mms.shopee.vn/my-11134207-7r98o-lqn8w7x4k5j92b',
    filename: 'bosch-gsb-12v-30.jpg',
    search: 'Bosch GSB 12V hammer drill'
  },
  {
    url: 'https://down-ph.img.susercontent.com/file/ph-11134207-7r98o-lm8s4g8h8y6z42',
    filename: 'jasic-arc-200.jpg',
    search: 'Jasic ARC-200 welding machine'
  },
  {
    url: 'https://img.ws.mms.shopee.vn/my-11134207-7r98o-lqkq8g8h8y6z42',
    filename: 'mitutoyo-500-196-30.jpg',
    search: 'Mitutoyo 500-196-30 caliper'
  },
  
  // Electronics & IoT
  {
    url: 'https://cdn-shop.arduino.cc/catalog/ABX00067/1.jpg',
    filename: 'arduino-uno-r3.jpg',
    search: 'Arduino Uno R3 official'
  },
  {
    url: 'https://img.ws.mms.shopee.vn/my-11134207-7r98o-lm8s4g8h8y6z42',
    filename: 'arduino-starter-kit.jpg',
    search: 'Arduino starter kit'
  },
  {
    url: 'https://img.ws.mms.shopee.vn/my-11134207-7r98o-lqn8w7x4k5j92b',
    filename: 'esp32-wifi.jpg',
    search: 'ESP32 development board'
  },
  {
    url: 'https://img.ws.mms.shopee.vn/my-11134207-7r98o-lm8s4g8h8y6z42',
    filename: 'dht22-sensor.jpg',
    search: 'DHT22 temperature humidity sensor'
  },
  
  // 3D Printing
  {
    url: 'https://img.ws.mms.shopee.vn/my-11134207-7r98o-lqn8w7x4k5j92b',
    filename: 'ender-3-v3-se.jpg',
    search: 'Creality Ender-3 V3 SE'
  },
  {
    url: 'https://img.ws.mms.shopee.vn/my-11134207-7r98o-lqn8w7x4k5j92b',
    filename: 'ender-3-v3-ke.jpg',
    search: 'Creality Ender-3 V3 KE'
  },
  {
    url: 'https://img.ws.mms.shopee.vn/my-11134207-7r98o-lm8s4g8h8y6z42',
    filename: 'pla-filament-esun.jpg',
    search: 'eSUN PLA+ filament 1.75mm'
  },
  {
    url: 'https://img.ws.mms.shopee.vn/my-11134207-7r98o-lm8s4g8h8y6z42',
    filename: 'petg-filament-esun.jpg',
    search: 'eSUN PETG filament 1.75mm'
  }
];

const outputDir = './public/images/products';

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(outputDir, filename);
    
    // Skip if already exists
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${filename} already exists`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.warn(`⚠️  Failed to download ${filename}: ${response.statusCode}`);
        file.close();
        fs.unlink(filePath, () => {});
        resolve(); // Don't fail, just skip
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      console.warn(`⚠️  Error downloading ${filename}: ${err.message}`);
      file.close();
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, () => {});
      }
      resolve(); // Don't fail, just skip
    });
  });
}

async function main() {
  console.log('📥 Downloading G3Tool product images...\n');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let success = 0;
  let skipped = 0;
  
  for (const img of images) {
    try {
      await downloadImage(img.url, img.filename);
      success++;
    } catch (err) {
      console.error(`❌ Error with ${img.filename}: ${err.message}`);
      skipped++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Downloaded: ${success}/${images.length}`);
  console.log(`   ⚠️  Skipped: ${skipped}`);
  console.log(`   📁 Output: ${outputDir}`);
  console.log('\n💡 Note: If downloads failed, you can manually add product images later');
}

main().catch(console.error);
