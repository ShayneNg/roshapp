
// Lucia authentication setup using Postgres adapter
// This configures Lucia to use our Drizzle schema and connect via postgres.js

import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db';
import { users, sessions } from './db/schema';

// Lucia instance
export const auth = new Lucia({
	env: dev ? 'DEV' : 'PROD',
	adapter: new DrizzlePostgreSQLAdapter(db, {
		user: users,
		session: sessions
	}),
	middleware: 'sveltekit',
	sessionCookie: {
		name: 'session',
		attributes: {
			secure: !dev
		}
	}
});

// Lucia type registration
declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
	}
}
