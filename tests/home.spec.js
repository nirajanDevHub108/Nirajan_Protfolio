import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  // Uses the baseURL from config (http://localhost:3000)
  await page.goto('/'); 
  await expect(page.getByText("Hello, I'm Nirajan")).toBeVisible();
});
