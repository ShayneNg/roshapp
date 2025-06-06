
import { redirect } from '@sveltejs/kit';

export async function roleGuard(event: any, allowedRoles: string[]) {
  console.log('🛡️ ROLE GUARD - Checking access for roles:', allowedRoles);
  console.log('🛡️ ROLE GUARD - Event locals session:', event.locals?.session);
  console.log('🛡️ ROLE GUARD - Event locals user:', event.locals?.user);
  console.log('🛡️ ROLE GUARD - Event locals role:', event.locals?.role);

  const session = event.locals?.session;
  const user = event.locals?.user;
  const role = event.locals?.role;

  // Check if user is authenticated
  if (!session || !user) {
    console.log('🛡️ ROLE GUARD - No session or user, redirecting to login');
    throw redirect(302, '/auth/login');
  }

  // Check if user has a role
  if (!role) {
    console.log('🛡️ ROLE GUARD - No role found, redirecting to login');
    throw redirect(302, '/auth/login');
  }

  console.log('🛡️ ROLE GUARD - User role:', role, 'Allowed roles:', allowedRoles);

  // Check if user's role is in allowed roles (case insensitive)
  const normalizedRole = role.toLowerCase();
  const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase());
  const isAllowed = normalizedAllowedRoles.includes(normalizedRole);

  // Super admin check
  const isSuperAdmin = ['developer', 'ceo'].includes(normalizedRole);

  console.log('🛡️ ROLE GUARD - Role check:', {
    normalizedRole,
    normalizedAllowedRoles,
    isAllowed,
    isSuperAdmin
  });

  if (!isAllowed && !isSuperAdmin) {
    console.log('🛡️ ROLE GUARD - Access denied, redirecting to forbidden');
    throw redirect(302, '/forbidden');
  }

  console.log('🛡️ ROLE GUARD - Access granted');
  return { session, role, user };
}
