
// src/lib/server/auth.ts
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { appDb } from './db';
import { users, sessions } from './db/schema';

// Create the Lucia authentication instance
export const auth = new Lucia(
	new DrizzlePostgreSQLAdapter(appDb, sessions, users),
	{
		sessionCookie: {
			attributes: {
				secure: !dev
			}
		},
		getUserAttributes: (data) => {
			return {
				username: data.username,
				email: data.email,
				status: data.status
			};
		}
	}
);

// Lucia type declarations
declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
	}
}
