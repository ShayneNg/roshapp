// Database connection using postgres.js
// This creates a singleton connection to PostgreSQL using DATABASE_URL from .env

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const luciaDb = postgres(process.env.DATABASE_URL!);

// Use this drizzle instance for app logic
export const appDb = drizzle(luciaDb, { schema }); // same connection reused
