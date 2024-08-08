# lazy

A function wrapper that doesn't call the generator until needed.
The generator is called 0-1 times.

## Usage

Look at the docs, they're honestly pretty simple.

```typescript
import { lazy } from '@mbarlocker/vue-utils/lazy'

const getLazy = lazy(() => expensiveComputation())

console.log(getLazy())
```
