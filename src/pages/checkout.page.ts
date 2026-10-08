import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { parsePrice } from '../utils/helpers';

export interface CustomerInformation {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutPage extends BasePage {
  // Step 1: Your Information
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Step 2: Overview
  readonly overviewItems: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  // Step 3: Complete
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');

    // Step 1
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');
    this.errorMessage = page.getByTestId('error');

    // Step 2
    this.overviewItems = page.getByTestId('inventory-item');
    this.itemTotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');

    // Complete
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.backHomeButton = page.getByTestId('back-to-products');
  }

  async fillInformation(info: Partial<CustomerInformation>): Promise<void> {
    if (info.firstName !== undefined) await this.firstNameInput.fill(info.firstName);
    if (info.lastName !== undefined) await this.lastNameInput.fill(info.lastName);
    if (info.postalCode !== undefined) await this.postalCodeInput.fill(info.postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getErrorMessageText(): Promise<string> {
    return (await this.errorMessage.textContent()) || '';
  }

  async getItemSubtotal(): Promise<number> {
    const text = (await this.itemTotalLabel.textContent()) || '';
    return parsePrice(text);
  }

  async getTaxAmount(): Promise<number> {
    const text = (await this.taxLabel.textContent()) || '';
    return parsePrice(text);
  }

  async getTotalAmount(): Promise<number> {
    const text = (await this.totalLabel.textContent()) || '';
    return parsePrice(text);
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async getCompletionHeader(): Promise<string> {
    return (await this.completeHeader.textContent()) || '';
  }

  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
