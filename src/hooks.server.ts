// src/hooks.server.ts
// ------------------------------------------------------------------------
// Global request hook
// Automatically runs on every request and injects `locals.user` if session is valid
//-------------------------------------------------------------------------
import type { Handle } from '@sveltejs/kit';
import { Lucia } from 'lucia';
import { auth } from '$lib/server/lucia';

export const handle: Handle = async ({ event, resolve }) => {
  // Handle Lucia authentication
  event.locals.auth = auth.handleRequest(event);
  const { session, user } = await event.locals.auth.validateUser();
  event.locals.user = user;
  event.locals.session = session;

  // Proceed to resolve the request
  const response = await resolve(event);

  return response;
};