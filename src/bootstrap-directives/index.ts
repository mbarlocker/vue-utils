import type { App } from 'vue'

export const mappedDirective = <T extends { dispose(): void }>(app: App, directive: string, creator: (el: HTMLElement) => T) => {
	const map = new Map<HTMLElement, T>()

	function on(e: HTMLElement) {
		if (!map.has(e)) {
			map.set(e, creator(e))
		}
	}

	function off(el: HTMLElement) {
		const existing = map.get(el)
		if (existing) {
			existing.dispose()
			map.delete(el)
		}
	}

	function reset(e: HTMLElement) {
		off(e)
		on(e)
	}

	app.directive(directive, {
		mounted(e: HTMLElement, binding) {
			if (binding.value === undefined || binding.value) {
				on(e)
			}
		},
		unmounted(e: HTMLElement, binding) {
			if (binding.value === undefined || binding.value) {
				off(e)
			}
		},
		updated(e: HTMLElement, binding) {
			if (binding.value === undefined || binding.value) {
				reset(e)
			}
		},
	})
}
