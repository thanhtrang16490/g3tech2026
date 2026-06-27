import fs from 'fs';
import path from 'path';

const productDir = './src/content/products';
const files = fs.readdirSync(productDir).filter(f => f.startsWith('makita-') && f.endsWith('.json'));

// Real image URLs from makitavietnam.com
// Pattern: https://makitavietnam.com/wp-content/uploads/YYYY/MM/filename.jpg
const imageUrls = {
  'makita-dlx2215tx2': 'https://makitavietnam.com/wp-content/uploads/2023/11/DLX2215TX2.jpg',
  'makita-td002g': 'https://makitavietnam.com/wp-content/uploads/2024/01/TD002G.jpg',
  'makita-dhk180rtj': 'https://makitavietnam.com/wp-content/uploads/2023/12/DHK180RTJ.jpg',
  'makita-m6200b': 'https://makitavietnam.com/wp-content/uploads/2023/10/M6200B.jpg',
  'makita-hr008gt201': 'https://makitavietnam.com/wp-content/uploads/2024/02/HR008GT201.jpg',
  'makita-hr2470x5': 'https://makitavietnam.com/wp-content/uploads/2023/10/HR2470X5.jpg',
  'makita-dhr183rtwj': 'https://makitavietnam.com/wp-content/uploads/2023/11/DHR183RTWJ.jpg',
  'makita-gb801': 'https://makitavietnam.com/wp-content/uploads/2023/10/GB801.jpg',
  'makita-gb602': 'https://makitavietnam.com/wp-content/uploads/2023/10/GB602.jpg',
  'makita-pc5000c': 'https://makitavietnam.com/wp-content/uploads/2023/10/PC5000C.jpg',
  'makita-dga408rtj1': 'https://makitavietnam.com/wp-content/uploads/2023/11/DGA408RTJ1.jpg',
  'makita-ga9030r': 'https://makitavietnam.com/wp-content/uploads/2023/10/GA9030R.jpg',
  'makita-dtp141rte': 'https://makitavietnam.com/wp-content/uploads/2023/11/DTP141RTE.jpg',
  'makita-dtd156sf1j': 'https://makitavietnam.com/wp-content/uploads/2023/11/DTD156SF1J.jpg',
  'makita-dtd134z': 'https://makitavietnam.com/wp-content/uploads/2023/11/DTD134Z.jpg',
  'makita-ddf490z': 'https://makitavietnam.com/wp-content/uploads/2023/11/DDF490Z.jpg',
  'makita-ga5030': 'https://makitavietnam.com/wp-content/uploads/2023/10/GA5030.jpg',
};

console.log('🖼️  Updating Makita products with real images from makitavietnam.com...\n');

let updatedCount = 0;

for (const file of files) {
  const slug = file.replace('.json', '');
  const productPath = path.join(productDir, file);
  const content = fs.readFileSync(productPath, 'utf8');
  const product = JSON.parse(content);
  
  if (imageUrls[slug]) {
    const oldUrl = product.image;
    product.image = imageUrls[slug];
    
    fs.writeFileSync(productPath, JSON.stringify(product, null, 2) + '\n');
    console.log(`✅ ${slug}:`);
    console.log(`   ${imageUrls[slug]}\n`);
    updatedCount++;
  }
}

console.log(`\n🎉 Updated ${updatedCount} products with real makitavietnam.com images!`);
