// src/hooks.server.ts
// ------------------------------------------------------------------------
// Global request hook
// Automatically runs on every request and injects `locals.user` if session is valid
//-------------------------------------------------------------------------
import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
  // Handle Lucia authentication
  const authRequest = auth.handleRequest(event);
  event.locals.auth = authRequest;
  const session = await authRequest.validate();
  event.locals.user = session?.user || null;
  event.locals.session = session;

  // Proceed to resolve the request
  const response = await resolve(event);

  return response;
};
</old_str>
<new_str>
// src/hooks.server.ts
// ------------------------------------------------------------------------
// Global request hook
// Automatically runs on every request and injects `locals.user` if session is valid
//-------------------------------------------------------------------------
import type { Handle } from '@sveltejs/kit';
import * as lucia from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
  // Handle Lucia authentication
  event.locals.auth = lucia.auth.handleRequest(event);
  const session = await event.locals.auth.validate();
  event.locals.user = session?.user || null;
  event.locals.session = session;

  // Proceed to resolve the request
  const response = await resolve(event);

  return response;
};