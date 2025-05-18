import { test, expect } from '@playwright/test';
import { resetDatabase, seedTestUser } from '../utils/dbUtils';

test.beforeEach(async () => {
  await resetDatabase(); // Clean the database before every test
});

test('user can register successfully', async ({ page }) => {
  await page.goto('/auth/register');
  await page.fill('#email', 'newuser@roshapp.test');
  await page.fill('#username', 'newuser');
  await page.fill('#password', 'securepassword');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/app');
});

test('duplicate registration fails', async ({ page }) => {
  await seedTestUser({ email: 'user1@roshapp.test' });

  await page.goto('/auth/register');
  await page.fill('#email', 'user1@roshapp.test');
  await page.fill('#username', 'dupeuser');
  await page.fill('#password', 'securepassword');
  await page.click('button[type="submit"]');

  await expect(page.locator('text=already exists')).toBeVisible();
});
