import type { Router } from 'vue-router'

export interface Plugin {
	install: (router: Router) => void
}
