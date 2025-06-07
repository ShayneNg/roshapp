
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
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
    throw redirect(302, '/forbidden');
  }
  
  return {
    user: locals.user,
    role: locals.role
  };
};
