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
  csrf: z.string().optional(),
  type: z.literal('login')
});

const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string().min(3).max(20),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  csrf: z.string().optional(),
  type: z.literal('register')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export const actions = {
  default: async ({ request, cookies, locals }) => {
    try {
      console.log('🔍 LOGIN DEBUG - Starting login process');
      
      // Parse form into object
      const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
      console.log('🔍 LOGIN DEBUG - Form data received:', { ...formData, password: '[REDACTED]' });
      
      const { type } = formData;
      console.log('🔍 LOGIN DEBUG - Form type:', type);

      // Select appropriate schema
      const schema = type === 'register' ? RegisterSchema : LoginSchema;
      const result = schema.safeParse(formData);
      console.log('🔍 LOGIN DEBUG - Schema validation result:', result.success);

      // Fail early if validation fails
      if (!result.success) {
        console.log('🔍 LOGIN DEBUG - Validation failed:', result.error.flatten());
        const error = result.error.flatten();
        return fail(400, {
          message: 'Validation failed',
          errors: error.fieldErrors,
          success: false
        });
      }

      const { email, password } = result.data;
      console.log('🔍 LOGIN DEBUG - Extracted data:', { email });
      console.log('🔍 LOGIN DEBUG - CSRF protection disabled for development');

      // Get user by email
      console.log('🔍 LOGIN DEBUG - Looking up user by email:', email);
      const user = await getUserByEmail(email);
      if (!user) {
        console.log('🔍 LOGIN DEBUG - User not found for email:', email);
        return fail(400, {
          message: 'Invalid email or password.',
          email,
          success: false
        });
      }
      console.log('🔍 LOGIN DEBUG - User found:', { id: user.id, email: user.email, role: user.role });

      // Verify password using Argon2id
      console.log('🔍 LOGIN DEBUG - Verifying password');
      const hasher = new Argon2id();
      const valid = await hasher.verify(user.hashedPassword, password);
      console.log('🔍 LOGIN DEBUG - Password verification result:', valid);
      
      if (!valid) {
        console.log('🔍 LOGIN DEBUG - Password verification failed');
        return fail(400, {
          message: 'Invalid email or password.',
          email,
          success: false
        });
      }

      // Create and set session cookie
      console.log('🔍 LOGIN DEBUG - Creating session for user:', user.id);
      const session = await auth.createSession(user.id, {});
      console.log('🔍 LOGIN DEBUG - Session created:', session.id);
      
      const sessionCookie = auth.createSessionCookie(session.id);
      console.log('🔍 LOGIN DEBUG - Session cookie created:', sessionCookie.name);

      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '/',
        ...sessionCookie.attributes
      });

      // Return success and user role for redirection
      const role = user.role?.toLowerCase() ?? 'customer';
      console.log('🔍 LOGIN DEBUG - Login successful! User role:', role);

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
