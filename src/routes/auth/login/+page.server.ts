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

// Define Zod schemas for login and register type
const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password is too short' }),
  csrf: z.string().optional(),
  type: z.literal('login')
});


export const actions = {
  default: async ({ request, locals, cookies }) => {
    try {
      // Parse form into object
      const formData = Object.fromEntries(await request.formData()) as Record<string, string>;

      const { type } = formData;

      // Select appropriate schema
      const schema = LoginSchema;
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

      const { email, password } = result.data;

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

      // Return success with role information for redirect
      const roles = user.roles || [];
      const primaryRole = roles.length > 0 ? roles[0].toLowerCase() : 'customer';

      console.log('🔍 LOGIN DEBUG - Login successful! User roles:', roles, 'Primary role:', primaryRole);
      console.log('🔍 LOGIN DEBUG - User ID:', user.id);

      return {
        success: true,
        message: 'Welcome back!',
        role: primaryRole,
        roles: roles,
        userId: user.id
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