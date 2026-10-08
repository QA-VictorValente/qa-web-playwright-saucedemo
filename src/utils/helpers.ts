/**
 * Parses a price string (e.g. "$29.99" or "Item total: $29.99") into a numeric float
 */
export function parsePrice(priceText: string): number {
  const match = priceText.match(/[\d]+\.[\d]{2}/);
  if (!match) {
    throw new Error(`Unable to extract price from: "${priceText}"`);
  }
  return parseFloat(match[0]);
}

/**
 * Formats a number to currency string "$XX.YY"
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
