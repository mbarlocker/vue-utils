<template>
	<div :class="{ 'mb-3': !noMargin }">
		<div
			v-bind="containerAttrs"
			class="input-group"
		>
			<slot name="prepend">
				<div class="input-group-text" v-if="$slots.prependText || prependIcon">
					<slot name="prependText">
						<font-awesome-icon v-if="prependIcon" :icon="prependIcon" fixedWidth />
					</slot>
				</div>
			</slot>

			<div class="form-floating">
				<input
					ref="inputElement"
					v-bind="$attrs"
					v-focus="autofocus"
					:autofocus="autofocus"
					:id="id"
					:value="(disabled || readonly) && (modelValue ?? '') === '' && label !== '' ? ' ' : modelValue"
					:class="{
						'form-control': !textonly,
						'form-control-plaintext': textonly,
					}"
					:readonly="readonly"
					:disabled="disabled"
					:tabIndex="(readonly || disabled) ? -1 : 0"
					placeholder=" "
					@focus="$emit('focus', $event)"
					@blur="handleBlur($event)"
					@keydown="$emit('keydown', $event)"
					@keyup="$emit('keyup', $event)"
					@keypress="handleKeypress($event)"
					@input="handleInput(($event.target! as HTMLInputElement).value)"
					@paste="$emit('paste', $event)"
				/>
				<label v-if="label" :for="id">{{label}}</label>
			</div>

			<slot name="append">
				<div class="input-group-text" v-if="$slots.appendText || appendIcon">
					<slot name="appendText">
						<font-awesome-icon v-if="appendIcon" :icon="appendIcon" fixedWidth />
					</slot>
				</div>
			</slot>
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
			type: [String, Number],
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
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
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
		prependIcon: {
			type: [String, Array],
			required: false,
		},
		appendIcon: {
			type: [String, Array],
			required: false,
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
		'paste',
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

		function handleInput(value: string | number) {
			modelValue.value = value
			context.emit('update:modelValue', value)
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
			handleInput,
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
