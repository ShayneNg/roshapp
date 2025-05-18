
// Import Lucia correctly based on the package version
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { DrizzleAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./db";
import { users, sessions } from "./db/schema";

export const auth = new Lucia({
  env: dev ? "DEV" : "PROD",
  adapter: DrizzleAdapter(db, {
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
