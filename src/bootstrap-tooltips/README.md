# bootstrap-tooltips

This library has a plugin with a `v-tooltip` directive for bootstrap tooltips.

## Usage

First, you'll need to register the plugin with Vue

```typescript
import { plugin as tooltips } from '@mbarlocker/vue-utils/bootstrap-tooltips'

createApp(App)
	.use(tooltips)
```

Then, you can use the `v-tooltip` directive in your components.

```html
<span data-bs-placement="right" data-bs-title="Tooltip on right" v-tooltip>Hello!</span>
```
