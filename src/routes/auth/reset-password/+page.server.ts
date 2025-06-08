
// src/routes/auth/reset-password/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { validatePasswordResetToken, deletePasswordResetToken } from '$lib/server/passwordReset';
import { getUserById } from '$lib/server/users';
import { appDb } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { z } from 'zod';

export async function load({ url, locals }) {
  // If user is authenticated, redirect to dashboard
  if (locals.session && locals.user) {
    throw redirect(302, `/customer/${locals.user.id}`);
  }

  const token = url.searchParams.get('token');
  
  if (!token || !token.includes(':')) {
    throw redirect(302, '/auth/forgot-password');
  }

  const [tokenId, rawToken] = token.split(':');
  
  // Validate token
  const resetToken = await validatePasswordResetToken(tokenId, rawToken);
  
  if (!resetToken) {
    throw redirect(302, '/auth/forgot-password');
  }

  return {
    csrf: locals.csrf,
    tokenId,
    rawToken
  };
}

const ResetPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
  tokenId: z.string(),
  rawToken: z.string(),
  csrf: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const actions = {
  default: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
    
    const result = ResetPasswordSchema.safeParse(formData);
    
    if (!result.success) {
      const errors = result.error.flatten();
      return fail(400, {
        message: 'Validation failed',
        errors: errors.fieldErrors,
        success: false
      });
    }

    const { password, tokenId, rawToken } = result.data;

    try {
      // Validate token again
      const resetToken = await validatePasswordResetToken(tokenId, rawToken);
      
      if (!resetToken) {
        return fail(400, {
          message: 'Invalid or expired reset token',
          success: false
        });
      }

      // Hash new password
      const hasher = new Argon2id();
      const hashedPassword = await hasher.hash(password);

      // Update user password
      await appDb
        .update(users)
        .set({ hashedPassword })
        .where(eq(users.id, resetToken.userId));

      // Delete the used token
      await deletePasswordResetToken(tokenId);

      console.log('🔑 PASSWORD RESET - Successfully reset password for user:', resetToken.userId);

      // Redirect to login with success message
      throw redirect(302, '/auth/login?reset=success');
      
    } catch (error) {
      console.error('Password reset error:', error);
      
      if (error?.status === 302) {
        throw error;
      }
      
      return fail(500, {
        message: 'An error occurred while resetting your password',
        success: false
      });
    }
  }
};
