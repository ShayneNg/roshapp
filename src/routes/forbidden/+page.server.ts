// src/routes/forbidden/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = ({ locals, cookies, url }) => {
  const roles = locals.user?.roles ?? [];
  const attemptedPath = url.searchParams.get('from') || 'a restricted page';

  // Create SEO-friendly username slug for customer redirect
  const userSlug = locals.user?.username
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, '')
    ?.replace(/\s+/g, '-')
    ?.replace(/-+/g, '-')
    ?.trim() || locals.user?.id || '';

  let target = `/customer/@${userSlug}`;
  if (roles.includes('admin') || roles.includes('manager')) {
    target = '/app';
  } else if (roles.includes('staff')) {
    target = '/staff';
  }

  // Only set flash message if this is actually a forbidden access attempt
  // Check if the user is coming from a legitimate route or a restricted one
  const referrer = url.searchParams.get('from');
  const isLegitimateAccess = !referrer || referrer.includes('/customer/') || referrer.includes('/auth/');

  if (!isLegitimateAccess) {
    // Set flash message via cookie only for actual forbidden access
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
      maxAge: 60, // 1 minute
      sameSite: 'lax',
      secure: false // Allow in development
    });
  }

  // Clean redirect without URL parameters
  throw redirect(302, target);
};