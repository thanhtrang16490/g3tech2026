#!/usr/bin/env node
/**
 * Script to download product images from external URLs
 * Saves them locally for Astro Image optimization
 * 
 * Usage: node scripts/download-images.js
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const PRODUCTS_DIR = path.join(ROOT_DIR, 'src/content/products');
const PUBLIC_IMAGES_DIR = path.join(ROOT_DIR, 'public/images/products');

/**
 * Download image from URL and save to local
 */
async function downloadImage(url, outputPath) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`❌ Failed to download ${url}: ${response.status} ${response.statusText}`);
      return false;
    }

    const buffer = await response.arrayBuffer();
    await fs.writeFile(outputPath, Buffer.from(buffer));
    
    const size = (buffer.byteLength / 1024).toFixed(2);
    console.log(`✅ Downloaded: ${path.basename(outputPath)} (${size} KB)`);
    return true;
  } catch (error) {
    console.error(`❌ Error downloading ${url}:`, error.message);
    return false;
  }
}

/**
 * Generate slug from filename
 */
function generateSlug(filename) {
  return filename.replace('.json', '');
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting image download...\n');

  // Create output directory
  await fs.mkdir(PUBLIC_IMAGES_DIR, { recursive: true });

  // Read all product JSON files
  const productFiles = await fs.readdir(PRODUCTS_DIR);
  const jsonFiles = productFiles.filter(f => f.endsWith('.json'));

  console.log(`📦 Found ${jsonFiles.length} products\n`);

  let downloaded = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of jsonFiles) {
    const filePath = path.join(PRODUCTS_DIR, file);
    const productData = await fs.readFile(filePath, 'utf-8');
    const product = JSON.parse(productData);

    const slug = generateSlug(file);
    const imageUrl = product.image;

    if (!imageUrl || imageUrl.startsWith('/')) {
      console.log(`⏭️  Skipped ${slug}: No external URL`);
      skipped++;
      continue;
    }

    // Extract extension from URL or default to .jpg
    const urlPath = new URL(imageUrl).pathname;
    const ext = path.extname(urlPath) || '.jpg';
    const filename = `${slug}${ext}`;
    const outputPath = path.join(PUBLIC_IMAGES_DIR, filename);

    // Check if already downloaded
    try {
      await fs.access(outputPath);
      console.log(`⏭️  Already exists: ${filename}`);
      skipped++;
      
      // Update product JSON to use local path
      product.image = `/images/products/${filename}`;
      await fs.writeFile(filePath, JSON.stringify(product, null, 2) + '\n');
      continue;
    } catch {
      // File doesn't exist, download it
    }

    // Download image
    const success = await downloadImage(imageUrl, outputPath);
    
    if (success) {
      downloaded++;
      
      // Update product JSON to use local path
      product.image = `/images/products/${filename}`;
      await fs.writeFile(filePath, JSON.stringify(product, null, 2) + '\n');
    } else {
      errors++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Downloaded: ${downloaded}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`📁 Saved to: ${PUBLIC_IMAGES_DIR}`);
  console.log('\n✨ Done!');
}

main().catch(console.error);
