<template>
	<BootstrapDropdown
		ref="inputElement"
		v-model="text"
		type="search"
		:hideDropdown="hideDropdown"
		:required="required"
		:pattern="(required || text !== '') && selection === undefined ? '^$' : pattern"
		@update:modelValue="onTextUpdated"
		@blur="onBlur"
		@focus="onFocus"
		@keydown="onKeydown"
		@keypress="$emit('keypress', $event)"
		@keyup="$emit('keyup', $event)"
	>
		<template v-slot:prepend v-if="$slots.prepend"><slot name="prepend" /></template>
		<template v-slot:prependText v-if="$slots.prependText"><slot name="prependText" /></template>
		<template v-slot:append v-if="$slots.append"><slot name="append" /></template>
		<template v-slot:help v-if="$slots.help"><slot name="help" /></template>

		<template v-slot:appendText v-if="statusIcon || $slots.appendText">
			<slot name="appendText">
				<span v-if="loading" class="spinner spinner-grow spinner-grow-sm" />
				<span v-else-if="error" class="text-danger"><font-awesome-icon icon="times" /></span>
				<span v-else><font-awesome-icon icon="search" /></span>
			</slot>
		</template>

		<template v-slot>
			<ul class="list-group list-group-hover m-0 p-0">
				<li v-if="error" class="list-group-item">
					<em>Error during search</em>
				</li>

				<li v-else-if="loading" class="list-group-item">
					<em>Searching...</em>
				</li>

				<li v-else-if="text === '' && !searchEmpty" class="list-group-item">
					<em>Start typing to search</em>
				</li>

				<li v-else-if="!options.length" class="list-group-item">
					<em>No results found</em>
				</li>

				<li
					v-else
					v-for="(option, index) in options.slice(0, maxOptions)" :key="typeof option === 'string' ? option : option.id"
					class="list-group-item cursor-pointer"
					@click="selectIndex(index)"
					:class="{
						'active': index === highlightedIndex,
					}"
				>
					<slot name="option" :option="option">
						{{typeof option === 'string' ? option : (option.name ?? option)}}
					</slot>
				</li>
			</ul>
		</template>
	</BootstrapDropdown>
</template>

<script lang="ts">
import BootstrapDropdown from './BootstrapDropdown.vue'
import type { PropType } from 'vue'
import { clamp } from 'lodash'
import { debounce } from 'lodash'
import { defineComponent } from 'vue'
import { get } from 'lodash'
import { isString } from 'lodash'
import { ref } from 'vue'
import { watch } from 'vue'
import { watchEffect } from 'vue'

export type Option = string | {
	id: any
	name?: string
	[key: string]: any
}

export type SearchFunction = (text: string) => Promise<Array<Option|string>>

