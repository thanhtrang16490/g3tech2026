import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsDir = path.join(__dirname, 'src/content/products');
const categoriesDir = path.join(__dirname, 'src/content/categories');

function convertMDXtoJSON(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) return null;
  
  const frontmatter = frontmatterMatch[1];
  const data = {};
  
  // Parse frontmatter
  frontmatter.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      let key = match[1];
      let value = match[2].trim();
      
      // Remove quotes
      if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      
      // Convert types
      if (value === 'null') value = null;
      else if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (!isNaN(value)) value = Number(value);
      // Array handling
      else if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // Keep as string if parse fails
        }
      }
      
      data[key] = value;
    }
  });
  
  // Handle specs array (multiline YAML)
  const specsMatch = content.match(/^specs:\n((?:  - .+\n?)+)/m);
  if (specsMatch) {
    data.specs = specsMatch[1]
      .split('\n')
      .filter(line => line.trim().startsWith('- '))
      .map(line => {
        let val = line.replace(/^  - /, '').trim();
        if (val.startsWith("'") && val.endsWith("'")) {
          val = val.slice(1, -1);
        }
        return val;
      });
  }
  
  return data;
}

// Convert products
console.log('Converting products...');
const productFiles = fs.readdirSync(productsDir).filter(f => f.endsWith('.mdx'));
let productCount = 0;

productFiles.forEach(file => {
  const filePath = path.join(productsDir, file);
  const data = convertMDXtoJSON(filePath);
  
  if (data && data.name) {
    const jsonFile = file.replace('.mdx', '.json');
    const jsonPath = path.join(productsDir, jsonFile);
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`✓ ${jsonFile}`);
    productCount++;
  }
});

// Convert categories
console.log('\nConverting categories...');
const categoryFiles = fs.readdirSync(categoriesDir).filter(f => f.endsWith('.mdx'));
let categoryCount = 0;

categoryFiles.forEach(file => {
  const filePath = path.join(categoriesDir, file);
  const data = convertMDXtoJSON(filePath);
  
  if (data && data.name) {
    const jsonFile = file.replace('.mdx', '.json');
    const jsonPath = path.join(categoriesDir, jsonFile);
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`✓ ${jsonFile}`);
    categoryCount++;
  }
});

console.log(`\n✅ Converted ${productCount} products and ${categoryCount} categories to JSON`);
