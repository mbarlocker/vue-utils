<template>
	<AutocompleteDynamic
		:search="search"
		:debounce="25"
		@update:text="$emit('update:text', $event)"
		@update:selection="$emit('update:selection', $event)"
		@selected="$emit('selected', $event)"
		@blur="$emit('blur', $event)"
		@focus="$emit('focus', $event)"
		@keydown="$emit('keydown', $event)"
		@keypress="$emit('keypress', $event)"
		@keyup="$emit('keyup', $event)"
		@paste="$emit('paste', $event)"
	>
		<template v-for="(_, name) in $slots" v-slot:[name]="slotData">
			<slot :name="name" v-bind="slotData" />
		</template>
	</AutocompleteDynamic>
</template>

<script lang="ts">
import AutocompleteDynamic from './AutocompleteDynamic.vue'
import type { PropType } from 'vue'
import type { SearchFunction } from './AutocompleteDynamic.vue'
import { defineComponent } from 'vue'
import { get } from 'lodash'
import { ref } from 'vue'

export default defineComponent({
	components: {
		AutocompleteDynamic,
	},
	props: {
		options: {
			type: Array as PropType<any[]>,
			required: true,
		},
		searchableFields: {
			type: Array as PropType<string[]>,
			required: false,
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
		'paste',
	],
	setup: (props, _context) => {
		const inputElement = ref<HTMLInputElement>()

		function focus() {
			inputElement.value?.focus()
		}

		function select() {
			inputElement.value?.select()
		}

		const search: SearchFunction = (text) => {
			const lowerText = text.toLowerCase()

			return Promise.resolve(
				props.options
					.filter(option => {
						return (props.searchableFields ?? [...Object.keys(option)])
							.some(key => {
								const value = get(option, key)
								return `${value}`.toLowerCase().includes(lowerText)
							})
					})
			)
		}

		return {
			focus,
			inputElement,
			search,
			select,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
