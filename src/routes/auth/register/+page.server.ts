import { fail, redirect } from '@sveltejs/kit';
import { createUser, getUserByEmail } from '$lib/server/users';
import { Argon2id } from 'oslo/password';
import { auth } from '$lib/server/auth';

export async function load({ locals }) {
  // If user is already authenticated, redirect them to their appropriate dashboard
  if (locals.session && locals.user) {
    console.log('🔄 REGISTER PAGE - User already authenticated, redirecting...');
    
    // Get user roles to determine redirect path
    const roles = locals.user.roles || [];
    const firstRole = roles.length > 0 ? roles[0].toLowerCase() : 'customer';
    
    let redirectPath = '/customer'; // Default for customer role
    
    if (firstRole === 'admin' || firstRole === 'manager') {
      redirectPath = '/app';
    } else if (firstRole === 'staff') {
      redirectPath = '/staff';
    } else if (firstRole === 'customer') {
      redirectPath = '/customer';
    }
    
    console.log('🔄 REGISTER PAGE - Redirecting authenticated user to:', redirectPath);
    throw redirect(302, redirectPath);
  }

  return {
    csrf: locals.csrf
  };
}

export const actions = {
  default: async ({ request, locals, cookies }) => {
    // 1. Get form data
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const csrf = String(formData.get('csrf'));

    // 2. Validate presence
    if (!email || !password) {
      return fail(400, { message: 'Email and password are required.' });
    }

    // 3. Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return fail(400, { message: 'User already exists.' });
    }

    // 4. Hash password securely
    const hashedPassword = await new Argon2id().hash(password);

    // 5. Create new user in DB
    const user = await createUser(email, hashedPassword);

    // 6. Create session and set cookie
    const session = await auth.createSession(user.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '/',
      ...sessionCookie.attributes
    });

    // 7. Redirect to dashboard
    throw redirect(302, '/app');
  }
};