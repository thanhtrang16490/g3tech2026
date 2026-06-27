import { execSync } from 'child_process';

const searchTerms = ['DDF490', 'DLX2215', 'TD002', 'DHK180', 'DHR183', 'DTD134', 'DTD156', 'DTP141', 'GA5030', 'GA9030', 'GB602', 'GB801', 'HR008', 'HR2470', 'M6200', 'PC5000', 'DGA408'];

for (const term of searchTerms) {
  try {
    const searchUrl = `https://makitavietnam.com/?s=${term}&post_type=product`;
    const html = execSync(`curl -s -L "${searchUrl}"`, { 
      stdio: 'pipe', timeout: 10000 
    }).toString();
    
    // Find product links
    const links = html.match(/https:\/\/makitavietnam\.com\/san-pham\/[^"']+/g) || [];
    const uniqueLinks = [...new Set(links)];
    
    if (uniqueLinks.length > 0) {
      console.log(`✅ ${term}: Found ${uniqueLinks.length} product(s)`);
      console.log(`   ${uniqueLinks[0]}`);
    } else {
      console.log(`❌ ${term}: No products found`);
    }
  } catch (error) {
    console.log(`❌ ${term}: Error`);
  }
}
