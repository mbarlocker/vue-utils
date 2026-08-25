<template>
	<span>
		<input
			v-model="modelValue"
			type="checkbox"
			class="btn-check"
			:id="id"
			:disabled="disabled"
		/>

		<label
			:class="`btn btn-${size} btn-outline-${color}`"
			:for="id"
		>
			<slot name="label">
				{{label}}
			</slot>
		</label>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVModel } from '../vmodel/index.js'

export default defineComponent({
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: '',
		},
		id: {
			type: String,
			default: () => `checkbox-${+new Date}-${Math.random()}`,
		},
		size: {
			type: String,
			default: '',
		},
		color: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'update:modelValue',
	],
	setup: (props, context) => {
		const modelValue = useVModel(() => props.modelValue, (value) => context.emit('update:modelValue', value))

		return {
			modelValue,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
