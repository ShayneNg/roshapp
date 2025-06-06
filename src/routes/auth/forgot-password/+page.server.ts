
// src/routes/auth/forgot-password/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/server/users';
import { createPasswordResetToken } from '$lib/server/passwordReset';
import { z } from 'zod';

export async function load({ locals }) {
  // If user is already authenticated, redirect to dashboard
  if (locals.session && locals.user) {
    const roles = locals.user.roles || [];
    const firstRole = roles.length > 0 ? roles[0].toLowerCase() : 'customer';
    
    let redirectPath = '/customer';
    if (firstRole === 'admin' || firstRole === 'manager') {
      redirectPath = '/app';
    } else if (firstRole === 'staff') {
      redirectPath = '/staff';
    }
    
    throw redirect(302, redirectPath);
  }

  return {
    csrf: locals.csrf
  };
}

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  csrf: z.string().optional()
});

export const actions = {
  default: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
    
    const result = ForgotPasswordSchema.safeParse(formData);
    
    if (!result.success) {
      return fail(400, {
        message: 'Please enter a valid email address',
        success: false
      });
    }

    const { email } = result.data;

    try {
      const user = await getUserByEmail(email);
      
      if (user) {
        // Create password reset token
        const { tokenId, token } = await createPasswordResetToken(user.id);
        
        // In a real app, you'd send this via email
        // For now, we'll just log it (in production, remove this)
        console.log('🔑 PASSWORD RESET - Token for', email, ':', `${tokenId}:${token}`);
        console.log('🔑 PASSWORD RESET - Reset URL: /auth/reset-password?token=' + tokenId + ':' + token);
        
        // TODO: Send email with reset link
        // await sendPasswordResetEmail(email, resetUrl);
      }
      
      // Always return success (security: don't reveal if email exists)
      return {
        success: true,
        message: 'If an account with that email exists, we\'ve sent password reset instructions.'
      };
      
    } catch (error) {
      console.error('Forgot password error:', error);
      return fail(500, {
        message: 'An error occurred. Please try again.',
        success: false
      });
    }
  }
};
