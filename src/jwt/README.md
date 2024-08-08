# jwt

JWT is a hash-based signature that generally requires a secret key to verify.

On the client, you can still read the JWT and process its contents - you just can't trust them.

This library makes it easy to decode and parse the contents of a JWT on the client, even if
you can't trust them on the client.

## Usage

Look at the docs, they're honestly pretty simple.

```typescript
import * as jwt from '@mbarlocker/vue-utils/jwt'

const token = '-- token here --'

jwt.decode(token)
jwt.getHeader(token)
jwt.getPayload(token)
jwt.getSignature(token)
jwt.parseHeader(token)
jwt.parsePayload(token)
```
