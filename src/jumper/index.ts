import { isNavigationFailure } from 'vue-router'
import { RouteLocationRaw } from 'vue-router'
import { Router } from 'vue-router'
import { useRouter } from 'vue-router'
import { useSessionStorage } from '@vueuse/core'

export type JumpReturn = ReturnType<Router['replace']>

export function useJumper(name: string) {
	const router = useRouter()
	const current = useSessionStorage<string | undefined>(`jumper-${name}`, undefined)

	const clear = (): void => {
		current.value = undefined
	}

	const set = (url: string): void => {
		current.value = url
	}

	const get = (): string => {
		if (current.value === undefined) {
			throw new Error('Jumper value is not defined')
		}

		return current.value
	}

	const getSafe = (): string | undefined => {
		return current.value
	}

	const exists = () => {
		return current.value !== undefined
	}

	const executeJump = (location: string | RouteLocationRaw, replace: boolean): JumpReturn => {
		if (typeof location !== 'string') {
			location = router.resolve(location).path
		}

		const canonical = new URL(location, window.location.href)
		if (canonical.pathname === router.currentRoute.value.path) {
			return Promise.reject(new Error('Refusing to jump to current route'))
		}

		const fn = replace ? router.replace : router.push
		return fn(location)
			.then(failure => {
				if (isNavigationFailure(failure)) {
					throw failure
				}

				return failure
			})
	}

	const jump = (replace: boolean = false): JumpReturn => {
		const url = current.value
		if (url === undefined) {
			return Promise.reject(new Error('No jump available'))
		}

		current.value = undefined
		return executeJump(url, replace)
	}

	const jumpOrFirst = (locations: RouteLocationRaw[], replace: boolean = false): JumpReturn => {
		let index = 0

		function next(lastError: Error): Promise<any> {
			const location = locations[index++]

			if (location === undefined) {
				throw lastError
			}

			return executeJump(location, replace).catch(next)
		}

		return jump(replace).catch(next)
	}

	const redirect = (to: RouteLocationRaw, replace: boolean = false): JumpReturn => {
		current.value = router.currentRoute.value.path

		const fn = replace ? router.replace : router.push
		return fn(to)
	}

	return {
		clear,
		current,
		exists,
		get,
		getSafe,
		jump,
		jumpOrFirst,
		redirect,
		set,
	}
}
