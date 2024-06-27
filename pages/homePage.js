const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.logoApp = page.locator('header h1');
    this.cartBtn = page.locator('[data-cy="cartBtn"]');
    this.cartBtn_numberItem = page.locator('[data-cy="cartBtn_numberItem"]');
  }

  /**
   * Verify HomePage is visible.
   * 
   * @returns this
   */
  async verifyHomePageVisible() {
    await expect(this.logoApp).toBeVisible();
    await expect(this.cartBtn).toBeVisible();
  }
}