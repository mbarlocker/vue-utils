import Cookies from 'js-cookie'
import { computed } from 'vue'
import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'

export type Attributes = Parameters<typeof Cookies.set>[2]
type Library = typeof Cookies

export function useCookie(name: string, options?: Attributes | Library) {
	const lib = (options !== undefined && 'withAttributes' in options)
		? options
		: Cookies.withAttributes(options ?? {})

	const trigger = ref(0)

	const get = () => lib.get(name)
	const set = (value: string) => {
		trigger.value++
		lib.set(name, value)
	}
	const remove = () => {
		trigger.value++
		lib.remove(name)
	}

	const reactive = computed<string | undefined>({
		get: () => {
			trigger.value // reactivity
			return get()
		},
		set: (value) => {
			if (value === undefined) {
				remove()
			}
			else {
				set(value)
			}
		},
	})

	// this in case the cookie changes outside of the library.
	// since it's unlikely, only check infrequently.
	useIntervalFn(() => {
		if (reactive.value !== get()) {
			trigger.value++
		}
	}, 60_000)

	return {
		get,
		reactive,
		remove,
		set,
	}
}
