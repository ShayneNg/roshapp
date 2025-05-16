// src/lib/server/session.ts
import { randomUUID } from 'crypto';
import type { User } from '$lib/server/db/schema'; // your User type

// Simple in-memory store: Map<sessionId, { user, expires }>
const SESSION_TTL = 1000 * 60 * 60 * 24; // 24h
const store = new Map<string, { user: User; expires: number }>();

/**
 * Create a new session for a user.
 * @returns session ID string
 */
export function createSession(user: User): string {
  const sessionId = randomUUID();
  const expires = Date.now() + SESSION_TTL;
  store.set(sessionId, { user, expires });
  return sessionId;
}

/**
 * Fetch session data by ID, auto-cleanup if expired.
 */
export function getSession(sessionId: string) {
  const entry = store.get(sessionId);
  if (!entry) return null;
  if (entry.expires < Date.now()) {
    store.delete(sessionId);
    return null;
  }
  return entry.user;
}

/**
 * Destroy a session early (logout).
 */
export function destroySession(sessionId: string) {
  store.delete(sessionId);
}
