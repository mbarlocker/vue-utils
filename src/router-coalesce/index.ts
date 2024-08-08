import { isArray } from 'lodash'

export const coalesceSingle = <T>(value: T | Array<T | null> | null): undefined | T => {
	return coalesceMultiple(value)?.[0]
}

export const coalesceMultiple = <T>(value: T | Array<T | null> | null): undefined | T[] => {
	if (value === null || value === undefined) {
		return undefined
	}

	const ret: T[] = []
	if (isArray(value)) {
		value.forEach(v => {
			if (v !== null && v !== undefined) {
				ret.push(v)
			}
		})
	}
	else {
		ret.push(value)
	}

	return ret
}

export const coalesce = coalesceSingle
