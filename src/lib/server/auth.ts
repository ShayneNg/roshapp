// src/lib/server/auth.ts
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { sveltekit } from 'lucia/middleware';
import { db } from './db';
import { users, sessions } from './db/schema';

export const auth = new Lucia({
	adapter: new DrizzlePostgreSQLAdapter(db, {
		user: users,
		session: sessions
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	sessionCookie: {
		name: 'session',
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (data) => {
		return {
			username: data.username,
			email: data.email
		};
	}
});

// Type declarations for Lucia
declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
	}
}
