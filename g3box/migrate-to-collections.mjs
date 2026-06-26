import fs from 'fs';
import path from 'path';

const categories = [
  {
    id: 'central-control',
    name: 'Bộ Điều Khiển Trung Tâm',
    slug: 'bo-dieu-khien-trung-tam',
    icon: '🏠',
    description: 'Hub trung tâm điều khiển toàn bộ thiết bị thông minh',
    order: 1
  },
  {
    id: 'smart-switch',
    name: 'Công Tắc Thông Minh',
    slug: 'cong-tac-thong-minh',
    icon: '💡',
    description: 'Công tắc cảm ứng, điều khiển từ xa',
    order: 2
  },
  {
    id: 'smart-light',
    name: 'Đèn Thông Minh',
    slug: 'den-thong-minh',
    icon: '💡',
    description: 'Đèn LED, đèn âm trần, đèn dây thông minh',
    order: 3
  },
  {
    id: 'smart-lock',
    name: 'Khóa Cửa Thông Minh',
    slug: 'khoa-cua-thong-minh',
    icon: '🔒',
    description: 'Khóa vân tay, mật khẩu, thẻ từ, Face ID',
    order: 4
  },
  {
    id: 'sensor',
    name: 'Cảm Biến Tự Động Hóa',
    slug: 'cam-bien-tu-dong-hoa',
    icon: '📡',
    description: 'Cảm biến chuyển động, cửa, nhiệt độ, hiện diện',
    order: 5
  },
  {
    id: 'smart-curtain',
    name: 'Rèm Tự Động',
    slug: 'rem-tu-dong',
    icon: '🪟',
    description: 'Động cơ rèm, điều khiển rèm tự động',
    order: 6
  },
  {
    id: 'camera',
    name: 'Camera AI',
    slug: 'camera-ai',
    icon: '📹',
    description: 'Camera an ninh, chuông cửa thông minh',
    order: 7
  },
  {
    id: 'smart-speaker',
    name: 'Loa Thông Minh',
    slug: 'loa-thong-minh',
    icon: '🔊',
    description: 'Loa trợ lý ảo, âm thanh đa vùng',
    order: 8
  },
  {
    id: 'home-appliance',
    name: 'Gia Dụng Thông Minh',
    slug: 'gia-dung-thong-minh',
    icon: '🤖',
    description: 'Robot hút bụi, máy cho thú cưng ăn',
    order: 9
  }
];

