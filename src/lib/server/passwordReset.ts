
// src/lib/server/passwordReset.ts
import { appDb } from './db';
import { passwordResetTokens } from './db/schema';
import { eq, lt } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';

/**
 * Creates a password reset token
 */
export async function createPasswordResetToken(userId: string) {
  const tokenId = generateId(15);
  const token = generateId(25); // Raw token for email
  
  const hasher = new Argon2id();
  const hashedToken = await hasher.hash(token);
  
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry
  
  // Delete any existing reset tokens for this user
  await appDb.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId));
  
  await appDb.insert(passwordResetTokens).values({
    id: tokenId,
    userId,
    hashedToken,
    expiresAt
  });
  
  return { tokenId, token };
}

/**
 * Validates a password reset token
 */
export async function validatePasswordResetToken(tokenId: string, token: string) {
  const result = await appDb
    .select()
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.id, tokenId))
    .limit(1);
    
  if (result.length === 0) {
    return null;
  }
  
  const resetToken = result[0];
  
  // Check if token is expired
  if (resetToken.expiresAt < new Date()) {
    await deletePasswordResetToken(tokenId);
    return null;
  }
  
  // Verify token
  const hasher = new Argon2id();
  const valid = await hasher.verify(resetToken.hashedToken, token);
  
  if (!valid) {
    return null;
  }
  
  return resetToken;
}

/**
 * Deletes a password reset token
 */
export async function deletePasswordResetToken(tokenId: string) {
  await appDb.delete(passwordResetTokens).where(eq(passwordResetTokens.id, tokenId));
}

/**
 * Clean up expired password reset tokens
 */
export async function cleanupExpiredPasswordResetTokens() {
  await appDb.delete(passwordResetTokens).where(lt(passwordResetTokens.expiresAt, new Date()));
}
