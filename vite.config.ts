import autoExternal from 'rollup-plugin-auto-external'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { globSync } from 'glob'
import { resolve } from 'path'

const src = path.join(__dirname, 'src/')
const entries = Object.fromEntries(
  globSync(path.join(src, '**/*.vue'))
    .map(file => [
      file.substring(src.length),
      file,
    ])
)

export default defineConfig({
  plugins: [
    vue(),
    autoExternal(),
  ],
  build: {
    emptyOutDir: false,
    cssCodeSplit: true,
    target: 'esnext',
    lib: {
      entry: entries,
      formats: ['es'],
    },
  },
})
