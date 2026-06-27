import { execSync } from 'child_process';

// Product slugs from makitavietnam.com (based on typical URL structure)
const products = [
  { slug: 'makita-ddf490z', search: 'DDF490Z' },
  { slug: 'makita-dlx2215tx2', search: 'DLX2215TX2' },
  { slug: 'makita-td002g', search: 'TD002G' },
  { slug: 'makita-dhk180rtj', search: 'DHK180RTJ' },
  { slug: 'makita-dhr183rtwj', search: 'DHR183RTWJ' },
  { slug: 'makita-dtd134z', search: 'DTD134Z' },
  { slug: 'makita-dtd156sf1j', search: 'DTD156SF1J' },
  { slug: 'makita-dtp141rte', search: 'DTP141RTE' },
  { slug: 'makita-ga5030', search: 'GA5030' },
  { slug: 'makita-ga9030r', search: 'GA9030R' },
  { slug: 'makita-gb602', search: 'GB602' },
  { slug: 'makita-gb801', search: 'GB801' },
  { slug: 'makita-hr008gt201', search: 'HR008GT201' },
  { slug: 'makita-hr2470x5', search: 'HR2470X5' },
  { slug: 'makita-m6200b', search: 'M6200B' },
  { slug: 'makita-pc5000c', search: 'PC5000C' },
  { slug: 'makita-dga408rtj1', search: 'DGA408RTJ1' },
];

for (const product of products) {
  try {
    // Search for product on makitavietnam.com
    const searchUrl = `https://makitavietnam.com/?s=${product.search}&product_cat=0&post_type=product`;
    console.log(`\n🔍 Searching: ${product.search}`);
    console.log(`URL: ${searchUrl}`);
    
    // Get the search results page
    const html = execSync(`curl -s -L "${searchUrl}"`, { 
      stdio: 'pipe', timeout: 10000 
    }).toString();
    
    // Look for product links in the HTML
    const linkRegex = /<a[^>]*href="([^"]*${product.search}[^"]*)"[^>]*>/gi;
    const matches = html.match(linkRegex);
    
    if (matches) {
      console.log(`✅ Found ${matches.length} matches for ${product.search}`);
      // Get first unique URL
      const urlMatch = matches[0].match(/href="([^"]+)"/);
      if (urlMatch) {
        console.log(`Product URL: ${urlMatch[1]}`);
        
        // Now fetch the product page to find image
        const productHtml = execSync(`curl -s -L "${urlMatch[1]}"`, { 
          stdio: 'pipe', timeout: 10000 
        }).toString();
        
        // Look for og:image meta tag
        const ogImageMatch = productHtml.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) ||
                            productHtml.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
        if (ogImageMatch) {
          console.log(`🖼️  Image URL: ${ogImageMatch[1]}`);
        } else {
          // Look for WooCommerce product image
          const wcImageMatch = productHtml.match(/"image":"([^"]+makitavietnam[^"]+)"/i) ||
                              productHtml.match(/class="wp-post-image"[^>]*src="([^"]+)"/i);
          if (wcImageMatch) {
            console.log(`🖼️  Image URL: ${wcImageMatch[1]}`);
          } else {
            console.log(`❌ No image found`);
          }
        }
      }
    } else {
      console.log(`❌ No product found for ${product.search}`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}
