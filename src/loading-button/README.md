# loading-button

Button loaded with spinner, confirmation, and icon for general usage.

## Usage

```html
<LoadingButton type="button" class="btn btn-danger" :loading="deleting" confirm confirmText="Are you sure?" @click="delete()">Delete</LoadingButton>

<LoadingButton type="submit" class="btn btn-primary" :loading="submitting">Submit</LoadingButton>
```
