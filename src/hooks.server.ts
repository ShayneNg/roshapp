// src/hooks.server.ts
// ------------------------------------------------------------------------
// Global request hook
// Automatically runs on every request and injects `locals.user` if session is valid
//-------------------------------------------------------------------------
import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
  const { user, session } = await auth.validateRequest(event);

  event.locals.user = user;
  event.locals.session = session;

  return resolve(event);
};

