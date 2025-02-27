import { expect, test } from '@playwright/test';

test.describe('Layout tests', () => {
  test('is navigation visible', async ({ page }) => {
    await page.goto('/');

    const navbar = page.getByTestId('navbar');

    await expect(navbar).toBeVisible();
  });

  test('is footer visible', async ({ page }) => {
    await page.goto('/');

    const footer = page.getByTestId('footer');

    await expect(footer).toBeVisible();
  });
});
