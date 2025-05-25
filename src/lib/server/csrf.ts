// src/lib/server/csrf.ts
import { randomUUID } from 'crypto';
import type { Handle } from '@sveltejs/kit';

const TOKEN_KEY = 'csrf_token';

/** 
 * Hook to generate/attach CSRF token in locals & cookie 
 */
export const csrfHandle: Handle = async ({ event, resolve }) => {
  let token = event.cookies.get(TOKEN_KEY);
  if (!token) {
    token = randomUUID();
    event.cookies.set(TOKEN_KEY, token, { httpOnly: true, secure: true, path: '/' });
  }
  event.locals.csrf = token;
  return await resolve(event);
};

/** 
 * Validate incoming CSRF token in POST/PUT/DELETE 
 */
export function validateCsrf(event: { request: Request; locals: any }) {
  if (event.request.method !== 'GET') {
    return event.request
      .json()
      .then((body: any) => {
        if (body.csrf !== event.locals.csrf) {
          throw new Response('CSRF validation failed', { status: 403 });
        }
        return body;
      });
  }
  return event.request.json();
}
