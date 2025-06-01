import { fail } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/server/users';
import { Argon2id } from 'oslo/password';
import { auth } from '$lib/server/auth';

export async function load({ locals }) {
  return {
    csrf: locals.csrf
  };
}

export const actions = {
  default: async ({ request, cookies, locals }) => {
    try {
      // Step 1: Parse form data
      const formData = await request.formData();
      const email = String(formData.get('email') || '').trim();
      const password = String(formData.get('password') || '');
      const type = String(formData.get('type') || 'login');
      const csrf = String(formData.get('csrf') || '');

      // Step 1.5: Validate CSRF token
      if (csrf !== locals.csrf) {
        return fail(403, {
          message: 'CSRF validation failed',
          success: false
        });
      }

      // Step 2: Check type
      if (type !== 'login') {
        return fail(400, { message: 'Only login is supported.', success: false });
      }

      // Step 3: Validate required fields
      if (!email || !password) {
        return fail(400, {
          message: 'Email and password are required.',
          email,
          success: false
        });
      }

      // Step 4: Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return fail(400, {
          message: 'Please enter a valid email address.',
          email,
          success: false
        });
      }

      // Step 5: Get user by email
      const user = await getUserByEmail(email);
      if (!user) {
        return fail(400, {
          message: 'Invalid email or password.',
          email,
          success: false
        });
      }

      // Step 6: Password verification
      const hasher = new Argon2id();
      const valid = await hasher.verify(user.hashedPassword, password);
      if (!valid) {
        return fail(400, {
          message: 'Invalid email or password.',
          email,
          success: false
        });
      }

      // Step 7: Create secure session
      const session = await auth.createSession(user.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);

      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '/',
        ...sessionCookie.attributes
      });

      // Step 8: Return login success and role for client-side navigation
      const role = user.role?.toLowerCase() ?? 'customer';

      return {
        success: true,
        message: 'Login successful!',
        role
      };
    } catch (error) {
      // Step 9: Fallback error
      console.error('Login error:', error);
      return fail(500, {
        message: 'An error occurred during login. Please try again.',
        success: false
      });
    }
  }
};