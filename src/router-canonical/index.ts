import type { Router } from 'vue-router'
import { isNavigationFailure } from 'vue-router'
import { Plugin } from '../router-plugin/index.js'

export const plugin: Plugin = {
	install: function(router: Router) {
		router.afterEach((to, _from, failure) => {
			if (isNavigationFailure(failure)) { return }

			let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']")
			if (!link) {
				link = document.createElement('link')
				link.setAttribute('rel', 'canonical')
				document.head.appendChild(link)
			}

			const resolved = router.resolve(to).path
			const current = window.location.href
			const url = new URL(resolved, current)
			link.href = url.href
		})
	},
}

export default plugin
