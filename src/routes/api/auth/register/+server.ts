
import { json } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { appDb } from '$lib/server/db';
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
      return json({ error: 'User with this email already exists' }, { status: 400 });
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

    return json({ 
      success: true,
      user: { 
        id: user.id,
        email: user.email,
        username: user.username 
      }
    }, {
      headers: {
        'Set-Cookie': sessionCookie.serialize()
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return json({ 
      error: error.message || 'Registration failed' 
    }, { 
      status: 400 
    });
  }
}
