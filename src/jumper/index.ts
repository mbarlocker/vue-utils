import { coalesceSingle } from '../router-coalesce/index.js'
import { isNavigationFailure } from 'vue-router'
import { useRouter } from 'vue-router'

export const useJumper = () => {
	const router = useRouter()

	const fromQuery = (name: string): string | undefined => {
		return coalesceSingle(router.currentRoute.value.query[name])
	}

	const fromParam = (name: string): string | undefined => {
		return coalesceSingle(router.currentRoute.value.params[name])
	}

	const fromChain = (name: string): string | undefined => {
		return fromParam(name) ?? fromQuery(name)
	}

	const keep = (name: string = 'jump') => {
		const path = fromChain(name)
		if (path === undefined) {
			return {}
		}
		else {
			return {
				[`${name}`]: path,
			}
		}
	}

	const jump = (name: string = 'jump', replace: boolean = false): Promise<any> => {
		const chain = fromChain(name)
		const url = decodeURIComponent(chain ?? '')

		if (!url) {
			return Promise.reject(new Error('No jump available'))
		}

		const canonical = new URL(url, window.location.href)
		if (canonical.pathname === router.currentRoute.value.path) {
			return Promise.reject(new Error('Refusing to jump to current route'))
		}

		const fn = replace ? router.replace : router.push
		return fn(url)
			.then(failure => {
				if (isNavigationFailure(failure)) { throw failure }
				return failure
			})
	}

	return {
		jump,
		keep,
	}
}

export default useJumper
