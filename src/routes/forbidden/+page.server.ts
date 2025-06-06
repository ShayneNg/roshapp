// src/routes/forbidden/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = ({ locals, cookies }) => {
  const roles = locals.user?.roles ?? [];

  let target = '/customer';
  if (roles.includes('admin') || roles.includes('manager')) {
    target = '/app';
  } else if (roles.includes('staff')) {
    target = '/staff';
  }

  // Set flash message via cookie
  cookies.set('flash_message', JSON.stringify({
    type: 'error',
    message: 'Access denied. You do not have permission to view that page.'
  }), {
    path: '/',
    httpOnly: false,
    maxAge: 60, // 1 minute
    sameSite: 'lax'
  });

  // Clean redirect without URL parameters
  throw redirect(302, target);
};
