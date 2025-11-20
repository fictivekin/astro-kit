// @ts-check
import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [solidJs()],
  image: {
    domains: ['cdn.sanity.io'],
  },
  vite: {
    resolve: {
      alias: {
        '@/components': '/src/components',
        '@': '/src',
      },
    },
  },
});
