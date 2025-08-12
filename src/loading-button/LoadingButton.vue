<template>
	<button :disabled="disabled" @click.stop="handleClick" v-on-click-outside="handleOutsideClick">
		<span v-if="delaying" class="spinner-grow spinner-grow-sm"></span>
		<span v-else-if="loading" class="spinner-border spinner-border-sm"></span>
		<span v-else-if="confirming">{{confirmText}}</span>
		<span v-else>
			<div v-if="icon" class="d-inline-block"><font-awesome-icon :icon="icon" :fixedWidth="fixedWidth" /></div> <slot></slot>
		</span>
	</button>
</template>

<script lang="ts">
import { computed } from 'vue'
import { defineComponent } from 'vue'
import { onUnmounted } from 'vue'
import { ref } from 'vue'

export default defineComponent({
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		icon: {
			type: [String, Array],
			default: '',
		},
		confirm: {
			type: Boolean,
			default: false,
		},
		confirmText: {
			type: String,
			default: 'Sure?',
		},
		confirmDelay: {
			type: Number,
			default: 500,
		},
		fixedWidth: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'click',
	],
	setup: (props, context) => {
		const disabled = computed(() => props.loading || props.disabled)

		const confirming = ref(false)
		const delaying = ref(false)

		let delayingInterval: number|undefined = undefined

		onUnmounted(() => {
			clearConfirmTimeout()
		})

		function clearConfirmTimeout() {
			if (delayingInterval !== undefined) {
				delaying.value = false
				window.clearTimeout(delayingInterval)
				delayingInterval = undefined
			}
		}

		function handleOutsideClick() {
			confirming.value = false
			clearConfirmTimeout()
		}

		function handleClick(event: any) {
			if (delaying.value) {
				return
			}

			if (props.confirm && !confirming.value) {
				confirming.value = true

				delaying.value = true
				delayingInterval = window.setTimeout(() => {
					delaying.value = false
					delayingInterval = undefined
				}, props.confirmDelay)
			}
			else {
				confirming.value = false
				context.emit('click', event)
			}
		}

		return {
			confirming,
			delaying,
			disabled,
			handleClick,
			handleOutsideClick,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
