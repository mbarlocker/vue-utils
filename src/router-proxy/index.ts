import { coalesceMultiple } from '../router-coalesce/index.js'
import { computed } from 'vue'
import { debounce } from 'lodash'
import { defaultsDeep } from 'lodash'
import { identity } from 'lodash'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

export interface ParamOptions {
	anchor: string
	debounce: boolean
	replace: boolean
}

const defaultParamOptions: ParamOptions = {
	anchor: '',
	debounce: false,
	replace: false,
}

function stringify<T>(value: T): string { return `${value}` }
function intify(value: string): number { return parseInt(value) }
function floatify(value: string): number { return parseFloat(value) }
function boolify(value: string): boolean { return ['true','t','1'].includes(value.toLowerCase()) }

export function useRouterProxy() {
	const router = useRouter()
	const route = useRoute()

	const originalRouteName = route.name

	function isSpecified(name: string): boolean {
		return coalesceMultiple(route.query[name]) !== undefined
	}

	function params(name: string, defaultValue: string[], opts: Partial<ParamOptions>) {
		let last: string[] = []

		return computed<string[]>({
			get: () => {
				if (route.name === originalRouteName) {
					last = coalesceMultiple(route.query[name]) ?? defaultValue
				}

				return last
			},
			set: (value) => {
				if (route.name === originalRouteName) {
					queueUpdate(name, value, opts)
				}
			},
		})
	}

	function paramsTyped<T>(name: string, defaultValue: string[], opts: Partial<ParamOptions>, getter: (value: string) => T, setter: (value: T) => string) {
		const underlying = params(name, defaultValue, opts)
		return computed<T[]>({
			get: () => underlying.value.map(v => getter(v)),
			set: (value) => underlying.value = value.map(v => setter(v)),
		})
	}

	function paramTyped<T>(name: string, defaultValue: string, opts: Partial<ParamOptions>, getter: (value: string) => T, setter: (value: T) => string) {
		const underlying = params(name, [], opts)
		return computed<T>({
			get: () => getter(underlying.value[0] ?? defaultValue),
			set: (value) => underlying.value = [setter(value)],
		})
	}

	function makeParamsFn<T>(getter: (value: string) => T, setter: (value: T) => string) {
		return (name: string, defaultValue: string[], opts: Partial<ParamOptions> = {}) => {
			return paramsTyped(name, defaultValue, opts, getter, setter)
		}
	}

	function makeParamFn<T>(getter: (value: string) => T, setter: (value: T) => string) {
		return (name: string, defaultValue: string, opts: Partial<ParamOptions> = {}) => {
			return paramTyped(name, defaultValue, opts, getter, setter)
		}
	}

	const paramsString = makeParamsFn<string>(identity, identity)
	const paramString = makeParamFn<string>(identity, identity)

	const paramsInt = makeParamsFn(intify, stringify)
	const paramInt = makeParamFn(intify, stringify)

	const paramsFloat = makeParamsFn(floatify, stringify)
	const paramFloat = makeParamFn(floatify, stringify)

	const paramsBoolean = makeParamsFn(boolify, stringify)
	const paramBoolean = makeParamFn(boolify, stringify)

	let updates: Record<string, string|string[]> = {}
	let updateOptions: Partial<ParamOptions> = {}
	let timeout = false
	let batching = false

	function batch(fn: () => any) {
		if (timeout) {
			updateRouteDebounce.cancel()
			timeout = false
		}

		batching = true
		try {
			fn()
		}
		finally {
			batching = false
		}

		updateRoute()
	}

	function queueUpdate(key: string, value: string|string[], opts: Partial<ParamOptions>) {
		updates[key] = value
		updateOptions = defaultsDeep(updateOptions, opts)

		if (!batching) {
			if (updateOptions.debounce ?? defaultParamOptions.debounce) {
				updateRouteDebounce()
			}
			else {
				updateRouteDebounce.cancel()
				updateRoute()
			}
		}
	}

	function updateRoute() {
		const anchor = updateOptions.anchor ?? defaultParamOptions.anchor
		const replace = updateOptions.replace ?? defaultParamOptions.replace

		const merged = {
			hash: anchor ? `#${anchor}` : '',
			query: {
				...route.query,
				...updates,
			},
		}

		const fn = (replace ? router.replace : router.push)
		fn(merged)

		updates = {}
		updateOptions = {}
	}
	const updateRouteDebounce = debounce(updateRoute, 500)

	return {
		batch,
		isSpecified,

		paramsBoolean,
		paramBoolean,

		paramsFloat,
		paramFloat,

		paramsInt,
		paramInt,

		paramsString,
		paramString,

		paramsTyped,
		paramTyped,
	}
}
