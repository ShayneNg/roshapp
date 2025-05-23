// src/lib/server/users.ts

// This file acts as a service layer between your database and auth logic.
// It exposes clean, reusable functions for interacting with the "users" table.

import { appDb } from './db'; // PostgreSQL connection using postgres.js
import { users } from './db/schema'; // Drizzle schema for "users" table
import { eq } from 'drizzle-orm'; // Helper to write SQL WHERE condition

/**
 * Fetches a user from the database by their email address.
 * Used for login and registration checks.
 *
 * @param email - The user email to search for
 * @returns the user object if found, or undefined
 */
export async function getUserByEmail(email: string) {
  const result = await appDb
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return result[0]; // undefined if not found
}

/**
 * Creates a new user in the database with a hashed password.
 * Used during registration flow.
 *
 * @param email - User's email
 * @param hashedPassword - Securely hashed password string
 * @returns the inserted user record
 */
export async function createUser(email: string, hashedPassword: string) {
  const result = await appDb
    .insert(users)
    .values({ email, hashedPassword })
    .returning();

  return result[0]; // Returns the created user row
}

/**
 * Fetches a user by their internal user ID (primary key).
 * Useful when validating session ownership or performing actions as user.
 *
 * @param userId - Primary key of the user
 * @returns the user object if found
 */
export async function getUserById(userId: number) {
  const result = await appDb
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}
