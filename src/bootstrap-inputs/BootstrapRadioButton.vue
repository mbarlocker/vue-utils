<template>
	<span>
		<input
			v-model="modelValue"
			type="radio"
			class="btn-check"
			:name="name"
			:value="value"
			:id="`${id}`"
			:disabled="disabled"
			:required="required"
		/>

		<label
			:class="`btn btn-${size} btn-outline-${color}`"
			:for="`${id}`"
		>
			{{label}}
		</label>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVModel } from '../vmodel/index.js'

export default defineComponent({
	props: {
		modelValue: {
			type: [String, Number],
			default: '',
		},
		value: {
			type: [String, Number],
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
		label: {
			type: String,
			required: true,
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
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'update:modelValue',
	],
	setup: (props, context) => {
		const modelValue = useVModel(() => `${props.modelValue}`, (value) => context.emit('update:modelValue', value))

		return {
			modelValue,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
