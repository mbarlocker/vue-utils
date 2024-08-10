<template>
	<div
		ref="container"
		:class="{
			'collapse': true,
			'collapse-horizontal': horizontal,
			'show': openInit,
		}"
	>
		<slot />
	</div>
</template>

<script lang="ts">
import * as bootstrap from 'bootstrap'
import { computed } from 'vue'
import { defineComponent } from 'vue'
import { focusFirstEligible } from '../focus/index.js'
import { onBeforeUnmount } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { watchEffect } from 'vue'

export default defineComponent({
	props: {
		focusOnOpen: {
			type: Boolean,
			default: false,
		},
		open: {
			type: Boolean,
			required: true,
		},
		horizontal: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'show', // on 'show'
		'shown', // after visible
		'hide', // on 'hide'
		'hidden', // after invisible
		'update:open',
	],
	setup: (props, context) => {
		const container = ref<HTMLElement>()
		let collapse: bootstrap.Collapse | undefined = undefined

		const openInit = props.open

		const state = ref<'show'|'shown'|'hide'|'hidden'>(openInit ? 'shown' : 'hidden')
		const transitioning = computed(() => ['show', 'hide'].includes(state.value))

		const desire = ref('hidden')
		watchEffect(() => {
			desire.value = props.open ? 'shown' : 'hidden'
		})

		onMounted(() => {
			if (!container.value) { throw new Error('Collapse container not setup correctly') }
			collapse = bootstrap.Collapse.getOrCreateInstance(container.value, { toggle: false })

			useEventListener(container.value, 'show.bs.collapse', () => {
				context.emit('show')
				state.value = 'show'
				context.emit('update:open', true)
			})

			useEventListener(container.value, 'shown.bs.collapse', () => {
				context.emit('shown')
				state.value = 'shown'

				if (props.focusOnOpen) {
					focusFirstEligible(container.value)
				}

				if (desire.value === 'hidden') {
					close()
				}
			})

			useEventListener(container.value, 'hide.bs.collapse', () => {
				context.emit('hide')
				state.value = 'hide'
				context.emit('update:open', false)
			})

			useEventListener(container.value, 'hidden.bs.collapse', () => {
				context.emit('hidden')
				state.value = 'hidden'

				if (desire.value === 'shown') {
					open()
				}
			})

			watchEffect(() => {
				if (!transitioning.value) {
					if (desire.value === 'shown' && !visible()) {
						open()
					}
					else if (desire.value === 'hidden' && visible()) {
						close()
					}
				}
			})
		})

		onBeforeUnmount(() => {
			const c = collapse
			setTimeout(() => c?.dispose(), 30_000)
		})

		function visible() {
			return container.value?.classList?.contains("show") ?? false
		}

		function open() {
			collapse?.show()
		}

		function close() {
			collapse?.hide()
		}

		return {
			close,
			container,
			desire,
			open,
			openInit,
			state,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
