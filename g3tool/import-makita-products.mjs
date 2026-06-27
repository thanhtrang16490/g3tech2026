import fs from 'fs';
import path from 'path';

const productDir = './src/content/products';

// First, delete all non-Makita products
const files = fs.readdirSync(productDir);
console.log('🗑️  Deleting old products...');

for (const file of files) {
  if (!file.endsWith('.json')) continue;
  
  const slug = file.replace('.json', '');
  // Keep only makita products, delete others
  if (!slug.startsWith('makita-')) {
    const filePath = path.join(productDir, file);
    fs.unlinkSync(filePath);
    console.log(`  ❌ Deleted: ${file}`);
  }
}

// New Makita products from makitavietnam.com
const makitaProducts = [
  {
    slug: 'makita-dlx2215tx2',
    name: 'Bộ Sản Phẩm DHP484＋DGA408 Makita DLX2215TX2',
    price: 15500000,
    originalPrice: 18000000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/11/dlx2215tx2-1.jpg',
    badge: 'Bộ sản phẩm',
    newArrival: true,
    featured: true,
    rating: 5.0,
    reviews: 45,
    description: 'Bộ sản phẩm gồm máy khoan DHP484 và máy mài DGA408, pin 18V 5.0Ah, sạc nhanh, hộp đựng',
    specs: [
      'Bộ sản phẩm: Máy khoan DHP484 + Máy mài DGA408',
      'Pin: 2x 18V 5.0Ah (BL1850B)',
      'Sạc: DC18RC (sạc nhanh)',
      'Hộp đựng: MacPac',
      'Bảo hành: 12 tháng Makita'
    ]
  },
  {
    slug: 'makita-td002g',
    name: 'Máy Bắt Vít Dùng Pin BL 40V MAX TD002G',
    price: 9500000,
    originalPrice: 11000000,
    image: 'https://makitavietnam.com/wp-content/uploads/2024/01/td002g-1.jpg',
    badge: 'Hot',
    newArrival: true,
    featured: true,
    rating: 5.0,
    reviews: 67,
    description: 'Máy bắt vít dùng pin BL 40V MAX, mô-men xoắn cực đại, động cơ brushless',
    specs: [
      'Điện áp: 40V MAX',
      'Động cơ: Brushless (không chổi than)',
      'Mô-men xoắn: 180 Nm',
      'Tốc độ: 0-2,200 vòng/phút',
      'Bảo hành: 12 tháng Makita'
    ]
  },
  {
    slug: 'makita-dhk180rtj',
    name: 'Máy Cạo Động Lực Dùng Pin BL 18V DHK180RTJ',
    price: 9950000,
    originalPrice: 11500000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/12/dhk180rtj-1.jpg',
    badge: 'Mới',
    newArrival: true,
    featured: true,
    rating: 5.0,
    reviews: 34,
    description: 'Máy cạo động lực dùng pin BL 18V, phù hợp cạo sơn, vữa, keo, kèm 2 pin 5.0Ah và sạc nhanh',
    specs: [
      'Điện áp: 18V LXT',
      'Động cơ: Brushless',
      'Chiều rộng cạo: 80mm',
      'Hành trình: 1.8mm',
      'Pin: 2x 5.0Ah + sạc nhanh DC18RC'
    ]
  },
  {
    slug: 'makita-m6200b',
    name: 'Máy Khoan 2 Tay Cầm Makita M6200B 13mm',
    price: 1720000,
    originalPrice: 2100000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/10/m6200b-1.jpg',
    badge: 'Giá tốt',
    newArrival: false,
    featured: true,
    rating: 5.0,
    reviews: 123,
    description: 'Máy khoan 2 tay cầm Makita M6200B, đầu kẹp 13mm, công suất 500W, giá rẻ nhất',
    specs: [
      'Công suất: 500W',
      'Đầu kẹp: 13mm có chìa',
      'Tốc độ: 0-900 vòng/phút',
      '2 tay cầm (ổn định hơn)',
      'Bảo hành: 12 tháng Makita'
    ]
  },
  {
    slug: 'makita-hr008gt201',
    name: 'Máy Khoan Bê Tông 3 Chức Năng Dùng Pin HR008GT201',
    price: 20040000,
    originalPrice: 23500000,
    image: 'https://makitavietnam.com/wp-content/uploads/2024/02/hr008gt201-1.jpg',
    badge: 'Hot',
    newArrival: true,
    featured: true,
    rating: 5.0,
    reviews: 28,
    description: 'Máy khoan bê tông 3 chức năng dùng pin 40V, khoan/khoan búa/đục, kèm 2 pin 5.0Ah và sạc nhanh',
    specs: [
      'Điện áp: 40V MAX',
      '3 chức năng: Khoan/Khoan búa/Đục',
      'Đường kính khoan: 26mm (bê tông)',
      'Năng lượng đập: 3.0J',
      'Pin: 2x 5.0Ah + sạc nhanh'
    ]
  },
  {
    slug: 'makita-hr2470x5',
    name: 'Máy Khoan Bê Tông 3 Chức Năng Makita HR2470X5',
    price: 3420000,
    originalPrice: 4100000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/10/hr2470x5-1.jpg',
    badge: 'Bán chạy',
    newArrival: false,
    featured: true,
    rating: 5.0,
    reviews: 189,
    description: 'Máy khoan bê tông 3 chức năng HR2470X5, công suất 730W, khoan 24mm, giá tốt nhất',
    specs: [
      'Công suất: 730W',
      'Đường kính khoan: 24mm (bê tông)',
      '3 chức năng: Khoan/Khoan búa/Đục',
      'Năng lượng đập: 2.7J',
      'Bảo hành: 12 tháng Makita'
    ]
  },
  {
    slug: 'makita-dhr183rtwj',
    name: 'Máy Khoan Bê Tông Dùng Pin DHR183RTWJ SDS-PLUS 18mm BL 18V',
    price: 12190000,
    originalPrice: 14500000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/11/dhr183rtwj-1.jpg',
    badge: 'Chính hãng',
    newArrival: false,
    featured: true,
    rating: 5.0,
    reviews: 76,
    description: 'Máy khoan bê tông dùng pin DHR183RTWJ, chuôi gài SDS-PLUS 18mm, động cơ brushless, kèm 2 pin 5.0Ah',
    specs: [
      'Điện áp: 18V LXT',
      'Đường kính khoan: 18mm (bê tông)',
      'Chuôi gài: SDS-PLUS',
      'Động cơ: Brushless',
      'Pin: 2x 5.0Ah + hộp MacPac'
    ]
  },
  {
    slug: 'makita-gb801',
    name: 'Máy Mài 2 Đá Makita GB801 205mm',
    price: 4960000,
    originalPrice: 5800000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/10/gb801-1.jpg',
    badge: 'Hot',
    newArrival: false,
    featured: true,
    rating: 5.0,
    reviews: 92,
    description: 'Máy mài 2 đá Makita GB801, đường kính đá 205mm, công suất 350W, phù hợp mài dao, dụng cụ',
    specs: [
      'Công suất: 350W',
      'Đường kính đá: 205mm',
      'Tốc độ: 3,000 vòng/phút',
      '2 đá mài (thô + mịn)',
      'Bảo hành: 12 tháng Makita'
    ]
  },
  {
    slug: 'makita-gb602',
    name: 'Máy Mài Bàn 2 Đá Makita GB602 150mm',
    price: 3050000,
    originalPrice: 3600000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/10/gb602-1.jpg',
    badge: 'Giá tốt',
    newArrival: false,
    featured: true,
    rating: 5.0,
    reviews: 145,
    description: 'Máy mài bàn 2 đá GB602, đường kính đá 150mm, công suất 250W, giá rẻ nhất',
    specs: [
      'Công suất: 250W',
      'Đường kính đá: 150mm',
      'Tốc độ: 2,950 vòng/phút',
      '2 đá mài',
      'Bảo hành: 12 tháng Makita'
    ]
  },
  {
    slug: 'makita-pc5000c',
    name: 'Máy Mài Bê Tông Makita PC5000C',
    price: 9380000,
    originalPrice: 11000000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/10/pc5000c-1.jpg',
    badge: 'Professional',
    newArrival: false,
    featured: true,
    rating: 5.0,
    reviews: 56,
    description: 'Máy mài bê tông PC5000C, công suất 1400W, đĩa 125mm, điều khiển điện tử, phù hợp sàn công nghiệp',
    specs: [
      'Công suất: 1400W',
      'Đường kính đĩa: 125mm',
      'Tốc độ: 10,000 vòng/phút',
      'Điều khiển điện tử (constant speed)',
      'Bảo hành: 12 tháng Makita'
    ]
  },
  {
    slug: 'makita-dga408rtj1',
    name: 'Máy Mài Cầm Tay Dùng Pin DGA408RTJ1 18V BL',
    price: 10030000,
    originalPrice: 11800000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/11/dga408rtj1-1.jpg',
    badge: 'Hot',
    newArrival: true,
    featured: true,
    rating: 5.0,
    reviews: 87,
    description: 'Máy mài cầm tay dùng pin DGA408RTJ1, đĩa 125mm, động cơ brushless, kèm 2 pin 5.0Ah và sạc nhanh',
    specs: [
      'Điện áp: 18V LXT',
      'Đường kính đĩa: 125mm',
      'Động cơ: Brushless',
      'Tốc độ: 8,500 vòng/phút',
      'Pin: 2x 5.0Ah + sạc nhanh'
    ]
  },
  {
    slug: 'makita-ga9030r',
    name: 'Máy Mài Cầm Tay Makita GA9030R 230mm',
    price: 2850000,
    originalPrice: 3400000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/10/ga9030r-1.jpg',
    badge: 'Bán chạy',
    newArrival: false,
    featured: true,
    rating: 5.0,
    reviews: 234,
    description: 'Máy mài cầm tay GA9030R, đĩa 230mm, công suất 2200W, mạnh mẽ nhất, phù hợp cắt sắt thép',
    specs: [
      'Công suất: 2200W',
      'Đường kính đĩa: 230mm (9 inches)',
      'Tốc độ: 6,600 vòng/phút',
      'Tay cầm chống rung',
      'Bảo hành: 12 tháng Makita'
    ]
  },
  {
    slug: 'makita-dtp141rte',
    name: 'Máy Bắt Vít 4 Chế Độ Dùng Pin DTP141RTE BL 18V',
    price: 7850000,
    originalPrice: 9200000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/11/dtp141rte-1.jpg',
    badge: '4 chế độ',
    newArrival: true,
    featured: true,
    rating: 5.0,
    reviews: 98,
    description: 'Máy bắt vít 4 chế độ DTP141RTE, mô-men xoắn 165Nm, động cơ brushless, kèm 2 pin 5.0Ah',
    specs: [
      'Điện áp: 18V LXT',
      'Mô-men xoắn: 165 Nm',
      '4 chế độ hoạt động',
      'Tốc độ: 0-2,100 vòng/phút',
      'Pin: 2x 5.0Ah + sạc nhanh'
    ]
  },
  {
    slug: 'makita-dtd156sf1j',
    name: 'Máy Bắt Vít Dùng Pin DTD156SF1J 18V',
    price: 4170000,
    originalPrice: 4900000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/11/dtd156sf1j-1.jpg',
    badge: 'Giá tốt',
    newArrival: false,
    featured: true,
    rating: 5.0,
    reviews: 156,
    description: 'Máy bắt vít dùng pin DTD156SF1J, mô-men xoắn 175Nm, kèm 1 pin 3.0Ah và sạc, hộp đựng',
    specs: [
      'Điện áp: 18V LXT',
      'Mô-men xoắn: 175 Nm',
      'Tốc độ: 0-3,500 vòng/phút',
      'Pin: 1x 3.0Ah (BL1830B)',
      'Hộp đựng: MacPac'
    ]
  },
  {
    slug: 'makita-dtd134z',
    name: 'Máy Bắt Vít Dùng Pin Makita DTD134Z (Không Kèm Pin Sạc)',
    price: 2150000,
    originalPrice: 2600000,
    image: 'https://makitavietnam.com/wp-content/uploads/2023/11/dtd134z-1.jpg',
    badge: 'Giá rẻ',
    newArrival: false,
    featured: false,
    rating: 5.0,
    reviews: 289,
    description: 'Máy bắt vít dùng pin DTD134Z, thân máy không kèm pin sạc, mô-men xoắn 135Nm, giá rẻ nhất',
    specs: [
      'Điện áp: 18V LXT',
      'Mô-men xoắn: 135 Nm',
      'Tốc độ: 0-3,600 vòng/phút',
      'Không kèm pin và sạc',
      'Bảo hành: 12 tháng Makita'
    ]
  }
];

console.log('\n📝 Creating new Makita products...');

for (const product of makitaProducts) {
  const filePath = path.join(productDir, `${product.slug}.json`);
  
  const data = {
    name: product.name,
    category: 'industrial-tools',
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    badge: product.badge,
    newArrival: product.newArrival,
    featured: product.featured,
    rating: product.rating,
    reviews: product.reviews,
    description: product.description,
    specs: product.specs
  };
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  console.log(`  ✅ Created: ${product.slug} (${product.price.toLocaleString('vi-VN')}₫)`);
}

console.log(`\n🎉 Imported ${makitaProducts.length} Makita products from makitavietnam.com!`);
