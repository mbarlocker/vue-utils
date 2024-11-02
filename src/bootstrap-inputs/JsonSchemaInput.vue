<template>
	<component
		:is="inputComponent"
		ref="inputElement"
		v-bind="{
			...$attrs,
			...validationAttrs,
		}"
		@update:modelValue="$emit('update:modelValue', $event)"
		@focus="$emit('focus', $event)"
		@blur="$emit('blur', $event)"
		@keydown="$emit('keydown', $event)"
		@keyup="$emit('keyup', $event)"
		@keypress="$emit('keypress', $event)"
		@paste="$emit('paste', $event)"
	>
		<template v-for="(_, name) in $slots" v-slot:[name]="slotData">
			<slot :name="name" v-bind="slotData" />
		</template>
	</component>
</template>

<script lang="ts">
import BootstrapCheckbox from './BootstrapCheckbox.vue'
import BootstrapInput from './BootstrapInput.vue'
import BootstrapSelect from './BootstrapSelect.vue'
import BootstrapSelectBoolean from './BootstrapSelectBoolean.vue'
import BootstrapTextArea from './BootstrapTextArea.vue'
import type { JSONSchema } from 'json-schema-to-ts'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { defineComponent } from 'vue'
import { omit } from 'lodash'
import { pick } from 'lodash'
import { ref } from 'vue'

type SupportedSchema =
	& JSONSchema
	& {
		multipleOfPrecision?: number
	}

export default defineComponent({
	inheritAttrs: false,
	props: {
		schema: {
			type: Object as PropType<SupportedSchema>,
			required: true,
		},
		type: String,
		required: Boolean,
		min: [Number, String],
		max: [Number, String],
		step: [Number, String],
		maxlength: [Number, String],
		pattern: String,
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
	setup: (props, _context) => {
		const inputElement = ref<HTMLInputElement>()

		function focus() {
			inputElement.value?.focus()
		}

		function select() {
			inputElement.value?.select()
		}

		const allAttrs = computed(() => {
			let ret: Record<string, any> = pick(props, ['type', 'required', 'min', 'max', 'step', 'maxlength', 'pattern'])

			let definition = props.schema
			if (!definition || typeof definition !== 'object') { throw new Error('invalid schema') }

			function assignNonempty(name: string, value: any) {
				if (value !== undefined && ret[name] === undefined) {
					ret[name] = value
				}
			}

			if (definition.format === 'email') { ret.type ??= 'email' }
			else if (definition.format === 'date-time') { ret.type ??= 'datetime-local' }
			else if (definition.format === 'date') { ret.type ??= 'date' }
			else if (definition.format === 'time') { ret.type ??= 'time' }
			else if (definition.type === 'integer') { ret.type ??= 'number' }
			else if (definition.type === 'number') { ret.type ??= 'number' }
			else if (definition.type === 'boolean') { ret.type ??= 'boolean' }
			else if (definition.enum) { ret.type ??= 'select' }
			else { ret.type ??= 'text' }

			assignNonempty('maxlength', definition.maxLength)
			assignNonempty('minlength', definition.minLength)
			assignNonempty('pattern', definition.pattern)
			assignNonempty('min', definition.minimum)
			assignNonempty('max', definition.maximum)
			assignNonempty('step', definition.multipleOfPrecision)

			return ret
		})

		const validationAttrs = computed(() => {
			const all = allAttrs.value

			if (['checkbox', 'boolean', 'select', 'textarea'].includes(all.type)) {
				return omit(all, ['type'])
			}

			return all
		})

		const inputComponent = computed(() => {
			switch (allAttrs.value.type) {
				case 'checkbox': return BootstrapCheckbox
				case 'boolean': return BootstrapSelectBoolean
				case 'select': return BootstrapSelect
				case 'textarea': return BootstrapTextArea
				default: return BootstrapInput
			}
		})

		return {
			focus,
			inputComponent,
			inputElement,
			select,
			validationAttrs,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
