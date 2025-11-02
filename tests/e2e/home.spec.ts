import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Check the title header to be visible
  await expect(
    page.getByRole('heading', { name: 'Tax calculator 2025/2026' })
  ).toBeVisible();
});

test('Simulate nz tax calculation', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('radio', { name: 'New Zealand' }).check();
  await page.getByLabel('Your taxable annual income:').fill('35000');
  await page.getByRole('button', { name: 'Calculate' }).click();

  await expect(page.getByText('5,033', { exact: false })).toBeVisible();
  await expect(page.getByText('29,967', { exact: false })).toBeVisible();
});
test('Simulate au tax calculation', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('radio', { name: 'Australia' }).check();
  await page.getByLabel('Your taxable annual income:').fill('35000');
  await page.getByRole('button', { name: 'Calculate' }).click();
  await expect(page.getByText('2,688', { exact: false })).toBeVisible();
  await expect(page.getByText('32,312', { exact: false })).toBeVisible();
});
