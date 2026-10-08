import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');
    this.cartItems = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  async isLoaded(): Promise<boolean> {
    await this.title.waitFor({ state: 'visible' });
    return (await this.title.textContent()) === 'Your Cart';
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getItemNames(): Promise<string[]> {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  private getItemContainer(productName: string): Locator {
    return this.cartItems.filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: productName })
    });
  }

  async removeItem(productName: string): Promise<void> {
    const itemContainer = this.getItemContainer(productName);
    const removeButton = itemContainer.getByRole('button', { name: 'Remove' });
    await removeButton.click();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
