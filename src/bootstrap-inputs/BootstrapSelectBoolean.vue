<template>
	<BootstrapSelect
		:modelValue="`${modelValue}`"
		@update:modelValue="$emit('update:modelValue', $event === 'true')"
		:options="options"
		@focus="$emit('focus', $event)"
		@blur="$emit('blur', $event)"
	>
		<template v-for="(_, name) in $slots" v-slot:[name]="slotData">
			<slot :name="name" v-bind="slotData" />
		</template>
	</BootstrapSelect>
</template>

<script lang="ts">
import BootstrapSelect from './BootstrapSelect.vue'
import { computed } from 'vue'
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
	components: {
		BootstrapSelect,
	},
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		falseName: {
			type: String,
			required: true,
		},
		trueName: {
			type: String,
			required: true,
		},
	},
	emits: [
		'update:modelValue',
		'focus',
		'blur',
	],
	setup: (props, _context) => {
		const inputElement = ref<HTMLInputElement>()

		const options = computed(() => {
			return [
				{ id: 'false', name: props.falseName },
				{ id: 'true', name: props.trueName },
			]
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
			options,
			select,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
