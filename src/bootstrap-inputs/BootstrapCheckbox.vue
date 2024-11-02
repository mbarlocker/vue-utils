<template>
	<div :class="{ 'mb-3': !noMargin }">
		<div
			v-bind="containerAttrs"
			class="input-group d-grid"
		>
			<div
				:class="{
					'form-check': !useButton,
					'form-switch': useSwitch,
					'd-grid': useButton,
				}"
			>
				<input
					ref="inputElement"
					v-bind="$attrs"
					v-focus="autofocus"
					:autofocus="autofocus"
					:id="id"
					:name="name"
					:type="type"
					v-model="modelValue"
					class="form-check-input"
					:class="{ 'btn-check': useButton }"
					@focus="$emit('focus', $event)"
					@blur="$emit('blur', $event)"
					@change="$emit('update:modelValue', ($event.target! as HTMLInputElement).checked)"
				/>
				<label
					v-if="label || $slots.label"
					:for="id"
					class="form-check-label"
					:class="{
						[`btn ${buttonClass}`]: useButton,
					}"
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
import { watchEffect } from 'vue'

export default defineComponent({
	inheritAttrs: false,
	props: {
		modelValue: {
			type: Boolean,
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
		useSwitch: {
			type: Boolean,
			default: false,
		},
		useButton: {
			type: Boolean,
			default: false,
		},
		buttonClass: {
			type: String,
			default: 'btn-outline-secondary',
		},
		containerAttrs: {
			type: Object,
			required: false,
		},
		type: {
			type: String,
			default: 'checkbox',
		},
		name: {
			type: String,
			required: false,
		},
	},
	emits: [
		'update:modelValue',
		'focus',
		'blur',
	],
	setup: (props, _context) => {
		const inputElement = ref<HTMLInputElement>()

		const modelValue = ref(false)
		watchEffect(() => modelValue.value = props.modelValue ?? false)

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
