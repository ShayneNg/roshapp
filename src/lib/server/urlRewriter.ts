
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

// Get user by slug (username)
export async function getUserBySlug(slug: string) {
  try {
    if (!slug) {
      console.log('❌ Empty slug provided to getUserBySlug');
      return null;
    }

    const users_result = await appDb
      .select()
      .from(users)
      .where(eq(users.username, slug))
      .limit(1);
    
    if (users_result.length > 0) {
      console.log(`✅ Found user for slug: ${slug}`);
      return users_result[0];
    } else {
      console.log(`❌ No user found for slug: ${slug}`);
      return null;
    }
  } catch (error) {
    console.error('❌ Error in getUserBySlug:', error);
    return null;
  }
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
