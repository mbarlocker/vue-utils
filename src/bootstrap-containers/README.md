# bootstrap-containers

Simplified containers from Bootstrap.


## BootstrapCollapse

Simplified Vue component for [Bootstrap collapse](https://getbootstrap.com/docs/5.3/components/collapse/).

```html
<BootstrapCollapse v-model:open="open" focusOnOpen>
	collapse this stuff here
</BootstrapCollapse>
```


## BootstrapOffcanvas

Simplified Vue component for [Bootstrap offcanvas](https://getbootstrap.com/docs/5.3/components/offcanvas/).

```html
<BootstrapOffcanvas v-model:open="open" focusOnOpen header="Title" scroll backdrop keyboard>
	offcanvas body
</BootstrapOffcanvas>
```


## BootstrapModal

Simplified Vue component for [Bootstrap modal](https://getbootstrap.com/docs/5.3/components/modal/).

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
