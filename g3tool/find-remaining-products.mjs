import { execSync } from 'child_process';

const remainingProducts = [
  { slug: 'makita-dhk180rtj', search: 'DHK180RTJ máy khoan khắc đá' },
  { slug: 'makita-dhr183rtwj', search: 'DHR183RTWJ máy khoan bê tông' },
  { slug: 'makita-dtd134z', search: 'DTD134Z máy siết pin' },
  { slug: 'makita-dtd156sf1j', search: 'DTD156SF1J máy vặn vít' },
  { slug: 'makita-gb602', search: 'GB602 máy mài bàn' },
  { slug: 'makita-gb801', search: 'GB801 máy mài bàn' },
  { slug: 'makita-pc5000c', search: 'PC5000C máy cưa gạch' },
  { slug: 'makita-dga408rtj1', search: 'DGA408RTJ1 máy mài pin' },
];

for (const product of remainingProducts) {
  try {
    const searchUrl = `https://makitavietnam.com/?s=${encodeURIComponent(product.search)}&post_type=product`;
    console.log(`\n🔍 Searching: ${product.slug}`);
    
    const html = execSync(`curl -s -L "${searchUrl}"`, { 
      stdio: 'pipe', timeout: 10000 
    }).toString();
    
    // Find product links
    const links = html.match(/https:\/\/makitavietnam\.com\/san-pham\/[^"'\\s]+/g) || [];
    const uniqueLinks = [...new Set(links)];
    
    if (uniqueLinks.length > 0) {
      console.log(`✅ Found: ${uniqueLinks[0]}`);
    } else {
      console.log(`❌ No products found`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}
