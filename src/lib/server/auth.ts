
// src/lib/server/auth.ts
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { appDb } from './db';
import { users, sessions } from './db/schema';

// Create the Lucia authentication instance
export const auth = new Lucia({
	env: dev ? 'DEV' : 'PROD',
	adapter: new DrizzlePostgreSQLAdapter(appDb, {
		user: users,
		session: sessions
	}),
	middleware: 'sveltekit',
	sessionCookie: {
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

// Lucia type declarations
declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
	}
}
