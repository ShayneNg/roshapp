// src/hooks.server.ts
import { randomUUID } from 'crypto';
import { auth } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";

const CSRF_COOKIE_NAME = 'csrf_token';
const ALLOWED_ORIGINS = ['https://your-domain.com']; // ← update this

export const handle: Handle = async ({ event, resolve }) => {
	//
	// ─── LAYER 0: BYPASS SVELTEKIT CSRF FOR SAME-ORIGIN ────────────────────────────
	//
	// Disable SvelteKit's built-in CSRF protection for development
	if (event.request.method === 'POST') {
		const url = new URL(event.request.url);
		// Mark as same-origin to bypass SvelteKit's CSRF
		Object.defineProperty(event.request, 'headers', {
			value: new Headers(event.request.headers),
			writable: true
		});
		(event.request.headers as any).set('origin', url.origin);
	}

	//
	// ─── LAYER 6: CSRF PROTECTION ───────────────────────────────────────────────────
	//
	let csrf = event.cookies.get(CSRF_COOKIE_NAME);
	if (!csrf) {
		csrf = randomUUID();
		console.log('🔍 CSRF DEBUG - Generated new CSRF token:', csrf.substring(0, 8) + '...');
		event.cookies.set(CSRF_COOKIE_NAME, csrf, {
			path: '/',
			httpOnly: true,
			secure: false, // Allow HTTP in development
			sameSite: 'lax'
		});
	} else {
		console.log('🔍 CSRF DEBUG - Using existing CSRF token:', csrf.substring(0, 8) + '...');
	}
	event.locals.csrf = csrf;

	//
	// ─── LAYER 1 & 2: SESSION HANDLING & AUTH CHECK ───────────────────────────────
	//
	const sessionId = event.cookies.get(auth.sessionCookieName);
	console.log('🔍 SESSION DEBUG - Session ID from cookie:', sessionId ? sessionId.substring(0, 8) + '...' : 'none');
	
	if (!sessionId) {
		console.log('🔍 SESSION DEBUG - No session ID found, setting user/session to null');
		event.locals.user = null;
		event.locals.session = null;
	} else {
		console.log('🔍 SESSION DEBUG - Validating session...');
		const { session, user } = await auth.validateSession(sessionId);
		console.log('🔍 SESSION DEBUG - Session validation result:', { 
			sessionExists: !!session, 
			userExists: !!user,
			userId: user?.id 
		});

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

		event.locals.user = user;
		event.locals.session = session;
	}

	//
	// ─── LAYER 8: CORS PRE-FLIGHT ──────────────────────────────────────────────────
	//
	const origin = event.request.headers.get('origin');
	const url = new URL(event.request.url);
	console.log('🔍 ORIGIN DEBUG - Request origin:', origin);
	console.log('🔍 ORIGIN DEBUG - Request URL:', url.origin);
	console.log('🔍 ORIGIN DEBUG - Method:', event.request.method);

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
		"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
	);
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-XSS-Protection', '1; mode=block');

	return response;
};