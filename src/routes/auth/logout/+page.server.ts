
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const load = async ({ locals, cookies }) => {
  // If there's an active session, invalidate it
  if (locals.session) {
    console.log('🔓 LOGOUT - Invalidating session:', locals.session.id);
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
  
  console.log('🔓 LOGOUT - All cookies cleared, showing logout page');
  
  return {};
};

export const actions = {
  // Handle POST requests to logout (for programmatic logout)
  default: async ({ locals, cookies }) => {
    if (locals.session) {
      console.log('🔓 LOGOUT ACTION - Invalidating session:', locals.session.id);
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
    
    console.log('🔓 LOGOUT ACTION - Redirecting to logout page');
    throw redirect(302, '/auth/logout');
  }
};
