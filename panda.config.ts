import { defineConfig } from "@pandacss/dev";

const isProduction =
  (process.env.PANDA_ENV ?? process.env.NODE_ENV) === 'production';

export default defineConfig({
  // Whether to use css reset
  preflight: false,
  lightningcss: true,
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
