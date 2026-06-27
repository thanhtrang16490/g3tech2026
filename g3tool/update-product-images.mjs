import fs from 'fs';
import path from 'path';

const productDir = './src/content/products';
const files = fs.readdirSync(productDir);

// Map of product slugs to external image URLs
const externalImages = {
  // Makita products (from makitavietnam.com)
  'makita-ddf490z': 'https://makitavietnam.com/wp-content/uploads/2023/11/ddf490rtj-1.jpg',
  'makita-ga5030': 'https://makitavietnam.com/wp-content/uploads/2023/10/ga5030-1.jpg',
  
  // Bosch products (from bosch-tools.com)
  'bosch-gsr-120': 'https://bosch-professional.com/media/catalog/product/GSR_12V-15_FC_01.jpg',
  'bosch-gws-7-100t': 'https://bosch-professional.com/media/catalog/product/GWS_7-100T_01.jpg',
  'bosch-gsb-550': 'https://bosch-professional.com/media/catalog/product/GSB_550_01.jpg',
  'bosch-glm-50': 'https://bosch-professional.com/media/catalog/product/GLM_50_C_01.jpg',
  
  // DeWalt products
  'dewalt-dcd996m2': 'https://dewalt.com/sites/d/files/2020-09/DCD996M2_1.jpg',
  
  // Jasic products
  'jasic-arc-200': 'https://jasic.com.cn/uploadfile/image/20220418/ARC200.png',
  
  // Mitutoyo products
  'mitutoyo-543-720b': 'https://mitutoyo.com.vn/wp-content/uploads/2021/08/543-720B.png',
  'mitutoyo-293-340-30': 'https://mitutoyo.com.vn/wp-content/uploads/2021/08/293-340-30.jpg',
  
  // Arduino products
  'arduino-uno-r3': 'https://store.arduino.cc/cdn/shop/products/ABX00042.full_1.jpg',
  
  // Creality products
  'creality-ender-3-v3': 'https://creality.com/wp-content/uploads/2023/06/ender-3-v3-1.jpg',
  'creality-kr-one': 'https://creality.com/wp-content/uploads/2023/09/kr-one-1.jpg',
  
  // eSUN products
  'esun-pla-plus': 'https://esun3d.com/wp-content/uploads/2020/09/PLA-Plus-1.jpg',
  
  // Anycubic products
  'anycubic-kobra-2-neo': 'https://anycubic.com/cdn/shop/products/1_20f5d082-8c99-4e32-8e91-b3e6e4d6b0e2.jpg',
  
  // Raspberry Pi
  'raspberry-pi-4': 'https://www.raspberrypi.com/app/uploads/2020/09/Raspberry-Pi-4-Model-B-1.jpg',
  
  // Hakko
  'hakko-fx-888d': 'https://hakko.com/english/products/data/FX888D/FX888D_1.jpg',
};

let updatedCount = 0;

for (const file of files) {
  if (!file.endsWith('.json')) continue;
  
  const filePath = path.join(productDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const product = JSON.parse(content);
  const slug = file.replace('.json', '');
  
  if (externalImages[slug]) {
    const oldImage = product.image;
    product.image = externalImages[slug];
    
    // Write back
    fs.writeFileSync(filePath, JSON.stringify(product, null, 2) + '\n');
    updatedCount++;
    console.log(`✅ ${slug}: ${oldImage} → ${externalImages[slug]}`);
  }
}

console.log(`\n🎉 Updated ${updatedCount} products with external images!`);
