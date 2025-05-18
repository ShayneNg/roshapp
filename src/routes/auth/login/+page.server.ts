import { fail, redirect } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/server/users';
import { Argon2id } from 'oslo/password';
import { createSession } from '$lib/server/session';

export const actions = {
  default: async ({ request, locals }) => {
    // 1. Get form input
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    // 2. Basic validation
    if (!email || !password) {
      return fail(400, { message: 'Email and password are required.' });
    }

    // 3. Find user in DB
    const user = await getUserByEmail(email);
    if (!user) {
      return fail(400, { message: 'Invalid credentials.' });
    }

    // 4. Check password match
    const valid = await new Argon2id().verify(user.hashedPassword, password);
    if (!valid) {
      return fail(400, { message: 'Invalid credentials.' });
    }

    // 5. Login: create session
    await createSession(user.id, { locals });

    // 6. Redirect to app
    throw redirect(302, '/app');
  }
};
