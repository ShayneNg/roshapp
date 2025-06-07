
import { redirect } from '@sveltejs/kit';

export async function roleGuard(event: any, allowedRoles: string[]) {
  const session = event.locals?.session;
  const user = event.locals?.user;
  const role = event.locals?.role;

  // Check if user is authenticated
  if (!session || !user) {
    throw redirect(302, '/auth/login');
  }

  // Check if user has a role
  if (!role) {
    throw redirect(302, '/auth/login');
  }

  // Check if user's role is in allowed roles (case insensitive)
  const normalizedRole = role.toLowerCase();
  const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase());
  const isAllowed = normalizedAllowedRoles.includes(normalizedRole);

  // Super admin check
  const isSuperAdmin = ['developer', 'ceo'].includes(normalizedRole);

  if (!isAllowed && !isSuperAdmin) {
    throw redirect(302, '/forbidden');
  }

  return { session, role, user };
}
