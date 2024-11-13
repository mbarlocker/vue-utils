<template>
	<BootstrapRadio
		v-for="option in options"
		:key="option.id"
		v-model="modelValue"
		:name="name"
		:value="option.id"
		:disabled="option.disabled"
		:label="option.name"
	/>
</template>

<script lang="ts">
import BootstrapRadio from './BootstrapRadio.vue'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { defineComponent } from 'vue'
import { useVModel } from '../vmodel/index.js'

export interface Option {
	id: string
	name: string
	disabled?: boolean
}

export default defineComponent({
	components: {
		BootstrapRadio,
	},
	props: {
		modelValue: {
			type: [String, Number],
			default: '',
		},
		options: {
			type: Array as PropType<(Option | string)[]>,
			required: true,
		},
		name: {
			type: String,
			default: () => `radio-${+new Date}-${Math.random()}`,
		},
	},
	emits: [
		'update:modelValue',
	],
	setup: (props, context) => {
		const modelValue = useVModel(() => `${props.modelValue}`, (value) => context.emit('update:modelValue', value))

		const options = computed<Option[]>(() => {
			return props.options.map(o => {
				if (typeof o === 'string') {
					return {
						id: o,
						name: o,
					}
				}

				return o
			})
		})

		return {
			modelValue,
			options,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
