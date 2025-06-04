// src/lib/server/users.ts

// This file acts as a service layer between your database and auth logic.
// It exposes clean, reusable functions for interacting with the "users" table.

import { appDb } from './db'; // PostgreSQL connection using postgres.js
import { users, roles, userRoles } from './db/schema'; // Drizzle schema for tables
import { eq, and } from 'drizzle-orm'; // Helper to write SQL WHERE condition

/**
 * Fetches a user from the database by their email address with roles.
 * Used for login and registration checks.
 *
 * @param email - The user email to search for
 * @returns the user object with roles if found, or undefined
 */
export async function getUserByEmail(email: string) {
  try {
    const result = await appDb
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        hashedPassword: users.hashedPassword,
        status: users.status,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (result.length === 0) {
      console.log('Database query result for email', email, ': not found');
      return undefined;
    }

    const user = result[0];
    
    // Get user roles separately
    const userRolesResult = await appDb
      .select({
        roleId: userRoles.roleId,
        roleName: roles.name,
        assignedAt: userRoles.assignedAt
      })
      .from(userRoles)
      .leftJoin(roles, eq(userRoles.roleId, roles.id))
      .where(eq(userRoles.userId, user.id));

    console.log('Database query result for email', email, ': found');
    
    return {
      ...user,
      userRoles: userRolesResult.map(ur => ({
        userId: user.id,
        roleId: ur.roleId,
        assignedAt: ur.assignedAt,
        role: {
          id: ur.roleId,
          name: ur.roleName
        }
      }))
    };
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return undefined;
  }
}

/**
 * Fetches a user with all related data including roles, profile, addresses, and finance.
 *
 * @param userId - The user ID to search for
 * @returns the complete user object if found, or undefined
 */
export async function getUserWithDetails(userId: string) {
  try {
    const result = await appDb.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        userRoles: {
          with: {
            role: true
          }
        },
        profile: true,
        addresses: true,
        finance: true
      }
    });

    return result;
  } catch (error) {
    console.error('Error fetching user with details:', error);
    return undefined;
  }
}

/**
 * Creates a new user in the database with a hashed password and assigns default customer role.
 * Used during registration flow.
 *
 * @param email - User's email
 * @param hashedPassword - Securely hashed password string
 * @param username - User's username (optional)
 * @returns the inserted user record
 */
export async function createUser(email: string, hashedPassword: string, username?: string) {
  try {
    const userId = crypto.randomUUID();
    
    // Create user
    const [newUser] = await appDb
      .insert(users)
      .values({ 
        id: userId,
        email, 
        username: username || email.split('@')[0], // Use email prefix if no username provided
        hashedPassword,
        status: 'active'
      })
      .returning();

    // Assign default customer role
    await assignRoleToUser(userId, 'customer');

    return newUser; // Returns the created user row
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Assigns a role to a user.
 *
 * @param userId - The user ID
 * @param roleName - The role name to assign
 */
export async function assignRoleToUser(userId: string, roleName: string) {
  try {
    // Find the role by name
    const role = await appDb.query.roles.findFirst({
      where: eq(roles.name, roleName)
    });

    if (!role) {
      throw new Error(`Role '${roleName}' not found`);
    }

    // Check if user already has this role
    const existingUserRole = await appDb.query.userRoles.findFirst({
      where: and(eq(userRoles.userId, userId), eq(userRoles.roleId, role.id))
    });

    if (existingUserRole) {
      console.log(`User ${userId} already has role ${roleName}`);
      return;
    }

    // Assign the role
    await appDb.insert(userRoles).values({
      userId,
      roleId: role.id
    });

    console.log(`Role '${roleName}' assigned to user ${userId}`);
  } catch (error) {
    console.error('Error assigning role to user:', error);
    throw error;
  }
}

/**
 * Fetches a user by their internal user ID (primary key).
 * Useful when validating session ownership or performing actions as user.
 *
 * @param userId - Primary key of the user (UUID string)
 * @returns the user object if found
 */
export async function getUserById(userId: string) {
  const result = await appDb
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}
