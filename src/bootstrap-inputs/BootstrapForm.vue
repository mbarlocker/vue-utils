<template>
	<form
		ref="form"
		:class="{ 'was-validated': validated }"
		@invalid.capture="validated = true"
		@submit.prevent="handleSubmit()"
	>
		<fieldset :disabled="disabled">
			<slot></slot>
		</fieldset>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'submit',
	],
	setup: (props, context) => {
		const form = ref<HTMLFormElement>()
		const validated = ref(false)

		function handleSubmit() {
			if (!props.disabled) {
				context.emit('submit')
				validated.value = false
			}
		}

		return {
			form,
			handleSubmit,
			validated,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
