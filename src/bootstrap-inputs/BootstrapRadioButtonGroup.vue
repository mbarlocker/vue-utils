<template>
	<div class="btn-group">
		<template v-for="option in options" :key="typeof option === 'string' ? option : option.id">
			<input
				v-model="modelValue"
				type="radio"
				class="btn-check"
				:name="name"
				:checked="modelValue === (typeof option === 'string' ? option : option.id)"
				:value="typeof option === 'string' ? option : option.id"
				:id="`${id}-${typeof option === 'string' ? option : option.id}`"
				:disabled="typeof option === 'string' ? false : option.disabled"
				@input="$emit('update:modelValue', ($event.target! as HTMLInputElement).value)"
			/>

			<label
				:class="`btn btn-${size} btn-outline-${color}`"
				:for="`${id}-${typeof option === 'string' ? option : option.id}`"
			>
				{{typeof option === 'string' ? option : option.name}}
			</label>
		</template>
	</div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { watchEffect } from 'vue'

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
	},
	emits: [
		'update:modelValue',
	],
	setup: (props, _context) => {
		const modelValue = ref('')
		watchEffect(() => modelValue.value = `${props.modelValue}`)

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
