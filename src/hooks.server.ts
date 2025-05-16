// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { getSession } from '$lib/server/session';

export const handle: Handle = async ({ event, resolve }) => {
	// 1. Read session cookie
	const sessionId = event.cookies.get('session_id');
	if (sessionId) {
		const user = getSession(sessionId);
		if (user) {
			event.locals.user = user;  // attach user to locals
		}
	}

	// 2. Proceed to resolve the request
	const response = await resolve(event);

	return response;
};
