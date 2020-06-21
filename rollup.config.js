import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import svg from 'rollup-plugin-svg';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },

  plugins: [
    json(),
    svg(),
    resolve({browser: true}),
    commonjs(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