const products = [
  // Bộ điều khiển trung tâm
  {
    id: 'aqara-hub-m3',
    name: 'Bộ Điều Khiển Trung Tâm Aqara HUB M3 Zigbee 3.0',
    category: 'central-control',
    price: 3490000,
    originalPrice: 3990000,
    image: '/images/aqara-hub-m3.jpg',
    badge: 'Mới',
    rating: 5,
    reviews: 28,
    description: 'Hub trung tâm Zigbee 3.0, tương thích Matter, điều khiển toàn bộ thiết bị Aqara',
    specs: ['Zigbee 3.0', 'Matter', 'WiFi', 'Bluetooth'],
    featured: true,
    newArrival: true
  },
  {
    id: 'aqara-magicpad-s1',
    name: 'Màn Hình Trung Tâm Aqara MagicPad S1 Plus',
    category: 'central-control',
    price: 9990000,
    originalPrice: 11990000,
    image: '/images/aqara-magicpad.jpg',
    rating: 5,
    reviews: 15,
    description: 'Màn hình cảm ứng 10 inch, điều khiển trung tâm nhà thông minh',
    specs: ['Màn hình 10"', 'Zigbee', 'WiFi', 'Cảm ứng']
  },
  
  // Công tắc thông minh
  {
    id: 'aqara-z1-pro',
    name: 'Công Tắc Thông Minh Aqara Z1 Pro',
    category: 'smart-switch',
    price: 790000,
    originalPrice: 990000,
    image: '/images/aqara-z1-pro.jpg',
    rating: 5,
    reviews: 42,
    description: 'Công tắc cảm ứng sang trọng, điều khiển qua app',
    specs: ['Cảm ứng', 'Zigbee', '1-3 gang', 'Công suất 2500W']
  },
  {
    id: 'aqara-h1',
    name: 'Công Tắc Thông Minh Aqara H1 20A',
    category: 'smart-switch',
    price: 880000,
    originalPrice: 1090000,
    image: '/images/aqara-h1.jpg',
    rating: 5,
    reviews: 36,
    description: 'Công tắc thông minh chịu tải cao 20A',
    specs: ['20A', 'Zigbee', 'Không dây', '2 gang']
  },
  {
    id: 'aqara-s1e',
    name: 'Công Tắc Thông Minh Aqara S1E',
    category: 'smart-switch',
    price: 1290000,
    originalPrice: 1690000,
    image: '/images/aqara-s1e.jpg',
    rating: 5,
    reviews: 21,
    description: 'Công tắc màn hình OLED cao cấp',
    specs: ['Màn hình OLED', 'Zigbee', 'Cảm ứng', 'Kim loại']
  },
  
  // Đèn thông minh
  {
    id: 'aqara-led-bulb-t2',
    name: 'Bóng Đèn Thông Minh Aqara LED Bulb T2',
    category: 'smart-light',
    price: 550000,
    originalPrice: 690000,
    image: '/images/aqara-led-t2.jpg',
    rating: 4,
    reviews: 53,
    description: 'Bóng đèn LED thông minh, điều chỉnh độ sáng và màu sắc',
    specs: ['9W', 'Zigbee', '2700K-6500K', '800 lumen']
  },
  {
    id: 'aqara-downlight-t2',
    name: 'Đèn Âm Trần Thông Minh Aqara Downlight T2 Pro',
    category: 'smart-light',
    price: 1150000,
    originalPrice: null,
    image: '/images/aqara-downlight.jpg',
    rating: 5,
    reviews: 31,
    description: 'Đèn âm trần cao cấp, ánh sáng tùy chỉnh',
    specs: ['12W', 'Zigbee', 'RGBW', 'Dimmable']
  },
  {
    id: 'aqara-light-strip',
    name: 'Đèn Led Dây Aqara Light Strip T1',
    category: 'smart-light',
    price: 299000,
    originalPrice: 929000,
    image: '/images/aqara-strip.jpg',
    rating: 4,
    reviews: 67,
    description: 'Đèn LED dây trang trí 16 triệu màu',
    specs: ['2 mét', 'RGB', 'Zigbee', 'Cắt ngắn được']
  },
  
  // Khóa thông minh
  {
    id: 'aqara-n100',
    name: 'Khóa Vân Tay Thông Minh Aqara N100',
    category: 'smart-lock',
    price: 2990000,
    originalPrice: 5490000,
    image: '/images/aqara-n100.jpg',
    badge: 'Hot',
    rating: 4.44,
    reviews: 89,
    description: 'Khóa vân tay 7 cách mở, Zigbee, nhật ký mở khóa',
    specs: ['Vân tay', 'Mật khẩu', 'Thẻ NFC', 'App', 'Chìa cơ'],
    hotDeal: true
  },
  {
    id: 'aqara-a100',
    name: 'Khóa Thông Minh Aqara A100 Zigbee',
    category: 'smart-lock',
    price: 3490000,
    originalPrice: 5490000,
    image: '/images/aqara-a100.jpg',
    rating: 5,
    reviews: 72,
    description: 'Khóa cửa thông minh cao cấp với Zigbee',
    specs: ['Vân tay', 'Mật khẩu', 'NFC', 'HomeKit', 'Auto-lock']
  },
  {
    id: 'aqara-u400',
    name: 'Khóa Vân Tay Thông Minh Aqara U400',
    category: 'smart-lock',
    price: 6990000,
    originalPrice: 9990000,
    image: '/images/aqara-u400.jpg',
    badge: 'Mới',
    rating: 5,
    reviews: 45,
    description: 'Khóa cao cấp với UWB, Face ID, Samsung Home Key',
    specs: ['UWB', 'Face ID', 'HomeKey', 'Zigbee', '9 cách mở'],
    newArrival: true
  },
  {
    id: 'ezviz-y3000',
    name: 'Khóa Cửa Thông Minh EZVIZ Y3000FVP Plus',
    category: 'smart-lock',
    price: 7890000,
    originalPrice: 11900000,
    image: '/images/ezviz-y3000.jpg',
    rating: 5,
    reviews: 38,
    description: 'Khóa nhận diện khuôn mặt và tĩnh mạch lòng bàn tay',
    specs: ['Face ID', 'Tĩnh mạch', 'Camera', 'WiFi', 'App']
  },
  
  // Cảm biến
  {
    id: 'aqara-fp300',
    name: 'Cảm Biến Hiện Diện Aqara FP300',
    category: 'sensor',
    price: 1190000,
    originalPrice: 1990000,
    image: '/images/aqara-fp300.jpg',
    rating: 5,
    reviews: 56,
    description: 'Cảm biến hiện diện mmWave, phát hiện chuyển động nhỏ',
    specs: ['mmWave', 'Zigbee', 'Khoảng 5m', 'Góc 180°']
  },
  {
    id: 'aqara-p100',
    name: 'Cảm Biến Đa Trạng Thái Aqara P100',
    category: 'sensor',
    price: 990000,
    originalPrice: 1290000,
    image: '/images/aqara-p100.jpg',
    badge: 'Mới',
    rating: 4,
    reviews: 34,
    description: 'Cảm biến nhiệt độ, độ ẩm, ánh sáng trong một thiết bị',
    specs: ['Nhiệt độ', 'Độ ẩm', 'Ánh sáng', 'LCD'],
    newArrival: true
  },
  {
    id: 'aqara-fp2',
    name: 'Cảm Biến Hiện Diện Aqara FP2',
    category: 'sensor',
    price: 1450000,
    originalPrice: 1650000,
    image: '/images/aqara-fp2.jpg',
    rating: 5,
    reviews: 91,
    description: 'Cảm biến hiện diện đa vùng, theo dõi đến 5 người',
    specs: ['mmWave', '5 zones', 'Zigbee', 'Theo dõi người']
  },
  
  // Rèm tự động
  {
    id: 'aqara-curtain-c1',
    name: 'Động Cơ Rèm Kéo Ngang Aqara Curtain C1',
    category: 'smart-curtain',
    price: 1650000,
    originalPrice: 2490000,
    image: '/images/aqara-curtain-c1.jpg',
    rating: 5,
    reviews: 47,
    description: 'Động cơ rèm thông minh, điều khiển qua app',
    specs: ['Zigbee', 'Tải trọng 50kg', 'Yên tĩnh', 'Pin dự phòng']
  },
  {
    id: 'aqara-c3',
    name: 'Động Cơ Rèm Aqara C3 Curtain Motor',
    category: 'smart-curtain',
    price: 1990000,
    originalPrice: 2350000,
    image: '/images/aqara-c3.jpg',
    rating: 4,
    reviews: 38,
    description: 'Động cơ rèm cao cấp, tích hợp HomeKit',
    specs: ['HomeKit', 'Zigbee', 'Tải 50kg', 'Cài đặt dễ']
  },
  
  // Camera
  {
    id: 'aqara-g3',
    name: 'Camera Aqara G3 – 2K, AI, Hub tích hợp',
    category: 'camera',
    price: 2690000,
    originalPrice: 2990000,
    image: '/images/aqara-g3.jpg',
    rating: 5,
    reviews: 84,
    description: 'Camera 2K quay 360°, AI nhận diện khuôn mặt, Hub Zigbee',
    specs: ['2K', '360°', 'AI', 'Hub Zigbee', 'Night vision']
  },
  {
    id: 'aqara-g400',
    name: 'Chuông Cửa Thông Minh Aqara G400',
    category: 'camera',
    price: 3490000,
    originalPrice: 4490000,
    image: '/images/aqara-g400.jpg',
    badge: 'Mới',
    rating: 5,
    reviews: 29,
    description: 'Chuông cửa có hình HD, tích hợp Hub Zigbee',
    specs: ['HD 1080p', 'Hub Zigbee', 'Hai chiều', 'Hồng ngoại'],
    newArrival: true
  },
  
  // Gia dụng thông minh
  {
    id: 'aqara-pet-feeder',
    name: 'Máy Cho Thú Cưng Ăn Tự Động Aqara C1',
    category: 'home-appliance',
    price: 1850000,
    originalPrice: 2590000,
    image: '/images/aqara-pet-feeder.jpg',
    badge: 'Mới',
    rating: 5,
    reviews: 23,
    description: 'Cho thú cưng ăn tự động, lên lịch qua app',
    specs: ['Dung tích 2L', 'Zigbee', 'App điều khiển', 'Camera'],
    newArrival: true
  },
  {
    id: 'aqara-drying-rack',
    name: 'Giàn Phơi Thông Minh Aqara C100',
    category: 'home-appliance',
    price: 5990000,
    originalPrice: 7990000,
    image: '/images/aqara-drying-rack.jpg',
    rating: 4,
    reviews: 18,
    description: 'Giàn phơi tự động nâng hạ, sấy khô, khử khuẩn',
    specs: ['Tự động', 'Sấy khô', 'UV', 'App', 'LED']
  }
];

