<template>
	<span>
		<input
			v-model="modelValue"
			type="checkbox"
			class="btn-check"
			:id="id"
			@input="toggle()"
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
import { ref } from 'vue'
import { watchEffect } from 'vue'

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
		const modelValue = ref(false)
		watchEffect(() => modelValue.value = props.modelValue)

		function toggle() {
			modelValue.value = !modelValue.value
			context.emit('update:modelValue', modelValue.value)
		}

		return {
			modelValue,
			toggle,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