export default defineComponent({
	components: {
		BootstrapDropdown,
	},
	props: {
		text: {
			type: [String, Number],
			default: '',
		},
		selection: {
			type: [String, Object] as PropType<Option>,
			required: false,
		},
		search: {
			type: Function as PropType<SearchFunction>,
			required: true,
		},
		searchEmpty: {
			type: Boolean,
			default: false,
		},
		pattern: {
			type: String,
			required: false,
		},
		required: {
			type: Boolean,
			default: false,
		},
		statusIcon: {
			type: Boolean,
			default: false,
		},
		textProp: {
			type: String,
			default: 'name',
		},
		debounce: {
			type: Number,
			default: 250,
		},
		maxOptions: {
			type: Number,
			default: Infinity,
		},
	},
	emits: [
		'update:text',
		'update:selection',
		'selected',
		'blur',
		'focus',
		'keydown',
		'keypress',
		'keyup',
	],
	setup: (props, context) => {
		const inputElement = ref<HTMLInputElement>()

		const hideDropdown = ref(false)
		const loading = ref(false)
		const error = ref(false)

		const highlightedIndex = ref(-1)

		const text = ref('')
		watchEffect(() => text.value = `${props.text}`)

		const options = ref(new Array<Option>())
		const selection = ref<Option>()
		watchEffect(() => selection.value = props.selection)

		let skipSearch = false
		let searchedText = 'NEVER THE DEFAULT VALUE'
		let loadedCounter = 0
		let promiseCounter = 0
		let focused = false

		function searchIfNeeded() {
			if (!focused) { return }

			if (skipSearch) {
				skipSearch = false
				return
			}

			if (text.value === searchedText) {
				hideDropdown.value = false
				return
			}

			loading.value = true
			debouncedSearch()
		}

		function focus() {
			inputElement.value?.focus()
		}

		function select() {
			inputElement.value?.select()
		}

		function onFocus(event: FocusEvent) {
			focused = true
			context.emit('focus', event)
			searchIfNeeded()
		}

		function onBlur(event: FocusEvent) {
			focused = false
			context.emit('blur', event)
		}

		function onTextUpdated(t: string) {
			if (text.value !== t) {
				text.value = t
				context.emit('update:text', t)
			}

			if (selection.value !== undefined) {
				selection.value = undefined
				context.emit('update:selection', undefined)
			}
		}

		function onKeydown(event: KeyboardEvent) {
			if (event.key === 'ArrowDown' || event.keyCode === 40) {
				hideDropdown.value = false
				event.preventDefault()
				highlightedIndex.value = clamp(highlightedIndex.value + 1, 0, options.value.length)
			}
			else if (event.key === 'ArrowUp' || event.keyCode === 38) {
				hideDropdown.value = false
				event.preventDefault()
				highlightedIndex.value = clamp(highlightedIndex.value - 1, 0, options.value.length)
			}
			else if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
				event.preventDefault()

				if (!hideDropdown.value) {
					event.stopPropagation()
					hideDropdown.value = true
				}
			}
			else if (event.key === 'Enter' || event.keyCode === 13) {
				if (!hideDropdown.value) {
					event.preventDefault()

					if (options.value.length) {
						selectIndex(highlightedIndex.value)
					}
				}
			}
			else {
				hideDropdown.value = false
			}
		}

		function selectIndex(index: number) {
			const selected = options.value[index]
			if (selected === undefined) { return }

			if (isString(selected)) {
				text.value = selected
			}
			else {
				const extracted = get(selected, props.textProp)

				if (isString(extracted)) {
					text.value = extracted
				}
			}

			// updating the selection will trigger another search, which likely isn't relevant
			// because we just selected an item
			skipSearch = true

			selection.value = selected
			context.emit('update:text', text.value)
			context.emit('update:selection', selected)
			context.emit('selected', selected)

			hideDropdown.value = true
		}

		function search() {
			if (!focused) { return }

			const counter = ++promiseCounter
			const currentText = text.value

			options.value = []
			highlightedIndex.value = -1
			loading.value = true
			error.value = false

			function done() {
				loading.value = false
				searchedText = currentText
			}

			if (text.value === '' && !props.searchEmpty) {
				done()
				return
			}

			props.search(text.value)
				.then(data => {
					if (counter > loadedCounter) {
						loadedCounter = counter
						error.value = false
						options.value = data
					}
				})
				.catch(() => {
					if (counter > loadedCounter) {
						loadedCounter = counter
						error.value = true
					}
				})
				.finally(() => {
					if (counter === promiseCounter) {
						done()
					}

					highlightedIndex.value = 0
				})
		}
		const debouncedSearch = debounce(search, props.debounce)

		watch(
			() => text.value,
			() => searchIfNeeded(),
			{ immediate: true },
		)

		return {
			error,
			focus,
			hideDropdown,
			highlightedIndex,
			inputElement,
			loading,
			onBlur,
			onFocus,
			onKeydown,
			onTextUpdated,
			options,
			select,
			selectIndex,
			selection,
			text,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
