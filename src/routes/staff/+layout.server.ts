// src/routes/staff/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  // Check if user is authenticated
  if (!locals.session || !locals.user) {
    throw redirect(302, '/auth/login');
  }

  const roles = locals.user?.roles || [];
  const role = locals.role?.toLowerCase();
  const isSuperAdmin = ['developer', 'ceo'].includes(role || '');
  
  if (!roles.includes('staff') && !isSuperAdmin) {
    throw redirect(302, '/forbidden');
  }
};
