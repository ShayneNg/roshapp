// src/routes/api/auth/register/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { validate, registerSchema } from '$lib/server/validation';

export const POST: RequestHandler = async ({ request }) => {
  const payload = await request.json();
  // throws if invalid
  const { email, password, name } = validate(registerSchema, payload);

  // proceed: hash password, save user, etc.
};
