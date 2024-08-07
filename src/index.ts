import * as focus from './focus/index.js'
import * as jwt from './jwt/index.js'
import * as lazy from './lazy/index.js'
import * as routerCoalesce from './router-coalesce/index.js'
import * as script from './script/index.js'
import * as timezone from './timezone/index.js'
import * as titleParts from './title-parts/index.js'

export { focus as focus }
export { jwt as jwt }
export { lazy as lazy }
export { routerCoalesce as routerCoalesce }
export { script as script }
export { timezone as timezone }
export { titleParts as titleParts }

export default {
	focus,
	jwt,
	lazy,
	routerCoalesce,
	script,
	timezone,
	titleParts,
}
