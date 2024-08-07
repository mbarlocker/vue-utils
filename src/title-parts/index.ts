import { computed } from 'vue'
import { defaultsDeep } from 'lodash'
import { ref } from 'vue'
import { useTitle as useVueTitle } from '@vueuse/core'
import { watch } from 'vue'

export interface Options {
	separator: string
}

const title = useVueTitle()

const changeCount = ref(0)
const resolving = ref(false)

watch(title, () => {
	changeCount.value++
	resolving.value = false
})

export const useTitle = (opts?: Partial<Options>) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const options: Options = defaultsDeep(opts, {
		separator: ' | ',
	})

	const parts = computed(() => (title.value ?? '').split(options.separator))
	const head = computed(() => parts.value[0])
	const tail = computed(() => parts.value.slice(1))

	const replacePart = (index: number, replacement: string | Promise<string>) => {
		const current: (string | Promise<string>)[] = [...parts.value]
		
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		current.splice(index, 1, replacement)
		return replaceParts(current)
	}

	const replaceParts = (newParts: (string | Promise<string>)[]) => {
		const promises: Promise<string>[] = []
		newParts.forEach(part => {
			promises.push(typeof part === 'string' ? Promise.resolve(part) : part)
		})

		const single = Promise.all(promises).then(all => all.join(options.separator))
		return replace(single)
	}

	const replace = (replacement: string | Promise<string>) => {
		const promise = typeof replacement === 'string' ? Promise.resolve(replacement) : replacement
		const counter = changeCount.value

		resolving.value = true

		return promise
			.then(replacement => {
				if (counter === changeCount.value && title.value !== replacement) {
					title.value = replacement
				}
			})
			.finally(() => {
				// in case title didn't change
				if (counter === changeCount.value) {
					resolving.value = false
				}
			})
	}

	return {
		head,
		parts,
		replace,
		replacePart,
		replaceParts,
		resolving,
		tail,
		title,
	}
}
