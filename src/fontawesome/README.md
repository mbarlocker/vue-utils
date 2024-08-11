# fontawesome

This library provides a plugin that registers fontawesome components globally,
as well as a separate component (TransitionIcon).

All the global fontawesome components are found at [vue-fontawesome](https://docs.fontawesome.com/web/use-with/vue/style).

## Plugin

```typescript
import { plugin as fontawesome } from '@mbarlocker/vue-utils/fontawesome'

createApp(App)
	.use(fontawesome, {
		solid: true,
		brand: true,
		regular: true,
	})
```

Then, you can use the `font-awesome-icon` components.

```html
<font-awesome-icon icon="search" />
```

## TransitionIcon

This component takes two icons and transitions between the two using an animation.
The animation can happen on toggle (pass a boolean, turn it on and off), or on hover.

```html
<TransitionIcon :toggle="sidebarToggle" icon="bars" iconAlt="times" size="2x" />
```

```html
<TransitionIcon hover icon="plus" iconAlt="user-plus" />
```
