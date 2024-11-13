<template>
	<div class="btn-group">
		<BootstrapCheckboxButton
			v-for="option in options" :key="typeof option === 'string' ? option : option.id"
			:modelValue="modelValue[typeof option === 'string' ? option : option.id]"
			@update:modelValue="set(typeof option === 'string' ? option : option.id, $event)"
			:label="typeof option === 'string' ? option : option.id"
			:id="id"
			:size="size"
			:color="color"
		/>
	</div>
</template>

<script lang="ts">
import BootstrapCheckboxButton from './BootstrapCheckboxButton.vue'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { useVModel } from '../vmodel/index.js'

export interface Option {
	id: string
	name: string
	disabled?: boolean
}

export default defineComponent({
	components: {
		BootstrapCheckboxButton,
	},
	props: {
		modelValue: {
			type: Object as PropType<Record<string, boolean>>,
			default: () => {},
		},
		options: {
			type: Array as PropType<(Option | string)[]>,
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
		
		function set(id: string, value: boolean) {
			modelValue.value[id] = value
		}

		return {
			modelValue,
			set,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
