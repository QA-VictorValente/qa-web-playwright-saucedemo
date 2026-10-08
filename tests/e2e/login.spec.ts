import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { InventoryPage } from '../../src/pages/inventory.page';
import { TEST_USERS, ERROR_MESSAGES } from '../../src/fixtures/test-data';

test.describe('SauceDemo - Authentication Workflows (@web @login)', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('TC-LOG01: Successful login with valid standard user credentials', async ({ page }) => {
    await loginPage.login(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password);

    await expect(page).toHaveURL(/.*inventory\.html/);
    const isLoaded = await inventoryPage.isLoaded();
    expect(isLoaded).toBe(true);

    const itemCount = await inventoryPage.getItemCount();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('TC-LOG02: Should display error message for locked out user', async () => {
    await loginPage.login(TEST_USERS.LOCKED_OUT.username, TEST_USERS.LOCKED_OUT.password);

    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toBe(ERROR_MESSAGES.LOCKED_OUT);
  });

  test('TC-LOG03: Should display error message for invalid credentials', async () => {
    await loginPage.login(TEST_USERS.INVALID.username, TEST_USERS.INVALID.password);

    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toBe(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  test('TC-LOG04: Should validate mandatory username requirement', async () => {
    await loginPage.fillPassword(TEST_USERS.STANDARD.password);
    await loginPage.clickLogin();

    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toBe(ERROR_MESSAGES.USERNAME_REQUIRED);
  });

  test('TC-LOG05: Should validate mandatory password requirement', async () => {
    await loginPage.fillUsername(TEST_USERS.STANDARD.username);
    await loginPage.clickLogin();

    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toBe(ERROR_MESSAGES.PASSWORD_REQUIRED);
  });
});
