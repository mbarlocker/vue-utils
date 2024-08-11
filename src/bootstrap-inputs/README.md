# bootstrap-inputs

A bunch of simplified components for a subset of bootstrap form inputs.


## BootstrapForm

A form that checks validity on submit, and then enables errors and warnings in Bootstrap

```html
<BootstrapForm
	disabled
	@submit="onSubmit()"
/>
```


## BootstrapCheckbox

Simplified checkbox with some helpers. Has a `default` slot for label and a `help` slot for help text.

```html
<BootstrapCheckbox
	v-model="checked"
	label="My checkbox"
	autofocus
	helpText="This is to check something"
	noMargin
	useSwitch
	useButton
	buttonClass="btn-outline-secondary"
	:containerAttrs="{}"
	@focus="onFocus()"
	@blur="onBlur()"
/>
```


## BootstrapInput

Simplified input with some helpers. Has slots:

* prepend
* prependText
* help
* append
* appendText

It also has a boolean for trim, because the vue directive for trimming sucks and isn't easy to use when users delete text or use spaces.

Works with most (all?) types of standard inputs (number, color, date, datetime-local, email, etc)

```html
<BootstrapInput
	v-model="text"
	type="text"
	label="Text input"
	disabled
	readonly
	textonly
	autofocus
	helpText="This is to check something"
	trim
	noMargin
	prependIcon="fas fa-plus"
	appendIcon="fas fa-plus"
	:containerAttrs="{}"
	@focus="onFocus()"
	@blur="onBlur()"
	@change="onChange()"
	@keypress="onKeypress()"
	@keyup="onKeyup()"
	@keydown="onKeydown()"
/>
```


## BootstrapFile

Simplified file input with some helpers. Has slots:

* prepend
* prependText
* help
* append
* appendText

The model is an array of uploaded files. The type of these files is UploadedFile (exported by the vue file).
To read the contents, whether binary or text, use the functions on this UploadedFile interface.

```html
<BootstrapFile
	v-model="files"
	label="Upload some files"
	disabled
	readonly
	autofocus
	helpText="This is to check something"
	noMargin
	prependIcon="fas fa-plus"
	appendIcon="fas fa-plus"
	buttonClass="btn-outline-secondary"
	readImmediately
	:containerAttrs="{}"
	@focus="onFocus()"
	@blur="onBlur()"
	@change="onChange()"
/>
```


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
