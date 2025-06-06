
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  console.log('🏪 CUSTOMER LAYOUT SERVER - Checking access');
  console.log('🏪 CUSTOMER LAYOUT SERVER - Locals user:', locals.user);
  console.log('🏪 CUSTOMER LAYOUT SERVER - Locals role:', locals.role);
  console.log('🏪 CUSTOMER LAYOUT SERVER - Locals session:', locals.session);

  // Check if user is authenticated
  if (!locals.session || !locals.user) {
    console.log('🏪 CUSTOMER LAYOUT SERVER - No session/user, redirecting to login');
    throw redirect(302, '/auth/login');
  }

  // Check if user has customer role
  const role = locals.role;
  if (!role) {
    console.log('🏪 CUSTOMER LAYOUT SERVER - No role, redirecting to login');
    throw redirect(302, '/auth/login');
  }

  const normalizedRole = role.toLowerCase();
  const isCustomer = normalizedRole === 'customer';
  const isSuperAdmin = ['developer', 'ceo'].includes(normalizedRole);

  if (!isCustomer && !isSuperAdmin) {
    console.log('🏪 CUSTOMER LAYOUT SERVER - Not customer role, redirecting to forbidden');
    throw redirect(302, '/forbidden');
  }

  console.log('🏪 CUSTOMER LAYOUT SERVER - Access granted for role:', role);
  
  return {
    user: locals.user,
    role: locals.role
  };
};
