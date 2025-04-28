import { defineConfig } from 'rollup';
import { babel as rollupBabel } from '@rollup/plugin-babel';
import cjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import terser from '@rollup/plugin-terser';

export const config = defineConfig({
  plugins: [
    rollupBabel({
      babelHelpers: 'bundled',
      exclude: 'node_modules',
    }),
    nodeResolve({ browser: true }),
    cjs(),
    json(),
  ],
  input: 'src/js/index.js',
  output: {
    file: 'public/assets/privacy-policy/privacy-policy.js',
    sourcemap: true,
    format: 'umd',
    name: 'bundle',
    amd: { id: 'privacy-policy' },
  },
  watch: {
    clearScreen: false,
    exclude: 'node_modules/**',
    include: 'src/js/**',
  },
});

export default config;
