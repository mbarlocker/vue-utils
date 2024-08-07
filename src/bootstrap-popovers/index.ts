import * as bootstrap from 'bootstrap'
import bootstrapDirective from '../bootstrap-directives/index.js'
import type { App } from 'vue'
import { Plugin } from 'vue'

export function enablePopovers(app: App) {
	bootstrapDirective(app, 'popover', e => bootstrap.Popover.getOrCreateInstance(e))
}

export const plugin: Plugin = {
	install(app: App): void {
		enablePopovers(app)
	}
}

export default plugin
