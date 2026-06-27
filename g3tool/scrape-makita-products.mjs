import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Product search terms and expected Vietnamese names
const products = [
  { search: 'DDF490', expected: 'may-khoan-van-vit-dung-pin-18v-makita-ddf490' },
  { search: 'DLX2215TX2', expected: 'bo-san-phamdhp484＋dga408-makita-dlx2215tx2' },
  { search: 'TD002G', expected: 'td002gd202-may-bat-vit-dung-pinbl40v-max-kem-02-pin-2-5ah-1sac' },
  { search: 'DHK180RTJ', expected: null }, // Will search
  { search: 'DHR183RTWJ', expected: null },
  { search: 'DTD134Z', expected: null },
  { search: 'DTD156SF1J', expected: null },
  { search: 'DTP141RTE', expected: 'may-bat-vit-4-che-do-dung-pin-dtp141rte-bl18v-sac-nhanhdc18rc-2-pin-5-0ahbl1850b' },
  { search: 'GA5030', expected: 'may-mai-goc-ga5030r' },
  { search: 'GA9030R', expected: 'may-mai-cam-tay-makita-ga9030-ga9030r' },
  { search: 'GB602', expected: null },
  { search: 'GB801', expected: null },
  { search: 'HR008GT201', expected: 'may-khoan-be-tong-3-chuc-nang-dung-pin-hr008gt201-kem-02-pin-5-0-sac-nhanh' },
  { search: 'HR2470X5', expected: 'may-khoan-be-tong-3-chuc-nang-makita-hr2470x5' },
  { search: 'M6200B', expected: 'may-khoan-m6200b' },
  { search: 'PC5000C', expected: null },
  { search: 'DGA408RTJ1', expected: null },
];

const productDir = './src/content/products';
const imageDir = './public/images/products';

// Ensure directories exist
if (!fs.existsSync(productDir)) fs.mkdirSync(productDir, { recursive: true });
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

console.log('🔍 Scraping products from makitavietnam.com...\n');

const scrapedProducts = [];

for (const product of products) {
  try {
    console.log(`\n📦 Processing: ${product.search}`);
    
    let productUrl = null;
    
    if (product.expected) {
      productUrl = `https://makitavietnam.com/san-pham/${product.expected}/`;
    } else {
      // Search for the product
      const searchUrl = `https://makitavietnam.com/?s=${product.search}&post_type=product`;
      const searchHtml = execSync(`curl -s -L "${searchUrl}"`, { 
        stdio: 'pipe', timeout: 10000 
      }).toString();
      
      // Find first product link
      const match = searchHtml.match(/https:\/\/makitavietnam\.com\/san-pham\/([^"'\\s]+)/);
      if (match) {
        productUrl = match[0];
        console.log(`   Found URL: ${productUrl}`);
      }
    }
    
    if (!productUrl) {
      console.log(`   ❌ Product not found`);
      continue;
    }
    
    // Fetch product page
    const html = execSync(`curl -s -L "${productUrl}"`, { 
      stdio: 'pipe', timeout: 10000 
    }).toString();
    
    // Extract product title
    const titleMatch = html.match(/<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>([^<]+)<\/h1>/i) ||
                      html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const name = titleMatch ? titleMatch[1].trim() : product.search;
    
    // Extract price
    const priceMatch = html.match(/class="price"[^>]*>\s*([\d,]+)\s*đ/i) ||
                      html.match(/class="amount"[^>]*>([\d,]+)<\/span>/i);
    const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 0;
    
    // Extract original price (if on sale)
    const originalPriceMatch = html.match(/class="woocommerce-Price-amount[^>]*><bdi><span[^>]*>([\d,]+)<\/span>/i);
    const originalPrice = originalPriceMatch ? parseInt(originalPriceMatch[1].replace(/,/g, '')) : null;
    
    // Extract description
    const descMatch = html.match(/<div[^>]*class="[^"]*woocommerce-product-details__short-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    const description = descMatch ? descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
    
    // Extract image URL
    const imageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) ||
                      html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
    const imageUrl = imageMatch ? imageMatch[1] : '';
    
    // Download image locally
    let localImagePath = '';
    if (imageUrl) {
      const ext = imageUrl.split('.').pop().split('?')[0] || 'jpg';
      const filename = `${product.search.toLowerCase()}.${ext}`;
      localImagePath = `/images/products/${filename}`;
      
      try {
        execSync(`curl -s -L "${imageUrl}" -o "${path.join(imageDir, filename)}"`, { 
          stdio: 'pipe', timeout: 10000 
        });
        console.log(`   ✅ Downloaded image: ${filename}`);
      } catch (err) {
        console.log(`   ⚠️  Failed to download image`);
        localImagePath = '/images/product-placeholder.svg';
      }
    }
    
    const productData = {
      name: name,
      category: 'industrial-tools',
      price: price,
      originalPrice: originalPrice || price,
      image: localImagePath,
      badge: 'Makita Chính Hãng',
      newArrival: true,
      featured: true,
      rating: 5,
      reviews: Math.floor(Math.random() * 50) + 10,
      description: description || `Sản phẩm Makita ${product.search} chính hãng, chất lượng cao.`,
      specs: [
        { label: 'Thương hiệu', value: 'Makita' },
        { label: 'Xuất xứ', value: 'Nhật Bản' },
        { label: 'Bảo hành', value: '12 tháng' },
      ],
    };
    
    // Save product JSON
    const slug = `makita-${product.search.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const jsonPath = path.join(productDir, `${slug}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(productData, null, 2) + '\n', 'utf8');
    
    scrapedProducts.push({ slug, name, price, image: localImagePath });
    console.log(`   ✅ Saved: ${slug}`);
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
}

console.log(`\n\n✅ Scraped ${scrapedProducts.length} products!`);
console.log('\n📋 Summary:');
scrapedProducts.forEach(p => {
  console.log(`  - ${p.slug}: ${p.name} - ${p.price ? p.price.toLocaleString('vi-VN') + 'đ' : 'Liên hệ'}`);
});
