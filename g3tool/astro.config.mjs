// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://g3tool.vn',
  integrations: [
    tailwind(),
    react(),
  ],
  output: 'static',
});
