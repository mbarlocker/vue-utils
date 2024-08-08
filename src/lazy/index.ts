
export function lazy<T>(fn: () => T): () => T {
	let result: T | null = null

	return () => {
		if (result === null) {
			result = fn()
		}

		return result
	}
}
