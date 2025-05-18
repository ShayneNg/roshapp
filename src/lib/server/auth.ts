// Lucia authentication setup using Postgres adapter
// This configures Lucia to use our Drizzle schema and connect via postgres.js

import lucia from 'lucia';
import { dev } from '$app/environment';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { db } from './db';
import { users, sessions } from './db/schema';

// Lucia instance
export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	adapter: postgresAdapter(db, {
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
