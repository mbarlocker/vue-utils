import { computed } from 'vue'
import { ref } from 'vue'
import { watchEffect } from 'vue'

export function useVModel<T>(getter: () => T, emitter: (value: T) => void) {
	let current = getter()

	const counter = ref(0)

	function updater(value: T, emit: boolean) {
		if (value !== current) {
			current = value
			counter.value++

			if (emit) {
				emitter(value)
			}
		}
	}

	watchEffect(() => updater(getter(), false))

	return computed<T>({
		get: () => {
			counter.value
			return current
		},
		set: (value: T) => {
			updater(value, true)
		}
	})
}

