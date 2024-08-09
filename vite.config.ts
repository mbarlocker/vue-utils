import autoExternal from 'rollup-plugin-auto-external'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

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
      entry: {
        "promised/Promised.vue": "src/promised/Promised.vue",
        "apexchart/ApexChart.vue": "src/apexchart/ApexChart.vue",
      },
      formats: ['es'],
    },
  },
})
