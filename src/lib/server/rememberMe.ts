
// src/lib/server/rememberMe.ts
import { appDb } from './db';
import { rememberTokens } from './db/schema';
import { eq, lt } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';

/**
 * Creates a remember me token for persistent login
 */
export async function createRememberToken(userId: string) {
  const tokenId = generateId(15);
  const token = generateId(25); // Raw token to send to client
  
  const hasher = new Argon2id();
  const hashedToken = await hasher.hash(token);
  
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days
  
  await appDb.insert(rememberTokens).values({
    id: tokenId,
    userId,
    hashedToken,
    expiresAt
  });
  
  return { tokenId, token }; // Return both ID and raw token
}

/**
 * Validates a remember me token
 */
export async function validateRememberToken(tokenId: string, token: string) {
  const result = await appDb
    .select()
    .from(rememberTokens)
    .where(eq(rememberTokens.id, tokenId))
    .limit(1);
    
  if (result.length === 0) {
    return null;
  }
  
  const rememberToken = result[0];
  
  // Check if token is expired
  if (rememberToken.expiresAt < new Date()) {
    await deleteRememberToken(tokenId);
    return null;
  }
  
  // Verify token
  const hasher = new Argon2id();
  const valid = await hasher.verify(rememberToken.hashedToken, token);
  
  if (!valid) {
    return null;
  }
  
  return rememberToken;
}

/**
 * Deletes a remember me token
 */
export async function deleteRememberToken(tokenId: string) {
  await appDb.delete(rememberTokens).where(eq(rememberTokens.id, tokenId));
}

/**
 * Clean up expired remember me tokens
 */
export async function cleanupExpiredRememberTokens() {
  await appDb.delete(rememberTokens).where(lt(rememberTokens.expiresAt, new Date()));
}

/**
 * Delete all remember tokens for a user (logout from all devices)
 */
export async function deleteAllRememberTokensForUser(userId: string) {
  await appDb.delete(rememberTokens).where(eq(rememberTokens.userId, userId));
}
