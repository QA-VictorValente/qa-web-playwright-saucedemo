import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async isLoaded(): Promise<boolean> {
    await this.title.waitFor({ state: 'visible' });
    return (await this.title.textContent()) === 'Products';
  }

  async getItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async getAllItemNames(): Promise<string[]> {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async getAllItemPrices(): Promise<number[]> {
    const priceTexts = await this.page.getByTestId('inventory-item-price').allTextContents();
    return priceTexts.map(text => parseFloat(text.replace('$', '')));
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  private getItemContainer(productName: string): Locator {
    return this.inventoryItems.filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: productName })
    });
  }

  async addItemToCart(productName: string): Promise<void> {
    const itemContainer = this.getItemContainer(productName);
    const addButton = itemContainer.getByRole('button', { name: 'Add to cart' });
    await addButton.click();
  }

  async removeItemFromCart(productName: string): Promise<void> {
    const itemContainer = this.getItemContainer(productName);
    const removeButton = itemContainer.getByRole('button', { name: 'Remove' });
    await removeButton.click();
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return text ? parseInt(text, 10) : 0;
    }
    return 0;
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
