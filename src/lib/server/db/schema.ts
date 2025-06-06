// Drizzle ORM schema definition
// Defines the `users` and `sessions` tables used by Lucia for authentication

import { pgTable, primaryKey, text, timestamp, integer, serial, date } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: 					text('id').primaryKey().notNull().unique().default('uuid_generate_v4()'),
  email: 				text('email').notNull().unique(),
	username: 		text('username').notNull().unique(),
	hashedPassword: text('hashed_password').notNull(),
	status:       text('status', { enum: ['active','inactive','suspense'], length: 20 }).notNull().default('active'),
	createdAt:    timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt:    timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull()
});

export const roles = pgTable("roles", {
	id: serial("id").primaryKey(),
	name: text("name", { enum: ['customer', 'staff', 'manager', 'admin', 'developer', 'ceo'] }).notNull().unique()
});

// Remember Me tokens for persistent login
export const rememberTokens = pgTable('remember_tokens', {
	id: text('id').primaryKey().notNull().unique(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	hashedToken: text('hashed_token').notNull(),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

// Password reset tokens
export const passwordResetTokens = pgTable('password_reset_tokens', {
	id: text('id').primaryKey().notNull().unique(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	hashedToken: text('hashed_token').notNull(),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export type RememberToken = typeof rememberTokens.$inferSelect;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;

export const userRoles = pgTable("user_roles", {
	userId: text("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
	roleId: integer("role_id").notNull().references(() => roles.id, { onDelete: 'cascade' }),
	assignedAt: timestamp('assigned_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
	pk: primaryKey({ columns: [table.userId, table.roleId] })
}));

export const userProfiles = pgTable("user_profiles", {
	id: serial("id").primaryKey(),
	userId: text("user_id").notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
	firstName: text("first_name"),
	lastName: text("last_name"),
	dateOfBirth: date("date_of_birth"),
	gender: text("gender", { enum: ['male', 'female', 'other', 'prefer_not_to_say'] }),
	avatarUrl: text("avatar_url"),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const userAddresses = pgTable("user_addresses", {
	id: serial("id").primaryKey(),
	userId: text("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
	type: text("type", { enum: ['billing', 'shipping'] }).notNull(),
	addressLine1: text("address_line_1").notNull(),
	addressLine2: text("address_line_2"),
	city: text("city").notNull(),
	state: text("state").notNull(),
	postalCode: text("postal_code").notNull(),
	country: text("country").notNull().default('Australia'),
	isDefault: text("is_default", { enum: ['true', 'false'] }).notNull().default('false'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const userFinance = pgTable("user_finance", {
	id: serial("id").primaryKey(),
	userId: text("user_id").notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
	tfn: text("tfn"), // Tax File Number
	superannuation: text("superannuation"),
	walletAddress: text("wallet_address"),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// ——— inferred TS types ———
//   'select' gives you exactly the shape you get back from SELECT queries
export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
export type Role = typeof roles.$inferSelect;
export type UserRole = typeof userRoles.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type UserAddress = typeof userAddresses.$inferSelect;
export type UserFinance = typeof userFinance.$inferSelect;

// Relations for Drizzle queries
import { relations } from 'drizzle-orm';

export const usersRelations = relations(users, ({ one, many }) => ({
	profile: one(userProfiles, {
		fields: [users.id],
		references: [userProfiles.userId],
	}),
	finance: one(userFinance, {
		fields: [users.id],
		references: [userFinance.userId],
	}),
	addresses: many(userAddresses),
	userRoles: many(userRoles),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
	userRoles: many(userRoles),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
	user: one(users, {
		fields: [userRoles.userId],
		references: [users.id],
	}),
	role: one(roles, {
		fields: [userRoles.roleId],
		references: [roles.id],
	}),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
	user: one(users, {
		fields: [userProfiles.userId],
		references: [users.id],
	}),
}));

export const userAddressesRelations = relations(userAddresses, ({ one }) => ({
	user: one(users, {
		fields: [userAddresses.userId],
		references: [users.id],
	}),
}));

export const userFinanceRelations = relations(userFinance, ({ one }) => ({
	user: one(users, {
		fields: [userFinance.userId],
		references: [users.id],
	}),
}));