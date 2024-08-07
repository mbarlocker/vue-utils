import * as bootstrap from 'bootstrap'
import bootstrapDirective from '../bootstrap-directives/index.js'
import type { App } from 'vue'
import { Plugin } from 'vue'

export function enableTooltips(app: App) {
	bootstrapDirective(app, 'tooltip', e => bootstrap.Tooltip.getOrCreateInstance(e))
}

export const plugin: Plugin = {
	install(app: App): void {
		enableTooltips(app)
	}
}

export default plugin
