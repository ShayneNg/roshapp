// src/routes/(app)/+page.server.ts
import { redirect } from '@sveltejs/kit';

/**
 * Redirect users accessing `/auth` directly to `/auth/login`.
 * This ensures a clean entry point into the auth layout group.
 *
 * Status Code: 302 (Temporary Redirect)
 * Note: Use 301 if it's a permanent route.
 */
export function load() {
    throw redirect(302, '/app/dashboard');
}
