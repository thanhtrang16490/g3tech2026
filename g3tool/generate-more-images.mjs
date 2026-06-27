import fs from 'fs';
import path from 'path';

const products = [
  { filename: 'bosch-gsb-550.jpg', icon: '🔧', label: 'Bosch GSB 550', color: '#FF6B00' },
  { filename: 'esp32-devkit.jpg', icon: '📡', label: 'ESP32 DevKit', color: '#22C55E' },
  { filename: 'jbc-cd-2bce.jpg', icon: '🔥', label: 'JBC CD-2BCE', color: '#EF4444' },
  { filename: 'esun-pla-plus-black.jpg', icon: '🧵', label: 'eSUN PLA+ Black', color: '#1F2937' },
  { filename: 'arduino-starter-kit.jpg', icon: '📦', label: 'Arduino Kit', color: '#0EA5E9' }
];

const outputDir = './public/images/products';

function generateSVG(product) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#F9FAFB"/>
  <rect x="0" y="0" width="400" height="8" fill="${product.color}"/>
  <circle cx="200" cy="150" r="60" fill="${product.color}" opacity="0.1"/>
  <circle cx="200" cy="150" r="45" fill="${product.color}" opacity="0.2"/>
  <text x="200" y="170" font-size="64" text-anchor="middle" font-family="Arial, sans-serif">${product.icon}</text>
  <text x="200" y="260" font-size="24" font-weight="bold" text-anchor="middle" font-family="Arial, sans-serif" fill="#1F2937">${product.label}</text>
  <text x="200" y="290" font-size="14" text-anchor="middle" font-family="Arial, sans-serif" fill="#6B7280">G3Tool - Chính hãng</text>
  <rect x="140" y="320" width="120" height="30" rx="15" fill="${product.color}"/>
  <text x="200" y="340" font-size="12" font-weight="bold" text-anchor="middle" font-family="Arial, sans-serif" fill="white">⭐ 4.8/5.0</text>
  <rect x="1" y="1" width="398" height="398" fill="none" stroke="#E5E7EB" stroke-width="2"/>
</svg>`;
}

for (const product of products) {
  const filePath = path.join(outputDir, product.filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateSVG(product));
    console.log(`✅ Generated: ${product.filename}`);
  } else {
    console.log(`✅ Exists: ${product.filename}`);
  }
}

console.log('\n🎨 All product images generated!');
