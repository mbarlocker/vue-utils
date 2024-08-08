
export function currentZone(): string {
	return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function localToUtcDate(date: Date): Date {
	return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
}

export function utcToLocalDate(date: Date): Date {
	return new Date(date.getTime() + date.getTimezoneOffset() * 60_000)
}
