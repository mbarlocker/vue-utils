<template>
	<div :class="{ 'mb-3': !noMargin }">
		<div
			v-bind="containerAttrs"
			class="input-group"
		>
			<div class="form-floating">
				<textarea
					ref="inputElement"
					v-bind="$attrs"
					v-focus="autofocus"
					:autofocus="autofocus"
					:id="id"
					v-model="modelValue"
					:class="{
						'form-control': !textonly,
						'form-control-plaintext': textonly,
					}"
					placeholder=" "
					@focus="$emit('focus', $event)"
					@blur="handleBlur($event)"
					@keydown="$emit('keydown', $event)"
					@keyup="$emit('keyup', $event)"
					@keypress="handleKeypress($event)"
					@input="$emit('update:modelValue', ($event.target! as HTMLInputElement).value)"
				/>
				<label v-if="label" :for="id">{{label}}</label>
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
			type: String,
			default: '',
		},
		id: {
			type: String,
			default: () => `form-${+new Date}-${Math.random()}`,
		},
		label: {
			type: String,
			required: false,
		},
		textonly: {
			type: Boolean,
			default: false,
		},
		autofocus: {
			type: Boolean,
			default: false,
		},
		trim: {
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
	},
	emits: [
		'update:modelValue',
		'focus',
		'blur',
		'keydown',
		'keyup',
		'keypress',
	],
	setup: (props, context) => {
		const inputElement = ref<HTMLInputElement>()

		const modelValue = ref<string | number>('')
		watchEffect(() => modelValue.value = props.modelValue)

		function focus() {
			inputElement.value?.focus()
		}

		function select() {
			inputElement.value?.select()
		}

		function setValue(text: string) {
			modelValue.value = text
			context.emit('update:modelValue', text)
		}

		function trim() {
			if (props.trim) {
				setValue(modelValue.value.toString().trim())
			}
		}

		function handleBlur(event: FocusEvent) {
			trim()
			context.emit('blur', event)
		}

		function handleKeypress(event: KeyboardEvent) {
			if (event.keyCode === 13 || event.key === 'Enter') {
				trim()
			}

			context.emit('keypress', event)
		}

		return {
			focus,
			handleBlur,
			handleKeypress,
			inputElement,
			modelValue,
			select,
			setValue,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
