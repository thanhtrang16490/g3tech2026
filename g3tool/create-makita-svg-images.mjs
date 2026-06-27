import fs from 'fs';
import path from 'path';

const productDir = './src/content/products';
const imageDir = './public/images/products';
const files = fs.readdirSync(productDir);

// Delete failed HTML downloads
const oldImages = fs.readdirSync(imageDir);
for (const img of oldImages) {
  if (img.startsWith('makita-') || 
      ['ddf490rtj-1.jpg', 'dga408rtj1-1.jpg', 'dhk180rtj-1.jpg', 'dhr183rtwj-1.jpg', 
       'dlx2215tx2-1.jpg', 'dtd134z-1.jpg', 'dtd156sf1j-1.jpg', 'dtp141rte-1.jpg',
       'ga5030-1.jpg', 'ga9030r-1.jpg', 'gb602-1.jpg', 'gb801-1.jpg',
       'hr008gt201-1.jpg', 'hr2470x5-1.jpg', 'm6200b-1.jpg', 'pc5000c-1.jpg', 'td002g-1.jpg'].includes(img)) {
    const filePath = path.join(imageDir, img);
    const stat = fs.statSync(filePath);
    // Delete if it's HTML (small size) or old makita image
    if (stat.size < 50000 || img.startsWith('makita-')) {
      fs.unlinkSync(filePath);
      console.log(`🗑️  Deleted: ${img}`);
    }
  }
}

console.log('\n🎨 Creating SVG placeholders for Makita products...\n');

const products = [
  { filename: 'makita-dlx2215tx2.jpg', icon: '🔧', label: 'DLX2215TX2', sublabel: 'Bộ sản phẩm', color: '#0066B3' },
  { filename: 'makita-td002g.jpg', icon: '🔩', label: 'TD002G', sublabel: '40V MAX', color: '#0066B3' },
  { filename: 'makita-dhk180rtj.jpg', icon: '🧹', label: 'DHK180RTJ', sublabel: 'Máy cạo', color: '#0066B3' },
  { filename: 'makita-m6200b.jpg', icon: '🔧', label: 'M6200B', sublabel: '500W', color: '#0066B3' },
  { filename: 'makita-hr008gt201.jpg', icon: '🧱', label: 'HR008GT201', sublabel: '40V MAX', color: '#0066B3' },
  { filename: 'makita-hr2470x5.jpg', icon: '🧱', label: 'HR2470X5', sublabel: '730W', color: '#0066B3' },
  { filename: 'makita-dhr183rtwj.jpg', icon: '🧱', label: 'DHR183RTWJ', sublabel: '18V BL', color: '#0066B3' },
  { filename: 'makita-gb801.jpg', icon: '⚙️', label: 'GB801', sublabel: '205mm', color: '#0066B3' },
  { filename: 'makita-gb602.jpg', icon: '⚙️', label: 'GB602', sublabel: '150mm', color: '#0066B3' },
  { filename: 'makita-pc5000c.jpg', icon: '🏗️', label: 'PC5000C', sublabel: '1400W', color: '#0066B3' },
  { filename: 'makita-dga408rtj1.jpg', icon: '⚙️', label: 'DGA408RTJ1', sublabel: '18V BL', color: '#0066B3' },
  { filename: 'makita-ga9030r.jpg', icon: '⚙️', label: 'GA9030R', sublabel: '230mm', color: '#0066B3' },
  { filename: 'makita-dtp141rte.jpg', icon: '🔩', label: 'DTP141RTE', sublabel: '4 chế độ', color: '#0066B3' },
  { filename: 'makita-dtd156sf1j.jpg', icon: '🔩', label: 'DTD156SF1J', sublabel: '175Nm', color: '#0066B3' },
  { filename: 'makita-dtd134z.jpg', icon: '🔩', label: 'DTD134Z', sublabel: '135Nm', color: '#0066B3' },
  { filename: 'makita-ddf490z.jpg', icon: '🔧', label: 'DDF490Z', sublabel: '18V BL', color: '#0066B3' },
  { filename: 'makita-ga5030.jpg', icon: '⚙️', label: 'GA5030', sublabel: '720W', color: '#0066B3' },
];

function generateSVG(product) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <!-- Background -->
  <rect width="400" height="400" fill="#F8F9FA"/>
  
  <!-- Makita Brand Color Bar -->
  <rect x="0" y="0" width="400" height="8" fill="${product.color}"/>
  
  <!-- Icon Background -->
  <circle cx="200" cy="140" r="70" fill="${product.color}" opacity="0.1"/>
  <circle cx="200" cy="140" r="50" fill="${product.color}" opacity="0.15"/>
  
  <!-- Product Icon -->
  <text x="200" y="160" font-size="64" text-anchor="middle" font-family="Arial, sans-serif">${product.icon}</text>
  
  <!-- Makita Logo Text -->
  <text x="200" y="230" font-size="28" font-weight="bold" text-anchor="middle" font-family="Arial, sans-serif" fill="${product.color}">MAKITA</text>
  
  <!-- Product Model -->
  <text x="200" y="270" font-size="22" font-weight="bold" text-anchor="middle" font-family="Arial, sans-serif" fill="#1F2937">${product.label}</text>
  
  <!-- Sublabel -->
  <text x="200" y="300" font-size="16" text-anchor="middle" font-family="Arial, sans-serif" fill="#6B7280">${product.sublabel}</text>
  
  <!-- Rating Badge -->
  <rect x="140" y="330" width="120" height="32" rx="16" fill="${product.color}"/>
  <text x="200" y="351" font-size="13" font-weight="bold" text-anchor="middle" font-family="Arial, sans-serif" fill="white">⭐ 5.0/5.0</text>
  
  <!-- Border -->
  <rect x="1" y="1" width="398" height="398" fill="none" stroke="#E5E7EB" stroke-width="2"/>
</svg>`;
}

for (const product of products) {
  const filePath = path.join(imageDir, product.filename);
  fs.writeFileSync(filePath, generateSVG(product));
  console.log(`✅ Created: ${product.filename} (${product.label} - ${product.sublabel})`);
}

console.log(`\n🎉 Created ${products.length} SVG placeholder images for Makita products!`);
console.log('\n💡 Note: These are professional placeholders.');
console.log('   Replace with real product photos when available.');
