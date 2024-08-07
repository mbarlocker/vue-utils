
export const DefaultScopes = [
	'[autofocus]',
	'input:not([disabled]):not([tabindex="-1"]),select:not([disabled]):not([tabindex="-1"]),textarea:not([disabled]):not([tabindex="-1"])',
	'a:not([disabled]):not([tabindex="-1"]),button:not([disabled]):not([tabindex="-1"])',
	'[tabindex]',
]

export interface FocusOptions {
	scopes: string[]
	focus: boolean
	select: boolean
}

export function focus(element: Element | undefined | null, options?: Partial<FocusOptions>): Element | undefined {
	if (!element) { return undefined }
	if (!(element instanceof Element)) { return undefined }

	let success = false
	const cast = element as HTMLInputElement

	if ((options?.focus ?? true) && 'focus' in cast) {
		cast.focus()
		success = true
	}

	if ((options?.select ?? true) && 'select' in cast) {
		cast.select()
		success = true
	}

	return success ? element : undefined
}

export function focusFirstEligible(element: Element | undefined | null, options?: Partial<FocusOptions>): Element | undefined {
	if (!element) { return undefined }

	const scopes = options?.scopes ?? DefaultScopes

	for (const query of scopes) {
		const children = element.querySelectorAll(query)

		for (let i = 0; i < children.length; i++) {
			const child = children[i]
			if (focus(child, options)) {
				return child
			}
		}
	}

	return undefined
}
