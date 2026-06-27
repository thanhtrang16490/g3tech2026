import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://thaihungsmarthome.com';

// Product categories to scrape
const CATEGORIES = [
  { id: 'central-control', url: '/bo-dieu-khien-trung-tam/', name: 'Bộ điều khiển trung tâm' },
  { id: 'smart-switch', url: '/cong-tac-thong-minh/', name: 'Công tắc thông minh' },
  { id: 'smart-light', url: '/den-thong-minh/', name: 'Đèn thông minh' },
  { id: 'smart-lock', url: '/khoa-thong-minh/', name: 'Khóa thông minh' },
  { id: 'sensor', url: '/cam-bien/', name: 'Cảm biến' },
  { id: 'smart-curtain', url: '/rem-tu-dong/', name: 'Rèm tự động' },
  { id: 'camera', url: '/camera/', name: 'Camera' },
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        fetchPage(response.headers.location).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url}: ${response.statusCode}`));
        return;
      }
      
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractProducts(html, categoryId) {
  const products = [];
  
  // Extract product titles
  const titleRegex = /<h[23][^>]*class="[^"]*product-title[^"]*"[^>]*>(.*?)<\/h[23]>/gi;
  let titleMatch;
  const titles = [];
  while ((titleMatch = titleRegex.exec(html)) !== null) {
    titles.push(titleMatch[1].replace(/<[^>]+>/g, '').trim());
  }
  
  // Extract prices
  const priceRegex = /<span[^>]*class="[^"]*price[^"]*"[^>]*>([\d,]+)\s*₫<\/span>/gi;
  let priceMatch;
  const prices = [];
  while ((priceMatch = priceRegex.exec(html)) !== null) {
    prices.push(parseInt(priceMatch[1].replace(/,/g, '')));
  }
  
  // Extract images
  const imageRegex = /<img[^>]+src=["']([^"']*?(?:wp-content|uploads)[^"']*?\.(?:jpg|jpeg|png|webp))["']/gi;
  let imageMatch;
  const images = [];
  while ((imageMatch = imageRegex.exec(html)) !== null) {
    images.push(imageMatch[1]);
  }
  
  // Extract links
  const linkRegex = /<a[^>]+href=["']([^"']*?\/san-pham\/[^"']*?)["']/gi;
  let linkMatch;
  const links = [];
  while ((linkMatch = linkRegex.exec(html)) !== null) {
    links.push(linkMatch[1]);
  }
  
  // Combine data
  const maxProducts = Math.max(titles.length, prices.length, images.length);
  for (let i = 0; i < maxProducts; i++) {
    if (titles[i] || prices[i]) {
      products.push({
        name: titles[i] || 'Sản phẩm',
        price: prices[i] || 0,
        image: images[i] || '',
        url: links[i] || '',
        category: categoryId
      });
    }
  }
  
  return products;
}

function generateProductId(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
}

function generateProductMDX(product, index) {
  const id = product.url ? product.url.split('/').filter(Boolean).pop() : generateProductId(product.name);
  
  const frontmatter = {
    name: product.name,
    category: product.category,
    price: product.price,
    originalPrice: null,
    image: product.image,
    badge: index < 3 ? 'Mới' : null,
    rating: 5,
    reviews: Math.floor(Math.random() * 50) + 10,
    description: `Sản phẩm ${product.name} chính hãng từ ThaiHuong SmartHome`,
    specs: ['Chính hãng', 'Bảo hành 12 tháng', 'Miễn phí ship'],
    featured: index < 2,
    hotDeal: index < 2,
    newArrival: index < 3,
    sourceUrl: product.url || '',
    sourceWebsite: 'thaihungsmarthome.com'
  };

  return {
    id: id || `product-${index}`,
    content: `---
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

${frontmatter.description}

## Mô tả chi tiết

Sản phẩm được nhập khẩu chính hãng và phân phối bởi G3BOX - Công Ty Cổ phần Công nghệ G3 Việt Nam.

## Thông số kỹ thuật

${frontmatter.specs.map((spec, i) => `${i + 1}. ${spec}`).join('\n')}

## Bảo hành

- Bảo hành chính hãng 12 tháng
- Hỗ trợ kỹ thuật trọn đời
- Miễn phí vận chuyển nội thành
`
  };
}

async function scrapeCategory(category) {
  console.log(`\n📦 Scraping category: ${category.name}`);
  console.log(`URL: ${BASE_URL}${category.url}`);
  
  try {
    const html = await fetchPage(`${BASE_URL}${category.url}`);
    const products = extractProducts(html, category.id);
    
    console.log(`✓ Found ${products.length} products`);
    return products;
  } catch (error) {
    console.error(`✗ Error scraping ${category.name}:`, error.message);
    return [];
  }
}

async function main() {
  console.log('🚀 Starting thaihungsmarthome.com scraper...');
  console.log('='.repeat(50));
  
  const allProducts = [];
  
  // Scrape all categories
  for (const category of CATEGORIES) {
    const products = await scrapeCategory(category);
    allProducts.push(...products);
    
    // Be polite - add delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 Total products found: ${allProducts.length}`);
  
  if (allProducts.length === 0) {
    console.log('\n⚠️  No products found. The website structure may have changed.');
    console.log('💡 You may need to manually inspect the HTML structure.');
    return;
  }
  
  // Create output directory
  const outputDir = path.join(process.cwd(), 'src/content/products');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate MDX files
  console.log('\n📝 Generating MDX files...');
  let createdCount = 0;
  
  allProducts.forEach((product, index) => {
    try {
      const mdx = generateProductMDX(product, index);
      const filePath = path.join(outputDir, `${mdx.id}.mdx`);
      
      fs.writeFileSync(filePath, mdx.content);
      createdCount++;
      console.log(`✓ Created: ${mdx.id}`);
    } catch (error) {
      console.error(`✗ Error creating ${product.name}:`, error.message);
    }
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(`\n✅ Scraping complete!`);
  console.log(`📁 Created ${createdCount} product files`);
  console.log(`📂 Location: src/content/products/`);
  console.log('\n💡 Next steps:');
  console.log('   1. Review generated MDX files');
  console.log('   2. Update images if needed');
  console.log('   3. Run: yarn dev to see changes');
}

// Run scraper
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
