<template>
	<div>
		<div class="text-center mb-1">{{format(count)}} found</div>

		<div class="pagination flex-wrap justify-content-center">
			<div
				class="page-item"
				:class="{
					'disabled': page === 0,
				}"
			>
				<button type="button" class="page-link" @click="goto(0)">First</button>
			</div>

			<div
				v-for="n in links" :key="`page-${n}`"
				class="page-item"
				:class="{
					'active': page === n,
				}"
			>
				<button type="button" class="page-link" @click="goto(n)">{{n + 1}}</button>
			</div>

			<div
				class="page-item"
				:class="{
					'disabled': pages === 0 || page === (pages - 1),
				}"
			>
				<button type="button" class="page-link" @click="goto(pages - 1)">last</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { clamp } from 'lodash'
import { computed } from 'vue'
import { defineComponent } from 'vue'
import { range } from 'lodash'

export default defineComponent({
	props: {
		page: {
			type: Number,
			required: true,
		},
		limit: {
			type: Number,
			required: true,
		},
		count: {
			type: Number,
			required: true,
		},
		show: {
			type: Number,
			default: 7,
		},
	},
	emits: [
		'update:page',
	],
	setup: (props, context) => {
		const pages = computed(() => Math.ceil(props.count / props.limit))
		const format = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format

		const links = computed(() => {
			const sides = (props.show - 1) / 2
			const lower = Math.ceil(sides)
			const upper = Math.floor(sides)

			const min = 0
			const max = pages.value

			return range(
				clamp(props.page - lower, min, max),
				clamp(props.page + 1 + upper, min, max),
			)
		})

		function goto(n: number) {
			if (props.page !== n) {
				context.emit('update:page', n)
			}
		}

		return {
			format,
			goto,
			links,
			pages,
		}
	},
})
</script>

<style scoped lang="scss">
</style>
