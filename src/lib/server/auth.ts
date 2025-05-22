// src/lib/server/auth.ts
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { PostgresJsAdapter } from '@lucia-auth/adapter-postgresql';
import { luciaDb } from './db';
import { users, sessions } from './db/schema';

export const lucia = Lucia({
	adapter: new PostgresJsAdapter(luciaDb, {
		user: users,
		session: sessions
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: 'sveltekit',
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
