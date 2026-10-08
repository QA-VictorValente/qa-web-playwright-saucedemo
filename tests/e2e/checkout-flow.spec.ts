import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { InventoryPage } from '../../src/pages/inventory.page';
import { CartPage } from '../../src/pages/cart.page';
import { CheckoutPage } from '../../src/pages/checkout.page';
import { TEST_USERS, PRODUCTS, CHECKOUT_DATA, ERROR_MESSAGES } from '../../src/fixtures/test-data';

test.describe('SauceDemo - Checkout & Purchase Workflows (@web @checkout)', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password);
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('TC-CHK01: Complete End-to-End Shopping Journey from Product Selection to Order Confirmation', async ({ page }) => {
    // 1. Sort products by Price (low to high)
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getAllItemPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);

    // 2. Add products to cart
    await inventoryPage.addItemToCart(PRODUCTS.BACKPACK);
    await inventoryPage.addItemToCart(PRODUCTS.BIKE_LIGHT);
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    // 3. Navigate to Cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);
    expect(await cartPage.isLoaded()).toBe(true);
    expect(await cartPage.getItemCount()).toBe(2);

    const cartItemNames = await cartPage.getItemNames();
    expect(cartItemNames).toContain(PRODUCTS.BACKPACK);
    expect(cartItemNames).toContain(PRODUCTS.BIKE_LIGHT);

    // 4. Proceed to Checkout Step One
    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 5. Fill customer details
    await checkoutPage.fillInformation(CHECKOUT_DATA.DEFAULT_CUSTOMER);
    await checkoutPage.clickContinue();

    // 6. Checkout Step Two (Overview)
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    const subtotal = await checkoutPage.getItemSubtotal();
    const tax = await checkoutPage.getTaxAmount();
    const total = await checkoutPage.getTotalAmount();

    expect(total).toBeCloseTo(subtotal + tax, 2);

    // 7. Finish Order
    await checkoutPage.clickFinish();
    await expect(page).toHaveURL(/.*checkout-complete\.html/);

    const confirmationHeader = await checkoutPage.getCompletionHeader();
    expect(confirmationHeader).toBe('Thank you for your order!');
    await expect(checkoutPage.completeHeader).toBeVisible();

    // 8. Back to inventory and verify empty cart
    await checkoutPage.clickBackHome();
    await expect(page).toHaveURL(/.*inventory\.html/);
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });

  test('TC-CHK02: Add and Remove item from Cart dynamically', async () => {
    // Add item and check badge
    await inventoryPage.addItemToCart(PRODUCTS.BACKPACK);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    // Remove directly from inventory
    await inventoryPage.removeItemFromCart(PRODUCTS.BACKPACK);
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);

    // Add again and remove from cart page
    await inventoryPage.addItemToCart(PRODUCTS.BOLT_TSHIRT);
    await inventoryPage.goToCart();
    expect(await cartPage.getItemCount()).toBe(1);

    await cartPage.removeItem(PRODUCTS.BOLT_TSHIRT);
    expect(await cartPage.getItemCount()).toBe(0);
  });

  test('TC-CHK03: Validate mandatory customer fields validation in Checkout Step 1', async () => {
    await inventoryPage.addItemToCart(PRODUCTS.ONESIE);
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();

    // 1. Missing first name
    await checkoutPage.clickContinue();
    expect(await checkoutPage.getErrorMessageText()).toBe(ERROR_MESSAGES.FIRST_NAME_REQUIRED);

    // 2. Missing last name
    await checkoutPage.fillInformation({ firstName: 'Victor' });
    await checkoutPage.clickContinue();
    expect(await checkoutPage.getErrorMessageText()).toBe(ERROR_MESSAGES.LAST_NAME_REQUIRED);

    // 3. Missing postal code
    await checkoutPage.fillInformation({ lastName: 'QA SDET' });
    await checkoutPage.clickContinue();
    expect(await checkoutPage.getErrorMessageText()).toBe(ERROR_MESSAGES.POSTAL_CODE_REQUIRED);
  });
});
