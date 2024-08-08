# timezone

A couple helper functions for validating and converting timezones.

## Usage

```typescript
import * as tz from '@mbarlocker/vue-utils/timezone'

console.log('current timezone is', tz.currentZone())

const now = new Date()
const a = tz.localToUtcDate(now)
const b = tz.utcToLocalDate(a)

console.log(now.getTime() === b.getTime()) // true
```