// Create categories directory
const categoriesDir = path.join(process.cwd(), 'src/content/categories');
if (!fs.existsSync(categoriesDir)) {
  fs.mkdirSync(categoriesDir, { recursive: true });
}

// Generate category files
categories.forEach(cat => {
  const content = `---
name: '${cat.name}'
slug: '${cat.slug}'
icon: '${cat.icon}'
description: '${cat.description}'
order: ${cat.order}
---
`;
  
  const filePath = path.join(categoriesDir, `${cat.id}.mdx`);
  fs.writeFileSync(filePath, content);
  console.log(`✓ Created category: ${cat.id}`);
});

// Create products directory
const productsDir = path.join(process.cwd(), 'src/content/products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Generate product files
products.forEach(product => {
  const frontmatter = {
    name: product.name,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    badge: product.badge || null,
    rating: product.rating,
    reviews: product.reviews,
    description: product.description,
    specs: product.specs,
    featured: product.featured || false,
    hotDeal: product.hotDeal || false,
    newArrival: product.newArrival || false,
    sourceUrl: `https://thaihungsmarthome.com/san-pham/${product.id}`,
    sourceWebsite: 'thaihungsmarthome.com'
  };

  const content = `---
name: '${frontmatter.name.replace(/'/g, "\\'")}'
category: ${frontmatter.category}
price: ${frontmatter.price}
originalPrice: ${frontmatter.originalPrice !== null ? frontmatter.originalPrice : 'null'}
image: '${frontmatter.image}'
badge: ${frontmatter.badge !== null ? `'${frontmatter.badge}'` : 'null'}
rating: ${frontmatter.rating}
reviews: ${frontmatter.reviews}
description: '${frontmatter.description.replace(/'/g, "\\'")}'
specs:
${frontmatter.specs.map(spec => `  - '${spec}'`).join('\n')}
featured: ${frontmatter.featured}
hotDeal: ${frontmatter.hotDeal}
newArrival: ${frontmatter.newArrival}
sourceUrl: '${frontmatter.sourceUrl}'
sourceWebsite: '${frontmatter.sourceWebsite}'
---

# ${product.name}

${product.description}

## Thông số kỹ thuật

${product.specs.map((spec, i) => `${i + 1}. ${spec}`).join('\n')}
`;

  const filePath = path.join(productsDir, `${product.id}.mdx`);
  fs.writeFileSync(filePath, content);
  console.log(`✓ Created product: ${product.id}`);
});

console.log('\n✅ Migration complete!');
console.log(`📁 Categories: ${categories.length} files created`);
console.log(`📁 Products: ${products.length} files created`);
