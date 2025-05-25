// Drizzle ORM schema definition
// Defines the `users` and `sessions` tables used by Lucia for authentication

import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: 					text('id').primaryKey(),
  email: 				text('email').notNull().unique(),
	username: 		text('username').notNull().unique(),
	hashedPassword: text('password_hash').notNull(),
	status:       text('status', { length: 20 }).notNull(),
	createdAt:    timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt:    timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const sessions = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

// ——— inferred TS types ———
//   'select' gives you exactly the shape you get back from SELECT queries
export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
//   you can also export Insert/UserUpdate if you want:
// export type NewUser = InferModel<typeof users, 'insert'>;
// export type UserUpdate = InferModel<typeof users, 'update'>;