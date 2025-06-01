import { fail, redirect } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/server/users';
import { Argon2id } from 'oslo/password';
import { auth } from '$lib/server/auth';

export const actions = {
  default: async ({ request, cookies }) => {
    try {
      // 1. Get form input
      const formData = await request.formData();
      const email = String(formData.get('email') || '').trim();
      const password = String(formData.get('password') || '');

      console.log('Login attempt for email:', email);

      // 2. Basic validation
      if (!email || !password) {
        return fail(400, { 
          message: 'Email and password are required.',
          email,
          success: false
        });
      }

      // 3. Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return fail(400, { 
          message: 'Please enter a valid email address.',
          email,
          success: false
        });
      }

      // 4. Find user in DB
      const user = await getUserByEmail(email);
      if (!user) {
        console.log('User not found for email:', email);
        return fail(400, { 
          message: 'Invalid email or password.',
          email,
          success: false
        });
      }

      // 5. Check password match
      const hasher = new Argon2id();
      const valid = await hasher.verify(user.hashedPassword, password);
      if (!valid) {
        console.log('Invalid password for user:', email);
        return fail(400, { 
          message: 'Invalid email or password.',
          email,
          success: false
        });
      }

      // 6. Create session using Lucia
      const session = await auth.createSession(user.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);
      
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '/',
        ...sessionCookie.attributes
      });

      console.log('Login successful for user:', email);

      // 7. Redirect to app
      throw redirect(302, '/app');
    } catch (error) {
      console.error('Login error:', error);
      
      // Don't redirect on errors, return them
      if (error?.status === 302) {
        throw error; // Re-throw redirects
      }
      
      return fail(500, { 
        message: 'An error occurred during login. Please try again.',
        success: false
      });
    }
  }
};
