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


## BootstrapTextArea

Simplified textarea with some helpers. Has slots:

* prepend
* prependText
* help
* append
* appendText

It also has a boolean for trim, because the vue directive for trimming sucks and isn't easy to use when users delete text or use spaces.

```html
<BootstrapTextarea
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
	@keypress="onKeypress()"
	@keyup="onKeyup()"
	@keydown="onKeydown()"
/>
```


## BootstrapSelect

Simplified select input with some helpers. Has slots:

* prepend
* prependText
* help
* append
* appendText

```html
<BootstrapSelect
	v-model="selected"
	:options="[
		{ id: '1', name: 'Option 1', disabled: false, group: 'Group 1' },
		{ id: '2', name: 'Option 2', disabled: false, group: 'Group 1' },
	]"
	label="Select One"
	placeholder="None"
	disabled
	readonly
	textonly
	autofocus
	emptyOption
	helpText="This is to check something"
	trim
	noMargin
	prependIcon="fas fa-plus"
	appendIcon="fas fa-plus"
	:containerAttrs="{}"
	@focus="onFocus()"
	@blur="onBlur()"
/>
```


## BootstrapSelectBoolean

Select with 2 options. Same properties, attributes, slots, and events as a BootstrapSelect

```html
<BootstrapSelectBoolean
	v-model="value"
	falseName="Nope"
	trueName="Yup"
	label="Want some ice cream?"
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


## BootstrapRadio

Simplified checkbox with some helpers. Has a `default` slot for label and a `help` slot for help text.

```html
<BootstrapRadio
	v-model="selected"
	value="one"
	label="Radio 1"
	autofocus
	helpText="This is to radio something"
	noMargin
	:containerAttrs="{}"
	@focus="onFocus()"
	@blur="onBlur()"
/>
```


## BootstrapRadioGroup

Simplified vue component for a group of Bootstrap radios

## Usage

```html
<BootstrapRadioGroup
	v-model="selected"
	:options="[
		{ id: 'one', label: 'Option 1' },
		{ id: 'two', label: 'Option 2' },
	]"
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


## BootstrapDropdown

Base class for autocomplete. Has a text input box and a dropdown container.
There are no options for the dropdown, just an empty slot `default` where you can drop
your own options.


## Autocomplete

There are two types of autocomplete: Dynamic and Static.

The static autocomplete wraps the dynamic autocomplete with a list of options.
The dynamic autocomplete takes a search function as a prop. This function returns a promise of array of options.
When the autocomplete text input changes, the search function is ran and the results get updated.

```html
<AutocompleteDynamic
	v-model:text="searchText"
	v-model:selection="selectedOption"
	:search="searchForValues"
	required
	:maxOptions="10"
	@selected="onSelected"
/>
```

```html
<AutocompleteStatic
	v-model:text="searchText"
	v-model:selection="selectedOption"
	:options="arrayOfOptions"
	:searchableFields="['name', 'email', 'username']"
/>
```


## JsonSchemaInput

This isn't bootstrap per se, but it relies on the bootstrap inputs and will often times be the input of choice
if you've got a library of json schema apis.

```html
<SchemaInput
	v-model="email"
	label="Email"
	:schema="fields.email"
	trim
	required
	autofocus
	autocomplete="email"
/>
```
