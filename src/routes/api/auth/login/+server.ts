// src/routes/api/auth/login/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { createSession } from '$lib/server/session';
import { z } from 'zod';
import type { User } from '$lib/server/db/schema';

// 1. Validate input (we’ll cover Zod in section 4)
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const POST: RequestHandler = async ({ request, cookies }) => {
  const body = await request.json();
  const { email, password } = loginSchema.parse(body);

  // 2. Authenticate user (pseudo-code)
  const user: User | null = await authenticate(email, password);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }

  // 3. Create & store session
  const sessionId = createSession(user);

  // 4. Set secure, HTTP-only cookie
  cookies.set('session_id', sessionId, {
    path: '/',
    httpOnly: true,      // inaccessible via JS
    sameSite: 'lax',     // mitigates CSRF
    secure: true,        // send only over HTTPS
    maxAge: 60 * 60 * 24 // 1 day in seconds
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
