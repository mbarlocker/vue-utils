# router-coalesce

A couple helper functions that can reduce Vue's router's params from a `T | T[] | undefined` to a `T` or `T[]` as needed.

## Usage

```typescript
import { coalesceSingle, coalesceMultiple } from '@mbarlocker/vue-utils/router-coalesce'
import { useRoute } from 'vue-router'

export default defineComponent({
	setup: () => {
		const route = useRoute()

		const id: string = coalesceSingle(route.params.id)
		const filters: string[] = coalesceMultiple(route.query.filters)
	},
})
```
