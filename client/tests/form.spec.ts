import { expect, test } from '@playwright/test';

test.describe('Form tests', async () => {
  test('is navigation visible', async ({ page }) => {
    await page.goto('/');

    const arrivalMultiplier = page.getByTestId('arrivalMultiplier');
    const consumption = page.getByTestId('consumption');
    const chargePointsCount = page.getByTestId('chargePoints.0.count');
    const chargePointsPower = page.getByTestId('chargePoints.0.power');

    await arrivalMultiplier.fill('100');
    await consumption.fill('18');
    await chargePointsCount.fill('20');
    await chargePointsPower.fill('11');

    await expect(arrivalMultiplier).toBeVisible();
    await expect(consumption).toBeVisible();
    await expect(chargePointsCount).toBeVisible();
    await expect(chargePointsPower).toBeVisible();

    await expect(arrivalMultiplier).toHaveValue('100');
    await expect(consumption).toHaveValue('18');
    await expect(chargePointsCount).toHaveValue('20');
    await expect(chargePointsPower).toHaveValue('11');
  });
});
