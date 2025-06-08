// src/routes/auth/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/server/users';
import { Argon2id } from 'oslo/password';
import { auth } from '$lib/server/auth';
import { z } from 'zod';

export async function load({ locals }) {
  // If user is already authenticated, redirect them to their appropriate dashboard
  if (locals.session && locals.user) {
    // Get user roles to determine redirect path
    const roles = locals.user.roles || [];
    const firstRole = roles.length > 0 ? roles[0].toLowerCase() : 'customer';
    
    let redirectPath = `/customer/${user.id}`; // Default for customer role with user ID
    
    if (firstRole === 'admin' || firstRole === 'manager') {
      redirectPath = '/app';
    } else if (firstRole === 'staff') {
      redirectPath = '/staff';
    } else if (firstRole === 'customer') {
      redirectPath = `/customer/${user.id}`;
    }
    
    throw redirect(302, redirectPath);
  }

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

    try {
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

      // Clear any existing remember me token first
      cookies.delete('remember_token', { path: '/' });
      
      // Handle remember me functionality
      const rememberMe = formData.rememberMe === 'on';
      if (rememberMe) {
        const { createRememberToken } = await import('$lib/server/rememberMe');
        const { tokenId, token } = await createRememberToken(user.id);
        
        // Set remember me cookie (30 days)
        cookies.set('remember_token', `${tokenId}:${token}`, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30 // 30 days
        });
        
        console.log('✅ Remember me token created for user:', user.id);
      } else {
        console.log('❌ Remember me not selected, no token created');
      }

      // Determine redirect path based on user roles
      const roles = user.roles || [];
      const firstRole = roles.length > 0 ? roles[0].toLowerCase() : 'customer';
      let redirectPath = '/customer'; // Default for customer role
      
      if (firstRole === 'admin' || firstRole === 'manager') {
        redirectPath = '/app';
      } else if (firstRole === 'staff') {
        redirectPath = '/staff';
      } else if (firstRole === 'customer') {
        redirectPath = '/customer';
      }

      // Server-side redirect is more reliable
      throw redirect(302, redirectPath);
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle redirect errors differently from other errors
      if (error?.status === 302 || error?.location) {
        // This is actually a successful redirect, re-throw it
        throw error;
      }
      
      return fail(500, {
        message: 'An error occurred during login. Please try again.',
        success: false
      });
    }
  }
};