# bootstrap-inputs

A bunch of simplified components for a subset of bootstrap form inputs.


## BootstrapCheckboxButton

Simplified vue component for [Bootstrap checkbox button](https://getbootstrap.com/docs/5.3/forms/checks-radios/#checkbox-toggle-buttons).

```html
<BootstrapCheckboxButton label="Do something" v-model="checked" color="primary" size="lg" />
```


## BootstrapCheckboxButtonGroup

Simplified vue component for a group of checkbox buttons.

The model is an object of name/selected pairs.

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


## BootstrapRadioButtonGroup

Simplified vue component for [Bootstrap radio button](https://getbootstrap.com/docs/5.3/forms/checks-radios/#radio-toggle-buttons).

## Usage

```html
<BootstrapRadioButtonGroup
	v-model="selected"
	:options="[
		{ id: 'one', label: 'Option 1' },
		{ id: 'two', label: 'Option 2' },
	]"
	color="primary"
	size="lg"
/>
```
