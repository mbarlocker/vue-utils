<template>
	<span
		class="position-relative d-inline-box icons"
		:class="{
			'onhover': hover,
			'toggle': toggle,
		}"
	>
		<font-awesome-icon :icon="icon" fixedWidth :size="size" />
		<font-awesome-icon :icon="iconAlt" fixedWidth :size="size" />
	</span>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		hover: {
			type: Boolean,
			default: false,
		},
		toggle: {
			type: Boolean,
			default: false,
		},
		icon: {
			type: [String, Array] as PropType<string | string[]>,
			required: true,
		},
		iconAlt: {
			type: [String, Array] as PropType<string | string[]>,
			required: true,
		},
		size: {
			type: String,
			default: null,
		},
	},
	setup: (_props, _context) => {
		return {}
	},
})
</script>

<style scoped lang="scss">
svg {
	transition: opacity 0.3s ease, transform 0.3s ease;
	opacity: 0;

	&:first-of-type {
		opacity: 1;
	}

	&:last-of-type {
		transform: translate(-50%, -50%) rotate(-180deg) scale(.5);
		position: absolute;
		top: 50%;
		left: 50%;
	}
}

.icons.onhover:hover, .icons.toggle {
	svg {
		&:first-of-type {
			transform: rotate(180deg) scale(.5);
			opacity: 0;
		}

		&:last-of-type {
			transform: translate(-50%, -50%) rotate(0deg) scale(1);
			opacity: 1;
		}
	}
}
</style>
