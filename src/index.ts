import * as focus from './focus/index.js'
import * as jumper from './jumper/index.js'
import * as jwt from './jwt/index.js'
import * as lazy from './lazy/index.js'
import * as routerCanonical from './router-canonical/index.js'
import * as routerCoalesce from './router-coalesce/index.js'
import * as routerProxy from './router-proxy/index.js'
import * as script from './script/index.js'
import * as timezone from './timezone/index.js'
import * as titleParts from './title-parts/index.js'

export { focus as focus }
export { jumper as jumper }
export { jwt as jwt }
export { lazy as lazy }
export { routerCanonical as routerCanonical }
export { routerCoalesce as routerCoalesce }
export { routerProxy as routerProxy }
export { script as script }
export { timezone as timezone }
export { titleParts as titleParts }

export default {
	focus,
	jumper,
	jwt,
	lazy,
	routerCanonical,
	routerCoalesce,
	routerProxy,
	script,
	timezone,
	titleParts,
}
