
export function decode(value: string) {
	const parts: string[] = value.split('.')

	return {
		header: atob(parts[0]),
		payload: atob(parts[1]),
		signature: parts[2],
	}
}

export function getHeader(value: string): string {
	return decode(value).header
}

export function getPayload(value: string): string {
	return decode(value).payload
}

export function getSignature(value: string): string {
	return decode(value).signature
}

export function parseHeader(value: string): unknown {
	return JSON.parse(getHeader(value)) as unknown
}

export function parsePayload(value: string): unknown {
	return JSON.parse(getPayload(value)) as unknown
}
