import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
  // Check if user is authenticated
  if (!locals.session || !locals.user) {
    throw redirect(302, '/auth/login');
  }

  // Check if user has customer role
  const role = locals.role;
  if (!role) {
    throw redirect(302, '/auth/login');
  }

  const normalizedRole = role.toLowerCase();
  const isCustomer = normalizedRole === 'customer';
  const isSuperAdmin = ['developer', 'ceo'].includes(normalizedRole);

  if (!isCustomer && !isSuperAdmin) {
    // Add referrer info to forbidden redirect to help debug
    const forbiddenUrl = `/forbidden?from=${encodeURIComponent(url.pathname)}`;
    throw redirect(302, forbiddenUrl);
  }

  // Create SEO-friendly username slug
  const userSlug = locals.user.username
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, '')
    ?.replace(/\s+/g, '-')
    ?.replace(/-+/g, '-')
    ?.trim() || locals.user.id;

  return {
    user: locals.user,
    role: locals.role,
    userSlug
  };
};