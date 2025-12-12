export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  requestId?: string;
  userId?: string;
  service?: string;
  [key: string]: unknown;
}

class Logger {
  private serviceName: string;

  constructor(serviceName: string = "unknown") {
    this.serviceName = serviceName;
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context
      ? ` ${JSON.stringify({ ...context, service: this.serviceName })}`
      : ` {"service":"${this.serviceName}"}`;
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV === "development") {
      console.debug(this.formatMessage("debug", message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    console.info(this.formatMessage("info", message, context));
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage("warn", message, context));
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = error instanceof Error
      ? { ...context, error: error.message, stack: error.stack }
      : { ...context, error: String(error) };
    console.error(this.formatMessage("error", message, errorContext));
  }
}

export function createLogger(serviceName: string): Logger {
  return new Logger(serviceName);
}

export { Logger };





