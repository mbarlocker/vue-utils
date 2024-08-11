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
				<select
					ref="inputElement"
					v-bind="$attrs"
					v-focus="autofocus"
					:autofocus="autofocus"
					:id="id"
					v-model="modelValue"
					class="form-select"
					@focus="$emit('focus', $event)"
					@blur="$emit('blur', $event)"
					@change="$emit('update:modelValue', ($event.target! as HTMLInputElement).value)"
				>
					<slot name="options">
						<option v-if="emptyOption" value=""></option>
						<template v-for="option in options" :key="option.id">
							<optgroup
								v-if="option.group"
								:label="option.name"
							/>
							<option
								v-else
								:value="option.id"
								:disabled="option.disabled"
							>
								{{ option.name }}
							</option>
						</template>
					</slot>
				</select>
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
import type { PropType } from 'vue'
import { computed } from 'vue'
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { watchEffect } from 'vue'

export interface Option {
	id: string | number
	name: string
	disabled?: boolean
	group?: true
}

export default defineComponent({
	inheritAttrs: false,
	props: {
		modelValue: {
			type: [String, Number],
			default: '',
		},
		options: {
			type: Array as PropType<(Option | string)[]>,
			required: true,
		},
		emptyOption: {
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
	],
	setup: (props, _context) => {
		const inputElement = ref<HTMLInputElement>()

		const modelValue = ref('')
		watchEffect(() => modelValue.value = `${props.modelValue}`)

		const options = computed(() => {
			return props.options.map(o => {
				return typeof o === 'string'
					? { id: o, name: o }
					: o
			})
		})

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
			options,
			select,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
