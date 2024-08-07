import { defaultsDeep } from 'lodash'

export interface Options {
	async: boolean
	type: string
	charset: string
	once: boolean
}

export interface Success {
	loaded: true
}

export interface Failure {
	loaded: false
	error: Error
	message: string
}

export type Return = Success | Failure

const promises: Record<string, Promise<Return>> = {}

const container = document.head ?? document.body

function createTag(src: string, options: Options): Promise<Return> {
	return new Promise((resolve, reject) => {
		const tag = document.createElement('script')

		tag.type = options.type
		tag.async = options.async
		tag.charset = options.charset
		tag.src = src

		tag.addEventListener('load', () => {
			resolve({ loaded: true })
		}, { once: true })

		tag.addEventListener('error', (err) => {
			reject({
				loaded: false,
				error: err,
				message: `Failed to load script: ${src}`,
			})
		}, { once: true })

		container.appendChild(tag)
	})
}

export function load(src: string, opts?: Partial<Options>): Promise<Return> {
	const options: Options = defaultsDeep(opts, {
		type: 'text/javascript',
		async: true,
		charset: 'utf8',
		once: false,
	})

	if (src in promises) {
		return promises[src]
	}

	const promise = createTag(src, options)
	promises[src] = promise
	return promise
}

export default load
