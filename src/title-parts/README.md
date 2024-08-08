# title-parts

This library helps treat your page's title as an array of parts that you can swap in and out independently.

For example, if you have a title like this:

_Page X | Account Y | Tool Z_

Then you could use this tool to replace *Page X* with another page without touching *Account Y | Tool Z*.

## Usage

```typescript
import { useTitle } from '@mbarlocker/vue-utils/title-parts'

export default defineComponent({
	setup: () => {
		const title = useTitle()

		onMounted(() => {
			title.replacePart(0, 'Page ABC')
		})
	}
})
```
