// @ts-check
import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
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
