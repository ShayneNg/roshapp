// src/lib/server/validation.ts
import { z } from 'zod';

// Example: user registration schema
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1)
});

// Reusable validator utility
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    // You can customize error formatting here
    throw new Error('Validation Error: ' + JSON.stringify(result.error.format()));
  }
  return result.data;
}
