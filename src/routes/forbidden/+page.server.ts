// src/routes/forbidden/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = ({ locals, cookies, url }) => {
  const roles = locals.user?.roles ?? [];
  const attemptedPath = url.searchParams.get('from') || 'a restricted page';

  let target = `/customer/${locals.user?.id || ''}`;
  if (roles.includes('admin') || roles.includes('manager')) {
    target = '/app';
  } else if (roles.includes('staff')) {
    target = '/staff';
  }

  // Set flash message via cookie with better configuration
  const flashMessageData = {
    type: 'error',
    message: `Access denied. You do not have permission to view that page.`
  };
  
  console.log('🚫 FORBIDDEN ACCESS - Setting flash message cookie:', flashMessageData);
  console.log('🚫 User roles:', roles);
  console.log('🚫 Redirecting to:', target);
  
  cookies.set('flash_message', JSON.stringify(flashMessageData), {
    path: '/',
    httpOnly: false,
    maxAge: 120, // 2 minutes for better debugging
    sameSite: 'lax',
    secure: false // Allow in development
  });

  // Clean redirect without URL parameters
  throw redirect(302, target);
};
