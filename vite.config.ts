import autoExternal from 'rollup-plugin-auto-external'
import dts from 'vite-plugin-dts'
import typescript2 from 'rollup-plugin-typescript2'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	plugins: [
		vue(),
    dts({
      insertTypesEntry: true,
    }),
		autoExternal(),
    typescript2({
      check: false,
    })
	],
	build: {
		lib: {
			formats: ['es', 'cjs'],
			entry: {
				'index': 'src/index.ts',

				'apexchart': 'src/apexchart/index.ts',
				'bootstrap-directives': 'src/bootstrap-directives/index.ts',
				'bootstrap-popovers': 'src/bootstrap-popovers/index.ts',
				'bootstrap-tooltips': 'src/bootstrap-tooltips/index.ts',
				'focus': 'src/focus/index.ts',
				'jumper': 'src/jumper/index.ts',
				'jwt': 'src/jwt/index.ts',
				'lazy': 'src/lazy/index.ts',
				'promised': 'src/promised/index.ts',
				'router-canonical': 'src/router-canonical/index.ts',
				'router-coalesce': 'src/router-coalesce/index.ts',
				'router-plugin': 'src/router-plugin/index.ts',
				'router-proxy': 'src/router-proxy/index.ts',
				'timezone': 'src/timezone/index.ts',
				'title-parts': 'src/title-parts/index.ts',
			},
		},
	},
})
