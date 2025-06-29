import vue from '@vitejs/plugin-vue'
import browserslist from 'browserslist';
import {browserslistToTargets} from "lightningcss";
import {resolve} from 'path'
import {defineConfig} from 'vite'

const isGithubPages = process.env.GITHUB_ACTIONS === 'true'

// https://vite.dev/config/
export default defineConfig({
  base: isGithubPages ? '/harhive/' : undefined,
  plugins: [
    vue(),
  ],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%'))
    }
  },
  build: {
    cssMinify: 'lightningcss',
  },
  resolve: {
    alias: {
      "pages": resolve(__dirname, "./src/pages"),
      "widgets": resolve(__dirname, "./src/widgets"),
      "features": resolve(__dirname, "./src/features"),
      "shared": resolve(__dirname, "./src/shared"),
    }
  }
})
