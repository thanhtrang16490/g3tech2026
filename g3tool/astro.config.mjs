// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://g3tool.com',
  integrations: [
    tailwind(),
    react(),
    sitemap(),
  ],
  output: 'static',
  image: {
    domains: [
      'g3tool.com',
      'makitavietnam.com',
      'makita.net',
      'makitatools.com',
      'bosch-professional.com',
      'bosch-tools.com',
      'dewalt.com',
      'jasic.com.cn',
      'mitutoyo.com.vn',
      'store.arduino.cc',
      'arduino.cc',
      'creality.com',
      'esun3d.com',
      'anycubic.com',
      'raspberrypi.com',
      'hakko.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'makitavietnam.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'mitutoyo.com.vn',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'g3tool.com',
        pathname: '/images/products/**',
      },
    ],
  },
});
