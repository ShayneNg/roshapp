
import { appDb } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

// Convert username to slug format (lowercase, spaces to hyphens, remove special chars)
export function createSlug(username: string): string {
  if (!username) return '';
  
  return username
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .trim();
}

// Get user by slug
export async function getUserBySlug(slug: string) {
  const users_result = await appDb
    .select()
    .from(users)
    .where(eq(users.username, slug))
    .limit(1);
  
  return users_result.length > 0 ? users_result[0] : null;
}

// Get user by ID and return their slug
export async function getUserSlugById(userId: string) {
  try {
    const users_result = await appDb
      .select({ username: users.username })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (users_result.length === 0) {
      console.log(`❌ No user found for ID: ${userId}`);
      return null;
    }
    
    const slug = createSlug(users_result[0].username);
    if (!slug) {
      console.log(`❌ Could not create slug for username: ${users_result[0].username}`);
      return null;
    }
    
    return slug;
  } catch (error) {
    console.error('❌ Error getting user slug:', error);
    return null;
  }
}
