# bootstrap-modal

Simplified Vue component for [Bootstrap modal](https://getbootstrap.com/docs/5.3/components/modal/).

## Usage

```html
<BootstrapModal v-model:open="open" header="Overwritten header" closeButton focusOnOpen scrollable backdrop keyboard>
	<template v-slot:header>
		Modal Header
	</template>

	<template v-slot>
		Body
	</template>

	<template v-slot:footer>
		Footer
	</template>
</BootstrapModal>
```
