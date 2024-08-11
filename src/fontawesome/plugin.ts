import type { App } from 'vue'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

export interface Options {
	brand: boolean
	regular: boolean
	solid: boolean
}

export default {
	install(app: App, opt?: Partial<Options>): void {
		if (opt?.brand) { library.add(fab) }
		if (opt?.regular) { library.add(far) }
		if (opt?.solid) { library.add(fas) }

		app.component('font-awesome-icon', FontAwesomeIcon)
		app.component('font-awesome-layers', FontAwesomeLayers)
		app.component('font-awesome-layers-text', FontAwesomeLayersText)
	}
}
