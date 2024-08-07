
export function decode(value: string) {
	const parts: string[] = value.split('.').map(x => atob(x))

	return {
		header: parts[0],
		payload: parts[1],
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

export default {
	decode,
	getHeader,
	getPayload,
	getSignature,
	parseHeader,
	parsePayload,
}
