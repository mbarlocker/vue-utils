<template>
	<template v-if="true">
		<slot v-if="status === 'pending'" name="pending"></slot>

		<slot v-if="status === 'delayed'" name="delayed">
			<div class="spinner-border">
				<span class="visually-hidden">Loading...</span>
			</div>
		</slot>

		<slot v-if="status === 'error'" name="error" :error="error" :errorString="errorString">
			<div class="alert alert-danger">{{errorString}}</div>
		</slot>

		<slot v-if="status === 'done'" name="default" :data="data"></slot>

		<input v-if="status !== 'done' && inputRequired" class="d-none" required type="text" />
	</template>
</template>

<script lang="ts">
import { computed } from 'vue'
import { defineComponent } from 'vue'
import { isError } from 'lodash'
import { isString } from 'lodash'
import { ref } from 'vue'
import { watch } from 'vue'

export default defineComponent({
	inheritAttrs: false,
	props: {
		promise: {
			type: Promise,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		delay: {
			type: Number,
			default: 250,
		},
		inputRequired: {
			type: Boolean,
			default: false,
		},
	},
	setup: (props, _context) => {
		const status = ref<'pending'|'delayed'|'error'|'done'>('pending')
		const data = ref<any>(undefined)
		const error = ref<any>(undefined)
		const errorString = computed(() => extractError(error.value))

		let counter = 0

		watch(
			() => props.promise,
			() => {
				const currentCounter = ++counter
				function samePromise(fn: () => void): void {
					if (currentCounter === counter) {
						fn()
					}
				}

				status.value = 'pending'
				data.value = undefined
				error.value = undefined

				setTimeout(() => samePromise(() => {
					if (status.value === 'pending') {
						status.value = 'delayed'
					}
				}), props.delay)

				props.promise
					.then(d => samePromise(() => {
						data.value = d
						status.value = 'done'
					}))
					.catch(e => samePromise(() => {
						error.value = e
						status.value = 'error'
					}))
			},
			{ immediate: true },
		)

		function extractError(e: any): string {
			if (!e) {
				return ''
			}

			// axios network error
			if (e.isAxiosError && e.response === undefined && e.message === 'Network Error') {
				return 'Check your network connection.'
			}

			// api response error
			if (e.response?.data?.error !== undefined) {
				return e.response.data.error
			}

			// api response message
			if (e.response?.data?.message !== undefined) {
				return e.response.data.message
			}

			if (isString(e)) {
				return e
			}

			if (isError(e)) {
				return `${e.name}: ${e.message}`
			}

			return `Failed to load ${props.name}`
		}

		return {
			data,
			error,
			errorString,
			status,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
