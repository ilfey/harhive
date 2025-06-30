import { defineConfig } from "@pandacss/dev";
import browserslist from 'browserslist';

const isProduction =
  (process.env.PANDA_ENV ?? process.env.NODE_ENV) === 'production';

export default defineConfig({
  // Whether to use css reset
  preflight: false,
  lightningcss: true,
  browserslist: browserslist('>= 0.25%'),
  polyfill: true,
  clean: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx,vue}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "./src/generated",

  hash: isProduction,
});
