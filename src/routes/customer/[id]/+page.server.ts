
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
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

  // Get the customer ID from the URL parameter
  const customerId = params.id;
  
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
      name: locals.user.email?.split('@')[0] || 'Customer',
      membershipLevel: 'Premium',
      memberSince: '2024',
      loyaltyPoints: 450,
      // Add more customer-specific fields as needed
    }
  };
};
