# vmodel

useVModel in [@vueuse/core](https://vueuse.org/core/useVModel/) isn't type safe.

This is a simpler, less friendly, worse-api version of that.

Consider using Vue's [defineModel](https://blog.vuejs.org/posts/vue-3-3#definemodel) macro instead, if capable.

## Usage

```typescript
import { useVModel } from '@mbarlocker/vue-utils/vmodel'

export default defineComponent({
	emits: [
		'update:msg',
	],
	props: {
		msg: {
			type: String,
			default: '',
		},
	},
	setup: (props, context) => {
		const msg = useVModel(() => props.msg, (value) => context.emit('update:msg', value))

		return {
			msg,
		}
	},
})
```
