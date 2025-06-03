// src/routes/auth/login/+page.server.ts
import { fail } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/server/users';
import { Argon2id } from 'oslo/password';
import { auth } from '$lib/server/auth';
import { z } from 'zod';

export async function load({ locals }) {
  // Expose CSRF token to the frontend form via props
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
      // Parse form into object
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

      const { email, password, csrf } = result.data;

      // CSRF token validation
      if (csrf !== locals.csrf) {
        return fail(403, {
          message: 'CSRF validation failed',
          success: false
        });
      }

      // Get user by email
      const user = await getUserByEmail(email);
      if (!user) {
        return fail(400, {
          message: 'Invalid email or password.',
          email,
          success: false
        });
      }

      // Verify password using Argon2id
      const hasher = new Argon2id();
      const valid = await hasher.verify(user.hashedPassword, password);
      if (!valid) {
        return fail(400, {
          message: 'Invalid email or password.',
          email,
          success: false
        });
      }

      // Create and set session cookie
      const session = await auth.createSession(user.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);

      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '/',
        ...sessionCookie.attributes
      });

      // Return success and user role for redirection
      const role = user.role?.toLowerCase() ?? 'customer';

      return {
        success: true,
        message: 'Login successful!',
        role
      };
    } catch (error) {
      console.error('Login error:', error);
      return fail(500, {
        message: 'An error occurred during login. Please try again.',
        success: false
      });
    }
  }
};
