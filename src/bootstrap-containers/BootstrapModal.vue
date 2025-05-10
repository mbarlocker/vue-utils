<template>
	<Teleport :to="teleport" :disabled="teleport !== ''">
		<div
			v-bind="$attrs"
			ref="container"
			class="modal fade"
			tabindex="-1"
			:data-bs-backdrop="backdrop"
			:data-bs-keyboard="keyboard"
		>
			<div class="modal-dialog" :class="{
				'modal-dialog-centered': centered,
				'modal-dialog-scrollable': scrollable,
				[`modal-${size}`]: size !== undefined,
				'd-none': hideDialog,
			}">
				<div v-if="state !== 'hidden'" class="modal-content">
					<div class="modal-header">
						<slot name="header">
							<h5 class="modal-title">{{header}}</h5>
							<button v-if="closeButton" type="button" class="btn-close" data-bs-dismiss="modal" />
						</slot>
					</div>
					<div v-if="$slots.default" class="modal-body">
						<slot />
					</div>
					<div v-if="$slots.footer" class="modal-footer">
						<!-- Putting buttons here automatically closes the modal. use @click.stop to prevent -->
						<slot name="footer" />
					</div>
				</div>
			</div>
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
		closeButton: {
			type: Boolean,
			default: false,
		},
		centered: {
			type: Boolean,
			default: false,
		},
		focusOnOpen: {
			type: Boolean,
			default: false,
		},
		scrollable: {
			type: Boolean,
			default: false,
		},
		backdrop: {
			type: [Boolean, String] as PropType<boolean | 'static'>,
			default: false,
		},
		keyboard: {
			type: Boolean,
			default: false,
		},
		size: {
			type: String as PropType<'sm' | 'lg' | 'xl'>,
			required: false,
		},
		hideDialog: {
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
		let modal: bootstrap.Modal | undefined = undefined

		const state = ref<'show'|'shown'|'hide'|'hidden'>('hidden')
		const transitioning = computed(() => ['show', 'hide'].includes(state.value))

		const desire = ref('hidden')
		watchEffect(() => desire.value = props.open ? 'shown' : 'hidden')

		onMounted(() => {
			if (!container.value) { throw new Error('Modal container not setup correctly') }
			modal = bootstrap.Modal.getOrCreateInstance(container.value)

			useEventListener(container.value, 'show.bs.modal', () => {
				context.emit('show')
				state.value = 'show'
				context.emit('update:open', true)
			})

			useEventListener(container.value, 'shown.bs.modal', () => {
				context.emit('shown')
				state.value = 'shown'

				if (props.focusOnOpen) {
					focusFirstEligible(container.value)
				}

				if (desire.value === 'hidden') {
					close()
				}
			})

			useEventListener(container.value, 'hide.bs.modal', () => {
				context.emit('hide')
				state.value = 'hide'
				context.emit('update:open', false)
			})

			useEventListener(container.value, 'hidden.bs.modal', () => {
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

			const m = modal
			m?.hide()
			setTimeout(() => m?.dispose(), 30_000)
		})

		function visible() {
			return container.value?.classList?.contains("show") ?? false
		}

		function open() {
			modal?.show()
		}

		function close() {
			modal?.hide()
		}

		return {
			close,
			container,
			desire,
			open,
			state,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
