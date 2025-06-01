
/// <reference types="lucia" />
declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
			csrf: string;
			role: string | null;
		}
	}
}

// Lucia type definitions
declare namespace Lucia {
	type Auth = import('$lib/server/lucia').Auth;
	type DatabaseUserAttributes = {
		username: string;
		email: string;
	};
	type DatabaseSessionAttributes = {};
}

export {};
