import type { FocusOptions } from './functions.js'
import type { Plugin } from 'vue'
import { focus } from './functions.js'
import { focusFirstEligible } from './functions.js'

export const plugin: Plugin = {
	install(app, options: FocusOptions) {
		app.directive('focus', {
			mounted(element: HTMLElement, { value }) {
				if (value) {
					focus(element, options)
				}
			},
		})

		app.directive('focus-first-eligible', {
			mounted(element: HTMLElement, { value }) {
				if (value) {
					focusFirstEligible(element, options)
				}
			},
		})
	}
}
