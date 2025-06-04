// Drizzle ORM schema definition
// Defines the `users` and `sessions` tables used by Lucia for authentication

import { pgTable, primaryKey, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: 					text('id').primaryKey().notNull().unique().default('uuid_generate_v4()'),
  email: 				text('email').notNull().unique(),
	username: 		text('username').notNull().unique(),
	hashedPassword: text('hashed_password').notNull(),
	status:       text('status', { enum: ['active','inactive','suspense'], length: 20 }).notNull(),
	createdAt:    timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt:    timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	token: text('token').notNull().unique(),
	ipAddress: text('ip_address'),
	user_agent: text('user_agent'),
	expires: timestamp('expires_at', { withTimezone: true }).notNull(),
	createdAt:    timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt:    timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const roles = pgTable("roles", {
	id: integer("id").primaryKey(),
	name: text("name").notNull().unique() // admin, staff, customer, etc.
});

export const userRoles = pgTable("user_roles", {
	userId: text("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
	roleId: text("role_id").notNull().references(() => roles.id, { onDelete: 'cascade' }),
}, (table) => ({
	pk: primaryKey({ columns: [table.userId, table.roleId] })
}));

// ——— inferred TS types ———
//   'select' gives you exactly the shape you get back from SELECT queries
export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
//   you can also export Insert/UserUpdate if you want:
// export type NewUser = InferModel<typeof users, 'insert'>;
// export type UserUpdate = InferModel<typeof users, 'update'>;