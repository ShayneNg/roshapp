import { redirect } from '@sveltejs/kit';

export async function roleGuard(event, allowedRoles: string[]) {
  const session = event.locals?.session;
  const role = event.locals?.role;

  if (!session || !role) throw redirect(302, '/auth/login');

  const isAllowed = allowedRoles.includes(role);

  // Extend later for CEO/Developer override
  const isSuperAdmin = ['developer', 'ceo'].includes(role);

  if (!isAllowed && !isSuperAdmin) {
    throw redirect(302, '/unauthorized');
  }

  return { session, role };
}
