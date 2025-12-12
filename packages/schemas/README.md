# @go2asia/schemas

Zod schemas for runtime validation (duplicates OpenAPI schemas).

## Usage

```typescript
import { ErrorResponseSchema } from "@go2asia/schemas";

const result = ErrorResponseSchema.safeParse(data);
```

## Purpose

These schemas provide runtime validation that matches the OpenAPI specification. They are used for:
- Request validation in API Gateway
- Response validation
- Type-safe runtime checks




