
import { redirect } from '@sveltejs/kit';
import { getUserBySlug } from '$lib/server/urlRewriter';

export const load = async ({ locals, params, url }) => {
  // Check if user is authenticated
  if (!locals.session || !locals.user) {
    throw redirect(302, '/auth/login');
  }

  // Get the username from the URL parameter
  const username = params.username;
  
  // Security check: only allow access through proper redirect from /customer/[id]
  // Check if this request came from the middleware redirect
  const referrer = url.searchParams.get('ref');
  const role = locals.role?.toLowerCase();
  const isSuperAdmin = ['developer', 'ceo'].includes(role);
  
  // Only super admins can bypass the referrer check (for direct URL access)
  if (!isSuperAdmin && referrer !== 'middleware') {
    // Regular users trying to access directly should be redirected to proper flow
    throw redirect(302, '/forbidden');
  }

  // Validate username and get user data
  if (!username) {
    throw redirect(302, '/forbidden');
  }

  const targetUser = await getUserBySlug(username);
  if (!targetUser) {
    throw redirect(302, '/forbidden');
  }

  // Check role permissions
  const normalizedRole = role;
  const isCustomer = normalizedRole === 'customer';

  if (!isCustomer && !isSuperAdmin) {
    throw redirect(302, '/forbidden');
  }

  // Security check: customers can only access their own data
  if (isCustomer && targetUser.id !== locals.user.id) {
    throw redirect(302, '/forbidden');
  }
  
  return {
    user: locals.user,
    role: locals.role,
    customerId: targetUser.id,
    customerData: {
      id: targetUser.id,
      email: targetUser.email,
      name: targetUser.username?.toLowerCase()?.replace(/[^a-z0-9\s-]/g, '')?.replace(/\s+/g, '-')?.replace(/-+/g, '-')?.trim() || targetUser.email?.split('@')[0] || 'Customer',
      membershipLevel: 'Premium',
      memberSince: '2024',
      loyaltyPoints: 450,
    }
  };
};
