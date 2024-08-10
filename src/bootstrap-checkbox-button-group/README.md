# bootstrap-checkbox-button-group

Simplified vue component for a group of checkbox buttons.

The model is an object of name/selected pairs.

## Usage

```html
<BootstrapCheckboxButtonGroup
	v-model="{
		one: false,
		two: true,
	}"
	:options="[
		{ id: 'one', name: 'Label One' },
		{ id: 'two', name: 'Label Two' },
	"
	color="info"
/>
```
