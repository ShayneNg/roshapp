import { fail, redirect } from '@sveltejs/kit';
import { createUser, getUserByEmail } from '$lib/server/users';
import { createSession } from '$lib/server/session';
import { Argon2id } from 'oslo/password';

export const actions = {
  default: async ({ request, locals }) => {
    // 1. Get form data
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    // 2. Validate presence
    if (!email || !password) {
      return fail(400, { message: 'Email and password are required.' });
    }

    // 3. Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return fail(400, { message: 'User already exists.' });
    }

    // 4. Hash password securely
    const hashedPassword = await new Argon2id().hash(password);

    // 5. Create new user in DB
    const user = await createUser(email, hashedPassword);

    // 6. Create session and set cookie
    await createSession(user.id, { locals });

    // 7. Redirect to dashboard
    throw redirect(302, '/app');
  }
};
