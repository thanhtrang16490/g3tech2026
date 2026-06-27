// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Site URL for production
  site: 'https://g3active.com',
  
  // Static site generation (SSG) - default mode
  output: 'static',
  
  integrations: [
    tailwind(),
    react()
  ],
  
  experimental: {
    clientPrerender: true
  }
});