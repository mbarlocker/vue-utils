<template>
	<div
		v-bind="containerAttrs"
		v-on-click-outside="onOutsideClick"
		class="dropdown position-relative"
		:class="{ 'mb-3': !noMargin }"
	>
		<div ref="inputContainer">
			<BootstrapInput
				ref="inputElement"
				v-bind="$attrs"
				v-model="modelValue"
				autocomplete="off"
				noMargin
				@keydown="onKeydown"
				@keyup="$emit('keyup', $event)"
				@keypress="$emit('keypress', $event)"
				@blur="$emit('blur', $event)"
				@focus="onFocus"
			>
				<template v-slot:prepend v-if="$slots.prepend"><slot name="prepend" /></template>
				<template v-slot:prependText v-if="$slots.prependText"><slot name="prependText" /></template>
				<template v-slot:append v-if="$slots.append"><slot name="append" /></template>
				<template v-slot:appendText v-if="$slots.appendText"><slot name="appendText" /></template>
				<template v-slot:help v-if="$slots.help"><slot name="help" /></template>
			</BootstrapInput>
		</div>

		<div ref="dropdownContainer" class="dropdown-menu shadow-lg p-0 m-0" :class="{'show': showDropdown && !hideDropdown}">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import BootstrapInput from './BootstrapInput.vue'
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { useVModel } from '../vmodel/index.js'
import { vOnClickOutside } from '@vueuse/components'

export default defineComponent({
	inheritAttrs: false,
	directives: {
		vOnClickOutside,
	},
	props: {
		modelValue: {
			type: [String, Number],
			default: '',
		},
		containerAttrs: {
			type: Object,
			default: () => {},
		},
		hideDropdown: {
			type: Boolean,
			default: false,
		},
		noMargin: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'update:modelValue',
		'blur',
		'focus',
		'keydown',
		'keypress',
		'keyup',
	],
	setup: (props, context) => {
		const dropdownContainer = ref<HTMLElement>()
		const inputContainer = ref<HTMLElement>()
		const inputElement = ref<HTMLInputElement>()

		const modelValue = useVModel(() => `${props.modelValue}`, (value) => context.emit('update:modelValue', value))

		const showDropdown = ref(false)

		function focus() {
			inputElement.value?.focus()
		}

		function select() {
			inputElement.value?.select()
		}

		function onFocus(event: FocusEvent) {
			showDropdown.value = true
			context.emit('focus', event)
		}

		function onKeydown(event: KeyboardEvent) {
			if (event.key === 'Tab' || event.keyCode === 9) {
				showDropdown.value = false
			}

			context.emit('keydown', event)
		}

		function onOutsideClick() {
			showDropdown.value = false
		}

		return {
			dropdownContainer,
			focus,
			inputContainer,
			inputElement,
			modelValue,
			onFocus,
			onKeydown,
			onOutsideClick,
			select,
			showDropdown,
		}
	},
})
</script>

<style scoped lang="scss">
.dropdown-menu {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
}
</style>
