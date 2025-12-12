# @go2asia/logger

Unified logger with requestId support for Go2Asia services.

## Usage

```typescript
import { createLogger } from "@go2asia/logger";

const logger = createLogger("my-service");

logger.info("Service started", { requestId: "abc123" });
logger.error("Something went wrong", error, { requestId: "abc123" });
```

## Features

- Structured logging with JSON context
- RequestId support for tracing
- Service name tagging
- Log levels: debug, info, warn, error




