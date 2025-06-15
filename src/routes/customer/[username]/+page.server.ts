
import { redirect } from '@sveltejs/kit';
import { getUserBySlug, getUserSlugById } from '$lib/server/urlRewriter';

export const load = async ({ locals, params, url }) => {
  // Check if user is authenticated
  if (!locals.session || !locals.user) {
    throw redirect(302, '/auth/login');
  }

  // Get the username from the URL parameter
  const username = params.username;
  
  // Security check: ensure user is accessing their own profile or is a super admin
  const role = locals.role?.toLowerCase();
  const isSuperAdmin = ['developer', 'ceo'].includes(role);
  
  // For non-super admins, ensure they're accessing their own profile
  if (!isSuperAdmin) {
    const currentUserSlug = await getUserSlugById(locals.user.id);
    if (currentUserSlug !== username) {
      throw redirect(302, '/forbidden');
    }
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
