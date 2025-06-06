// src/hooks.server.ts
import { randomUUID } from 'crypto';
import { auth } from "$lib/server/auth";
import { getUserByEmail, getUserById } from "$lib/server/users";
import type { Handle } from "@sveltejs/kit";

const CSRF_COOKIE_NAME = 'csrf_token';
const ALLOWED_ORIGINS = ['https://your-domain.com']; // ← update this

export const handle: Handle = async ({ event, resolve }) => {
	//
	// ─── LAYER 6: CSRF PROTECTION (DISABLED) ───────────────────────────────────────
	//
	// CSRF protection disabled for development
	event.locals.csrf = 'disabled';

	//
	// ─── LAYER 1 & 2: SESSION HANDLING & AUTH CHECK ───────────────────────────────
	//
	// Check if there's a session cookie
	const sessionId = event.cookies.get(auth.sessionCookieName);

	if (!sessionId) {
		console.log('🔍 HOOKS DEBUG - No session cookie found, checking remember me token');

		// Check for remember me token
		const rememberTokenCookie = event.cookies.get('remember_token');
		if (rememberTokenCookie && rememberTokenCookie.includes(':')) {
			const [tokenId, token] = rememberTokenCookie.split(':');

			try {
				const { validateRememberToken } = await import('$lib/server/rememberMe');
				const rememberToken = await validateRememberToken(tokenId, token);

				if (rememberToken) {
					console.log('🔍 HOOKS DEBUG - Valid remember me token found, creating new session');

					// Create new session from remember token
					const newSession = await auth.createSession(rememberToken.userId, {});
					const sessionCookie = auth.createSessionCookie(newSession.id);

					event.cookies.set(sessionCookie.name, sessionCookie.value, {
						path: '/',
						...sessionCookie.attributes
					});

					// Continue with normal session validation
					const { session, user } = await auth.validateSession(newSession.id);
					if (session && user) {
						// Assuming getUserWithDetails is defined elsewhere and fetches user details.
						const getUserWithDetails = async (userId: string) => {
							const completeUser = await getUserById(userId);
							if (completeUser) {
								return completeUser;
							}
							return null;
						};

						const sessionUser = await getUserWithDetails(user.id);
						if (sessionUser) {
							// Assuming roles are directly on the user object
							const roles = sessionUser.roles || ['customer'];
							const role = roles.length > 0 ? roles[0].toLowerCase() : 'customer';

							event.locals.user = { ...sessionUser, roles };
							event.locals.session = session;
							event.locals.role = role;
							event.locals.csrf = randomUUID();

							console.log('🔍 HOOKS DEBUG - Remember me authentication successful');
							return resolve(event);
						}
					}
				}
			} catch (error) {
				console.error('Remember me token validation error:', error);
				// Clear invalid remember token
				event.cookies.delete('remember_token', { path: '/' });
			}
		}

		event.locals.user = null;
		event.locals.session = null;
		event.locals.role = null;
		event.locals.csrf = randomUUID();
		return resolve(event);
	} else {
		const { session, user } = await auth.validateSession(sessionId);

		// If user exists, create clean session user object with only id and roles
		let sessionUser = null;
		if (user && user.id) {
			try {
				// First try to get by email if available
				if (user.email) {
					const completeUser = await getUserByEmail(user.email);
					if (completeUser) {
						sessionUser = {
							id: user.id,
							roles: completeUser.roles || ['customer'] // Default to customer if no roles
						};
						console.log('🔍 HOOKS DEBUG - User from email:', user.email, 'Roles:', completeUser.roles);
					}
				} else {
					// Fallback: get user by ID and then get full user data
					const completeUser = await getUserById(user.id);
					if (completeUser) {
						const userWithRoles = await getUserByEmail(completeUser.email);
						if (userWithRoles) {
							sessionUser = {
								id: user.id,
								roles: userWithRoles.roles || ['customer'] // Default to customer if no roles
							};
							console.log('🔍 HOOKS DEBUG - User from ID:', user.id, 'Roles:', userWithRoles.roles);
						}
					}
				}
			} catch (error) {
				console.error('Error getting user in session validation:', error);
				// Create minimal user object if database lookup fails
				sessionUser = {
					id: user.id,
					roles: ['customer'] // Default role
				};
			}
		}

		// Refresh cookie if session is fresh
		if (session && session.fresh) {
			const sc = auth.createSessionCookie(session.id);
			event.cookies.set(sc.name, sc.value, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'lax',
				...sc.attributes
			});
		}

		// Blank out cookie if session gone
		if (!session) {
			const sc = auth.createBlankSessionCookie();
			event.cookies.set(sc.name, sc.value, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'lax',
				...sc.attributes
			});
		}

		event.locals.user = sessionUser;
		event.locals.session = session;

		// Set the primary role for roleGuard compatibility
		if (sessionUser && sessionUser.roles && sessionUser.roles.length > 0) {
			event.locals.role = sessionUser.roles[0].toLowerCase(); // Use first role as primary
			console.log('🔍 HOOKS DEBUG - Setting role to:', event.locals.role);
		} else {
			event.locals.role = 'customer'; // Default role instead of null
			console.log('🔍 HOOKS DEBUG - No roles found, defaulting to customer');
		}

		console.log('🔍 HOOKS DEBUG - Final locals.user:', event.locals.user);
		console.log('🔍 HOOKS DEBUG - Final locals.role:', event.locals.role);
	}

	//
	// ─── LAYER 8: CORS PRE-FLIGHT ──────────────────────────────────────────────────
	//
	const url = new URL(event.request.url);
	const origin = event.request.headers.get('origin');

	// Allow same-origin requests and development URLs
	const isDevelopment = url.hostname === 'localhost' || url.hostname.includes('replit.dev');
	const isSameOrigin = !origin || origin === url.origin;

	if (event.request.method === 'OPTIONS') {
		const headers = new Headers();
		if (isSameOrigin || isDevelopment || (origin && ALLOWED_ORIGINS.includes(origin))) {
			headers.set('Access-Control-Allow-Origin', origin || url.origin);
			headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
			headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
		}
		return new Response(null, { status: 204, headers });
	}

	//
	// ─── PROCESS THE REQUEST ──────────────────────────────────────────────────────
	//
	const response = await resolve(event);

	//
	// ─── LAYER 8: CORS HEADERS ─────────────────────────────────────────────────────
	//
	if (isSameOrigin || isDevelopment || (origin && ALLOWED_ORIGINS.includes(origin))) {
		response.headers.set('Access-Control-Allow-Origin', origin || url.origin);
		response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
		response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
	}

	//
	// ─── LAYER 7: SECURE HEADERS ────────────────────────────────────────────────────
	//
	response.headers.set(
		'Content-Security-Policy',
		"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' wss: ws:"
	);
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-XSS-Protection', '1; mode=block');

	return response;
};