import { z } from "zod";

// Common schemas will be added here as OpenAPI spec evolves
// These schemas duplicate OpenAPI definitions for runtime validation

export const ErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  code: z.string().optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;





