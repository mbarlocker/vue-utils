<template>
	<div :class="{ 'mb-3': !noMargin }">
		<div
			v-bind="containerAttrs"
			class="input-group d-grid"
		>
			<div class="form-check">
				<input
					ref="inputElement"
					v-bind="$attrs"
					v-focus="autofocus"
					:autofocus="autofocus"
					:id="id"
					:name="name"
					:value="value"
					v-model="modelValue"
					class="form-check-input"
					@focus="$emit('focus', $event)"
					@blur="$emit('blur', $event)"
				/>
				<label
					v-if="label || $slots.label"
					:for="id"
					class="form-check-label"
				>
					<slot name="label">
						{{label}}
					</slot>
				</label>
			</div>
		</div>

		<slot name="help">
			<div v-if="helpText" class="form-help"> {{helpText}} </div>
		</slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { useVModel } from '../vmodel/index.js'

export default defineComponent({
	inheritAttrs: false,
	props: {
		modelValue: {
			type: String,
			default: false,
		},
		id: {
			type: String,
			default: () => `form-${+new Date}-${Math.random()}`,
		},
		label: {
			type: String,
			required: false,
		},
		autofocus: {
			type: Boolean,
			default: false,
		},
		helpText: {
			type: String,
			default: '',
		},
		noMargin: {
			type: Boolean,
			default: false,
		},
		containerAttrs: {
			type: Object,
			required: false,
		},
		name: {
			type: String,
			required: false,
		},
		value: {
			type: String,
			required: true,
		},
	},
	emits: [
		'update:modelValue',
		'focus',
		'blur',
	],
	setup: (props, context) => {
		const inputElement = ref<HTMLInputElement>()

		const modelValue = useVModel(() => props.modelValue, (value) => context.emit('update:modelValue', value))

		function focus() {
			inputElement.value?.focus()
		}

		function select() {
			inputElement.value?.select()
		}

		return {
			focus,
			inputElement,
			modelValue,
			select,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
