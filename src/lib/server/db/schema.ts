import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: 					text('id').primaryKey(),
	email:        text('email', { length: 256 }).notNull(),
	username: 		text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	status:       text('status', { length: 20 }).notNull(),
	createdAt:    timestamp('created_at').defaultNow().notNull(),
	updatedAt:    timestamp('updated_at').defaultNow().notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

// ——— inferred TS types ———
//   'select' gives you exactly the shape you get back from SELECT queries
export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
//   you can also export Insert/UserUpdate if you want:
// export type NewUser = InferModel<typeof users, 'insert'>;
// export type UserUpdate = InferModel<typeof users, 'update'>;