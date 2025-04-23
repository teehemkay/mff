import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import yaml from '@rollup/plugin-yaml';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://eubduget.europarl.europa.eu',
  base: '',
  trailingSlash: 'always',
  output: 'static',
  compressHTML: false,
  integrations: [react()],
  build: {
    format: 'directory',
  },
  vite: {
    plugins: [yaml(), tailwind()],
  },
});