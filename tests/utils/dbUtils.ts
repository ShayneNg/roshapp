import { db } from '$lib/server/db';
import { users, sessions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';

// Clears all users and sessions before a test
export async function resetDatabase() {
  await db.delete(sessions); // clear all sessions
  await db.delete(users);    // clear all users
}

// Add a fake user with known password for login testing
export async function seedTestUser({
  email = 'user1@roshapp.test',
  password = 'securepassword',
  username = 'testuser'
} = {}) {
  const hashedPassword = await new Argon2id().hash(password);

  const result = await db.insert(users).values({
    email,
    hashedPassword
  }).returning();

  return result[0]; // return the created user object
}
