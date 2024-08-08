# focus

This library includes a vue directive as well as a couple helper functions for focusing on HTML elements.

## Usage - Directive

First, you'll need to register the plugin with Vue

```typescript
import { plugin as focus } from '@mbarlocker/vue-utils/focus'

createApp(App)
	.use(focus)
```

Then, you can use the `v-focus` and `v-focus-first-eligible` directives in your components to focus on
the element or the first eligible child (recursive) of the element.

```html
<input v-focus>
```

```html
<form v-focus-first-eligible>
	...
</form>
```

## Usage - Functions

Both functions (`focus` and `focusFirstEligible`) are also exported. These are valuable if you want to focus on an event,
like showing a modal.

```typescript
import { focus } from '@mbarlocker/vue-utils/focus'

focus(element)
```

```typescript
import { focusFirstEligible } from '@mbarlocker/vue-utils/focus'

focusFirstEligible(element)
```
