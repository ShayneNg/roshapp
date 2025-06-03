import { fail } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/server/users';
import { Argon2id } from 'oslo/password';
import { auth } from '$lib/server/auth';
import { z } from 'zod';

export async function load({ locals }) {
  return {
    csrf: locals.csrf
  };
}

// Define Zod schemas for login and register types
const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password is too short' }),
  csrf: z.string().min(1, { message: 'Missing CSRF token' }),
  type: z.literal('login')
});

const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string().min(3).max(20),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  csrf: z.string().min(1),
  type: z.literal('register')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export const actions = {
  default: async ({ request, cookies, locals }) => {
    try {
      // Step 1: Parse form data
      const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
      const { type } = formData;

      // Select appropriate schema
      const schema = type === 'register' ? RegisterSchema : LoginSchema;
      const result = schema.safeParse(formData);

      // Fail early if validation fails
      if (!result.success) {
        const error = result.error.flatten();
        return fail(400, {
          message: 'Validation failed',
          errors: error.fieldErrors,
          success: false
        });
      }

      console.log('LOGIN DEBUG - CSRF validation passed');

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
      console.log('LOGIN DEBUG - Looking up user by email:', email);
      const user = await getUserByEmail(email);
      console.log('LOGIN DEBUG - User found:', !!user);
      if (!user) {
        console.log('LOGIN DEBUG - User not found');
        return fail(400, {
          message: 'Invalid email or password.',
          email,
          success: false
        });
      }

      // Step 6: Password verification
      console.log('LOGIN DEBUG - Verifying password');
      const hasher = new Argon2id();
      const valid = await hasher.verify(user.hashedPassword, password);
      console.log('LOGIN DEBUG - Password valid:', valid);
      if (!valid) {
        console.log('LOGIN DEBUG - Password verification failed');
        return fail(400, {
          message: 'Invalid email or password.',
          email,
          success: false
        });
      }

      // Step 7: Create secure session
      console.log('LOGIN DEBUG - Creating session for user:', user.id);
      const session = await auth.createSession(user.id, {});
      console.log('LOGIN DEBUG - Session created:', session.id);
      const sessionCookie = auth.createSessionCookie(session.id);

      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '/',
        ...sessionCookie.attributes
      });
      console.log('LOGIN DEBUG - Session cookie set');

      // Step 8: Return login success and role for client-side navigation
      const role = user.role?.toLowerCase() ?? 'customer';
      console.log('LOGIN DEBUG - User role:', role);
      console.log('LOGIN DEBUG - Login process completed successfully');

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