import * as bootstrap from 'bootstrap'
import type { App } from 'vue'
import { mappedDirective } from '../bootstrap-directives/index.js'
import { Plugin } from 'vue'

export const plugin: Plugin = {
	install(app: App): void {
		mappedDirective(app, 'popover', e => bootstrap.Popover.getOrCreateInstance(e))
	}
}
