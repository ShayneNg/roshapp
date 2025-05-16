// src/routes/api/auth/logout/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { destroySession } from '$lib/server/session';

export const POST: RequestHandler = async ({ cookies }) => {
  const sessionId = cookies.get('session_id');
  if (sessionId) destroySession(sessionId);

  // Clear cookie on client
  cookies.delete('session_id', { path: '/', secure: true, sameSite: 'lax' });

  return new Response(null, { status: 204 });
};
