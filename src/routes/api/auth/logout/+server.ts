// src/routes/api/auth/logout/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const POST: RequestHandler = async ({ cookies, locals }) => {
  // If there's an active session, invalidate it
  if (locals.session) {
    console.log('🔓 API LOGOUT - Invalidating session:', locals.session.id);
    await auth.invalidateSession(locals.session.id);
  }
  
  // Clear all auth-related cookies
  const sessionCookie = auth.createBlankSessionCookie();
  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '/',
    ...sessionCookie.attributes
  });
  
  // Clear remember me token
  cookies.delete('remember_token', { path: '/' });
  
  // Clear any flash messages
  cookies.delete('flash_message', { path: '/' });
  
  console.log('🔓 API LOGOUT - Redirecting to logout page');
  throw redirect(302, '/auth/logout');
};
