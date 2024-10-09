<template>
	<div :class="{ 'mb-3': !noMargin }">
		<div
			v-bind="containerAttrs"
			class="input-group"
		>
			<input
				ref="inputElement"
				v-bind="$attrs"
				type="file"
				v-focus="autofocus"
				:autofocus="autofocus"
				:id="id"
				class="form-control"
				:readonly="readonly"
				:disabled="disabled"
				:tabIndex="(readonly || disabled) ? -1 : 0"
				@focus="$emit('focus', $event)"
				@blur="$emit('blur', $event)"
				@change="handleChange"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { lazy } from '../lazy/index.js'
import { onUnmounted } from 'vue'
import { ref } from 'vue'
import { watchEffect } from 'vue'

export interface UploadedFile {
	blob: Blob
	file: File
	url: string
	reader: () => Promise<string>
	textReader: () => Promise<string>
}

export default defineComponent({
	inheritAttrs: false,
	props: {
		modelValue: {
			type: Array as PropType<UploadedFile[]>,
			default: () => [],
		},
		id: {
			type: String,
			default: () => `form-${+new Date}-${Math.random()}`,
		},
		label: {
			type: String,
			required: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		autofocus: {
			type: Boolean,
			default: false,
		},
		noMargin: {
			type: Boolean,
			default: false,
		},
		containerAttrs: {
			type: Object,
			required: false,
		},
		readImmediately: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'update:modelValue',
		'focus',
		'blur',
		'change',
	],
	setup: (props, context) => {
		const inputElement = ref<HTMLInputElement>()

		let files: UploadedFile[] = []
		watchEffect(() => {
			if (!props.modelValue.length) {
				releaseFiles()
				if (inputElement.value) {
					inputElement.value.value = ''
				}
			}
		})

		function focus() {
			inputElement.value?.focus()
		}

		function select() {
			inputElement.value?.select()
		}

		function releaseFiles() {
			files.forEach(file => URL.revokeObjectURL(file.url))
			files = []
		}

		onUnmounted(() => releaseFiles())

		function lazyFileReader(readfn: (reader: FileReader) => void) {
			return lazy(() => {
				return new Promise<string>((success, failure) => {
					const reader = new FileReader()

					reader.onloadend = () => {
						if (reader.result === null || typeof reader.result !== 'string') {
							failure('invalid type')
						}
						else {
							success(reader.result)
						}
					}

					reader.onerror = (event) => failure(event)

					readfn(reader)
				})
			})
		}

		function readerFor(blob: Blob) {
			return lazyFileReader(r => r.readAsDataURL(blob))
		}

		function textReaderFor(blob: Blob) {
			return lazyFileReader(r => r.readAsText(blob))
		}

		function handleChange(event: any) {
			releaseFiles()

			files = Array.from(event.target.files as FileList).map(file => {
				const blob = new Blob([file])
				const url = URL.createObjectURL(blob)
				const reader = readerFor(blob)
				const textReader = textReaderFor(blob)

				if (props.readImmediately) {
					reader()
					textReader()
				}

				return { file, blob, url, reader, textReader }
			})

			context.emit('change', files)
			context.emit('update:modelValue', files)
		}

		return {
			focus,
			handleChange,
			inputElement,
			select,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
