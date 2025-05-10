<template>
	<Teleport defer :to="teleport" :disabled="teleport !== ''">
		<div
			v-bind="$attrs"
			ref="container"
			class="offcanvas overflow-hidden"
			tabindex="-1"
			:data-bs-scroll="scroll"
			:data-bs-backdrop="backdrop"
			:data-bs-keyboard="keyboard"
		>
			<template v-if="state !== 'hidden'">
				<div class="offcanvas-header border-bottom">
					<h5 class="offcanvas-title">{{header}}</h5>
					<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
				</div>
				<div class="offcanvas-body">
					<slot />
				</div>
			</template>
		</div>
	</Teleport>
</template>

<script lang="ts">
import * as bootstrap from 'bootstrap'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { defineComponent } from 'vue'
import { focusFirstEligible } from '../focus/index.js'
import { onBeforeUnmount } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { watchEffect } from 'vue'

export default defineComponent({
	inheritAttrs: false,
	props: {
		open: {
			type: Boolean,
			required: true,
		},
		header: {
			type: String,
			required: true,
		},
		focusOnOpen: {
			type: Boolean,
			default: false,
		},
		scroll: {
			type: Boolean,
			default: false,
		},
		backdrop: {
			type: Boolean,
			default: false,
		},
		keyboard: {
			type: Boolean,
			default: false,
		},
		teleport: {
			type: [String, Object] as PropType<string | HTMLElement>,
			default: '#modals',
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
		let offcanvas: bootstrap.Offcanvas | undefined = undefined

		const state = ref<'show'|'shown'|'hide'|'hidden'>('hidden')
		const transitioning = computed(() => ['show', 'hide'].includes(state.value))

		const desire = ref('hidden')
		watchEffect(() => desire.value = props.open ? 'shown' : 'hidden')

		onMounted(() => {
			if (!container.value) { throw new Error('Offcanvas container not setup correctly') }
			offcanvas = bootstrap.Offcanvas.getOrCreateInstance(container.value)

			useEventListener(container.value, 'show.bs.offcanvas', () => {
				context.emit('show')
				state.value = 'show'
				context.emit('update:open', true)
			})

			useEventListener(container.value, 'shown.bs.offcanvas', () => {
				context.emit('shown')
				state.value = 'shown'

				if (props.focusOnOpen) {
					focusFirstEligible(container.value)
				}

				if (desire.value === 'hidden') {
					close()
				}
			})

			useEventListener(container.value, 'hide.bs.offcanvas', () => {
				context.emit('hide')
				state.value = 'hide'
				context.emit('update:open', false)
			})

			useEventListener(container.value, 'hidden.bs.offcanvas', () => {
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
			desire.value = 'hidden'

			const o = offcanvas
			o?.hide()
			setTimeout(() => o?.dispose(), 30_000)
		})

		function visible() {
			return container.value?.classList?.contains("show") ?? false
		}

		function open() {
			offcanvas?.show()
		}

		function close() {
			offcanvas?.hide()
		}

		return {
			close,
			container,
			open,
			state,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
