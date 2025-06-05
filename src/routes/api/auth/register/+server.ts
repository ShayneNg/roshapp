import { json } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { validate, registerSchema } from '$lib/server/validation';
import { createUser, getUserByEmail } from '$lib/server/users';
import { Argon2id } from 'oslo/password';

export async function POST({ request }) {
  try {
    const payload = await request.json();
    // Validate using the updated schema
    const { email, password, username } = validate(registerSchema, payload);

    console.log('Registration payload:', payload)
    
    // Check if user already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return json({ 
        success: false,
        message: 'An account with this email already exists' 
      }, { 
        status: 400 
      });
    }

    // Hash the password
    const hasher = new Argon2id();
    const hashedPassword = await hasher.hash(password);

    // Create user with customer role automatically assigned
    const user = await createUser(email, hashedPassword, username);

    // Create session
    const session = await auth.createSession(user.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);

    return json({
      success: true,
      message: 'Registration successful! Please login.',
      userId: user.id,
      shouldRedirect: true
    }, {
      status: 200
    });
  } catch (error) {
    console.error('Registration error:', error);

    // Check for duplicate key violation (PostgreSQL error code)
    if (error.code === '23505' || (error.message && error.message.includes('duplicate key'))) {
      return json({ 
        success: false,
        message: 'An account with this email already exists' 
      }, { 
        status: 400 
      });
    }

    return json({ 
      success: false,
      message: 'Registration failed. Please try again.' 
    }, { 
      status: 500 
    });
  }
}