<template>
	<span>
		<input
			v-model="modelValue"
			type="checkbox"
			class="btn-check"
			:id="id"
		/>

		<label
			:class="`btn btn-${size} btn-outline-${color}`"
			:for="id"
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
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			required: true,
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
