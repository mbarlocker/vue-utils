# jumper

This library is helpful for redirects and "jumps".

For example, if a user goes to a page, but they're not logged in, you can redirect them to the login page
with a "jump" url. After processing the login, registration, etc, they can then "jump" back to the place
they originally intended to go.

Currently supports router params and query. May add cookies later.

## Usage

There are currently only 2 functions, `jump` and `keep`.

The `jump` function tries to jump to the original destination. It returns a promise that either succeeds or fails.
If the jump promise was successful, stop processing. If it fails, then continue on since there was no appropriate jump.

```typescript
import { useJumper } from '@mbarlocker/vue-utils/jumper'

const jumper = useJumper()

async function afterLogin() {
	jumper.jump().catch(() => {
		router.push({ name: 'home' })
	})
}
```

The `keep` function allows you to route between different pages and keep the original jump intact.

```typescript
import { useJumper } from '@mbarlocker/vue-utils/jumper'

const jumper = useJumper()

function redirect() {
	router.push({ name: 'login', query: { ...jumper.keep() }})
}
```
