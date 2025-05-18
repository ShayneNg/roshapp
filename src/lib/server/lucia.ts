
import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { drizzle } from "@lucia-auth/adapter-drizzle";
import { db } from "./db";
import { users, sessions } from "./db/schema";

export const auth = lucia({
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  adapter: drizzle(db, {
    user: users,
    session: sessions
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email
    };
  }
});

export type Auth = typeof auth;
