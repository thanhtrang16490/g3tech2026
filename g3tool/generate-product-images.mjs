#!/usr/bin/env node
/**
 * Generate SVG placeholder images for G3Tool products
 * Creates professional-looking product placeholders with icons and text
 */

import fs from 'fs';
import path from 'path';

const products = [
  // Industrial Tools (8)
  { filename: 'drill-bosch-12v.jpg', icon: '🔧', label: 'Bosch GSR 12V', color: '#FF6B00' },
  { filename: 'bosch-gsb-12v-30.jpg', icon: '⚡', label: 'Bosch GSB 12V', color: '#FF6B00' },
  { filename: 'jasic-arc-200.jpg', icon: '⚡', label: 'Jasic ARC-200', color: '#0066CC' },
  { filename: 'mitutoyo-500-196-30.jpg', icon: '📏', label: 'Mitutoyo 500', color: '#00AA00' },
  { filename: 'makita-ddf490z.jpg', icon: '🔧', label: 'Makita DDF490Z', color: '#00A651' },
  { filename: 'dewalt-dcd996m2.jpg', icon: '⚡', label: 'DeWalt DCD996', color: '#FFB81C' },
  { filename: 'bosch-gws-7-100t.jpg', icon: '⚙️', label: 'Bosch GWS 7-100', color: '#FF6B00' },
  { filename: 'makita-ga5030.jpg', icon: '⚙️', label: 'Makita GA5030', color: '#00A651' },
  
  // Measuring Instruments (2)
  { filename: 'mitutoyo-543-720b.jpg', icon: '📊', label: 'Mitutoyo 543', color: '#00AA00' },
  
  // Electronics & IoT (4)
  { filename: 'arduino-uno-r3.jpg', icon: '💻', label: 'Arduino Uno R3', color: '#00979D' },
  { filename: 'arduino-starter-kit.jpg', icon: '🎁', label: 'Arduino Kit', color: '#00979D' },
  { filename: 'esp32-wifi.jpg', icon: '📡', label: 'ESP32 WiFi', color: '#E7352B' },
  { filename: 'dht22-sensor.jpg', icon: '🌡️', label: 'DHT22 Sensor', color: '#FF9900' },
  { filename: 'bmp280-sensor.jpg', icon: '🔬', label: 'BMP280 Sensor', color: '#3B82F6' },
  { filename: 'arduino-iot-kit.jpg', icon: '🌐', label: 'Arduino IoT', color: '#00979D' },
  
  // 3D Printing (4)
  { filename: 'ender-3-v3-se.jpg', icon: '🖨️', label: 'Ender-3 V3 SE', color: '#FF0000' },
  { filename: 'ender-3-v3-ke.jpg', icon: '🖨️', label: 'Ender-3 V3 KE', color: '#FF0000' },
  { filename: 'anycubic-kobra-2-neo.jpg', icon: '🖨️', label: 'Kobra 2 Neo', color: '#8B5CF6' },
  { filename: 'pla-filament-esun.jpg', icon: '🧵', label: 'PLA+ Filament', color: '#F59E0B' },
  { filename: 'petg-filament-esun.jpg', icon: '🧵', label: 'PETG Filament', color: '#3B82F6' }
];

const outputDir = './public/images/products';

function generateSVG(product) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <!-- Background -->
  <rect width="400" height="400" fill="#F9FAFB"/>
  
  <!-- Product Category Color Bar -->
  <rect x="0" y="0" width="400" height="8" fill="${product.color}"/>
  
  <!-- Icon Circle -->
  <circle cx="200" cy="150" r="60" fill="${product.color}" opacity="0.1"/>
  <circle cx="200" cy="150" r="45" fill="${product.color}" opacity="0.2"/>
  
  <!-- Product Icon -->
  <text x="200" y="170" font-size="64" text-anchor="middle" font-family="Arial, sans-serif">${product.icon}</text>
  
  <!-- Product Name -->
  <text x="200" y="260" font-size="24" font-weight="bold" text-anchor="middle" font-family="Arial, sans-serif" fill="#1F2937">${product.label}</text>
  
  <!-- Brand -->
  <text x="200" y="290" font-size="14" text-anchor="middle" font-family="Arial, sans-serif" fill="#6B7280">G3Tool - Chính hãng</text>
  
  <!-- Quality Badge -->
  <rect x="140" y="320" width="120" height="30" rx="15" fill="${product.color}"/>
  <text x="200" y="340" font-size="12" font-weight="bold" text-anchor="middle" font-family="Arial, sans-serif" fill="white">⭐ 4.8/5.0</text>
  
  <!-- Border -->
  <rect x="1" y="1" width="398" height="398" fill="none" stroke="#E5E7EB" stroke-width="2"/>
</svg>`;
}

async function main() {
  console.log('🎨 Generating G3Tool product images...\n');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let success = 0;
  let skipped = 0;
  
  for (const product of products) {
    const filePath = path.join(outputDir, product.filename);
    
    // Skip if already exists and is not a small SVG
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 1000) {
        console.log(`✅ ${product.filename} already exists (${(stats.size / 1024).toFixed(1)} KB)`);
        success++;
        continue;
      }
    }
    
    // Generate SVG
    const svg = generateSVG(product);
    fs.writeFileSync(filePath, svg);
    console.log(`✅ Generated: ${product.filename} (${product.label})`);
    success++;
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Generated: ${success}/${products.length}`);
  console.log(`   📁 Output: ${outputDir}`);
  console.log(`\n💡 Tip: Replace these SVGs with real product photos later`);
  console.log(`   Recommended size: 400x400px or larger`);
}

main().catch(console.error);
