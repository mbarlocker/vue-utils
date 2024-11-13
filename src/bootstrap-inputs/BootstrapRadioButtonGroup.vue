<template>
	<div class="btn-group">
		<template v-for="option in options" :key="option.id">
			<input
				v-model="modelValue"
				type="radio"
				class="btn-check"
				:name="name"
				:value="option.id"
				:id="`${id}-${option.id}`"
				:disabled="option.disabled"
				:required="required"
			/>

			<label
				:class="`btn btn-${size} btn-outline-${color}`"
				:for="`${id}-${option.id}`"
			>
				{{option.name}}
			</label>
		</template>
	</div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { defineComponent } from 'vue'
import { useVModel } from '../vmodel/index.js'

export interface Option {
	id: string | number
	name: string
	disabled?: boolean
}

export default defineComponent({
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
		id: {
			type: String,
			default: () => `radio-${+new Date}-${Math.random()}`,
		},
		size: {
			type: String,
			default: '',
		},
		color: {
			type: String,
			required: true,
		},
		required: {
			type: Boolean,
			default: false,
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
