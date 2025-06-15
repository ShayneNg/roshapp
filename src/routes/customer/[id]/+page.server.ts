
import { redirect } from '@sveltejs/kit';
import { getUserSlugById } from '$lib/server/urlRewriter';

// UUID v4 regex pattern for validation
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const load = async ({ locals, params }) => {
  // Check if user is authenticated
  if (!locals.session || !locals.user) {
    throw redirect(302, '/auth/login');
  }

  // Get the customer ID from the URL parameter
  const customerId = params.id;
  
  // Validate UUID format to prevent bypass attempts
  if (!customerId || !UUID_REGEX.test(customerId)) {
    throw redirect(302, '/forbidden');
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

  // Security check: customers can only access their own data
  if (isCustomer && customerId !== locals.user.id) {
    throw redirect(302, '/forbidden');
  }

  // This route now acts as middleware - immediately redirect to username route
  const userSlug = await getUserSlugById(customerId);
  if (!userSlug) {
    throw redirect(302, '/forbidden');
  }

  // Add a short delay to control the flash time (optional)
  // await new Promise(resolve => setTimeout(resolve, 100)); // 100ms flash

  // Redirect to the username route with middleware reference
  throw redirect(302, `/customer/${userSlug}?ref=middleware`);
};
