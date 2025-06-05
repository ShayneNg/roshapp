// src/lib/server/auth.ts
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { appDb } from './db';
import { sessions, users } from './db/schema';
import { getUserByEmail } from './users';
import { Lucia } from 'lucia';
import { dev } from '$app/environment';

// Create the Lucia authentication instance
export const auth = new Lucia(
	new DrizzlePostgreSQLAdapter(appDb, sessions, users),
	{
		sessionCookie: {
			attributes: {
				secure: !dev
			}
		},
		getUserAttributes: (databaseUser) => {
			return {
				id: databaseUser.id,
				roles: databaseUser.roles || []
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