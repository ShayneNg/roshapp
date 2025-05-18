import { test, expect } from '@playwright/test';
import { resetDatabase, seedTestUser } from '../utils/dbUtils';

test.beforeEach(async () => {
  await resetDatabase();     // Clean the DB
  await seedTestUser();      // Add one fake user
});

test('login with correct credentials', async ({ page }) => {
  await page.goto('/auth/login');
  await page.fill('#email', 'user1@roshapp.test');
  await page.fill('#password', 'securepassword');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/app');
});
