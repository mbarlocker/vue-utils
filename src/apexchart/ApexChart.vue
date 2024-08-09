<template>
	<div ref="container" />
</template>

<script lang="ts">
import type { ApexOptions } from 'apexcharts'
import type { PropType } from 'vue'
import { default as ApexCharts } from 'apexcharts'
import { defineComponent } from 'vue'
import { onMounted } from 'vue'
import { onUnmounted } from 'vue'
import { ref } from 'vue'
import { watch } from 'vue'

export default defineComponent({
	props: {
		options: {
			type: Object as PropType<ApexOptions>,
			default: () => {},
		},
	},
	setup: (props, _context) => {
		const container = ref<HTMLCanvasElement>()

		let chart: ApexCharts|undefined = undefined

		watch(
			() => [props.options],
			() => {
				if (chart) {
					chart.updateOptions(props.options)
				}
			}
		)

		onMounted(() => {
			if (container.value) {
				chart = new ApexCharts(container.value, props.options)
				chart.render()
			}
		})

		onUnmounted(() => {
			chart?.destroy()
		})

		return {
			container,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
