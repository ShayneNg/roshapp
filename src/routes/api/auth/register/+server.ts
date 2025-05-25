
import { json } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { appDb } from '$lib/server/db';
import { toast } from "svelte-sonner";
import { validate, registerSchema } from '$lib/server/validation';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { v4 as uuidv4 } from 'uuid';

export async function POST({ request }) {
  try {
    const payload = await request.json();
    // Validate using the updated schema
    const { email, password, username } = validate(registerSchema, payload);

    // Check if user already exists
    const existingUser = await appDb.query.users.findFirst({
      where: eq(users.email, email)
    });

    if (existingUser) {
      toast.error('User with this email already exists');
      return;
    }

    // Generate a unique ID for the user
    const userId = uuidv4(); // Generate a UUID for user ID

    // Hash the password
    const hasher = new Argon2id();
    const hashedPassword = await hasher.hash(password);

    // Create user
    const [user] = await appDb.insert(users).values({
      id: userId,
      email,
      username,
      status: 'active',
      hashedPassword
    }).returning();

    // Create session
    const session = await auth.createSession(user.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);

    toast.success('Registration successful! Please login.');

    return;
  } catch (error) {
    console.error('Registration error:', error);
    toast.error(error.message || 'Registration failed');
    return;
  }
}
