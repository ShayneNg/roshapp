// src/routes/staff/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const roles = locals.user?.roles || [];
  if (!roles.includes('staff')) {
    throw redirect(303, '/forbidden');
  }
};
