
declare global {
	namespace App {
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
			role: string | null;
			csrf: string;
		}
	}
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof import('$lib/server/auth').auth;
		DatabaseUserAttributes: {
			id: string;
			roles: string[];
		};
	}
}

export {};
