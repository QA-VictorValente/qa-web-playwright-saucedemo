import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigates to a specific path relative to baseURL
   */
  async navigate(path = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Gets current page URL
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Waits for URL matching pattern
   */
  async waitForUrl(urlOrPattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlOrPattern);
  }
}
