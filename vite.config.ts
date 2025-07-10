import react from '@vitejs/plugin-react-swc';
import preload from "vite-plugin-preload";
import browserslist from 'browserslist';
import {browserslistToTargets} from "lightningcss";
import {resolve} from 'path'
import {defineConfig} from 'vite'


const isGithubPages = process.env.GITHUB_ACTIONS === 'true'

// https://vite.dev/config/
export default defineConfig({
  base: isGithubPages ? '/harhive/' : undefined,
  plugins: [
    react({plugins: [['@effector/swc-plugin', {}]]}),
    preload(),
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
  define: {
    isGithubPages: isGithubPages,
  },
  resolve: {
    alias: {
      "pages": resolve(__dirname, "./src/pages"),
      "widgets": resolve(__dirname, "./src/widgets"),
      "features": resolve(__dirname, "./src/features"),
      "shared": resolve(__dirname, "./src/shared"),
      "generated": resolve(__dirname, "./src/generated"),
    }
  }
})
