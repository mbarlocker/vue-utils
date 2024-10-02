import type { App } from 'vue'
import type { DirectiveBinding } from 'vue'

export type Controller = {
	dispose(): void
	update(): void
}

export const mappedDirective = <T extends Controller>(app: App, directive: string, creator: (el: HTMLElement) => T) => {
	const map = new Map<HTMLElement, T>()

	function on(element: HTMLElement) {
		const controller = map.get(element)
		if (controller) {
			controller.update()
		}
		else {
			map.set(element, creator(element))
		}
	}

	function off(element: HTMLElement) {
		const controller = map.get(element)
		if (controller) {
			controller.dispose()
			map.delete(element)
		}
	}

	function reset(element: HTMLElement, binding: DirectiveBinding) {
		if (binding.value === undefined || binding.value) {
			on(element)
		}
		else {
			off(element)
		}
	}

	app.directive(directive, {
		mounted(element: HTMLElement, binding: DirectiveBinding) {
			reset(element, binding)
		},
		unmounted(element: HTMLElement, _binding: DirectiveBinding) {
			off(element)
		},
		updated(element: HTMLElement, binding: DirectiveBinding) {
			reset(element, binding)
		},
	})
}
