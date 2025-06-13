
import { redirect } from '@sveltejs/kit';

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
  
  // For now, we'll use the authenticated user's data
  // In a real app, you might want to fetch specific customer data based on the ID
  // and check if the current user has permission to view this customer's data
  
  return {
    user: locals.user,
    role: locals.role,
    customerId,
    // You can add more customer-specific data here
    customerData: {
      id: customerId,
      email: locals.user.email,
      name: locals.user.username?.toLowerCase()?.replace(/[^a-z0-9\s-]/g, '')?.replace(/\s+/g, '-')?.replace(/-+/g, '-')?.trim() || locals.user.email?.split('@')[0] || 'Customer',
      membershipLevel: 'Premium',
      memberSince: '2024',
      loyaltyPoints: 450,
      // Add more customer-specific fields as needed
    }
  };
};
