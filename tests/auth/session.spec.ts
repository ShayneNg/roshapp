import { test, expect } from '@playwright/test';
import { resetDatabase, seedTestUser } from '../utils/dbUtils';

test.beforeEach(async () => {
  await resetDatabase();
  await seedTestUser(); // Create the default test user
});

test('session cookie is set after login', async ({ page, context }) => {
  await page.goto('/auth/login');
  await page.fill('#email', 'user1@roshapp.test');
  await page.fill('#password', 'securepassword');
  await page.click('button[type="submit"]');

  const cookies = await context.cookies();
  const sessionCookie = cookies.find((cookie) => cookie.name === 'session');

  expect(sessionCookie).toBeDefined();
  expect(sessionCookie?.value.length).toBeGreaterThan(10);
  expect(sessionCookie?.httpOnly).toBeTruthy();
});

test('session cookie is removed on logout', async ({ page, context }) => {
  // Login
  await page.goto('/auth/login');
  await page.fill('#email', 'user1@roshapp.test');
  await page.fill('#password', 'securepassword');
  await page.click('button[type="submit"]');

  // Logout
  await page.goto('/auth/logout');

  const cookies = await context.cookies();
  const sessionCookie = cookies.find((cookie) => cookie.name === 'session');

  expect(!sessionCookie || !sessionCookie.value).toBeTruthy();
});
