// src/routes/forbidden/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = ({ locals, url }) => {
  const roles = locals.user?.roles ?? [];

  let target = '/customer';
  if (roles.includes('admin') || roles.includes('manager')) {
    target = '/app';
  } else if (roles.includes('staff')) {
    target = '/staff';
  }

  // Redirect with flash message
  throw redirect(302, `${target}?message=unauthorized`);
};
