const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartBtn = page.locator('[data-cy="cartBtn"]');
    this.cartBtn_numberItem = page.locator('[data-cy="cartBtn_numberItem"]');
    this.cartItem = page.locator('[data-cy="cartItem"]');
    this.cartItem_name = page.locator('[data-cy="cartItem"] h2');
    this.cartItem_price = page.locator('[data-cy="cartItem_price"]');
    this.cartItem_amount = page.locator('[data-cy="cartItem_amount"]');
    this.cartItem_actions = page.locator('[data-cy="cartItem_actions"]');
    this.cartTotal = page.locator('[data-cy="cart_total"] span');
    this.cartActions = page.locator('[data-cy="cart_actions"]');
  }

  /**
   * Verify the meal info in Your Cart.
   * 
   * @param {string} name - the name of meal
   * @param {number} price - the price of meal
   * @param {number} amount - the amount of meal
   * @returns this
   */
  async verifyMealInCart(name, price, amount) {
      console.log(`Verify Meal item in the Your Cart with name: ${name}, price: ${price}, amount: ${amount}`)
      await expect(this.cartItem_name).toHaveText(name)
      await expect(this.cartItem_price).toContainText(price)
      await expect(this.cartItem_amount).toContainText(amount)

      const total = (Number(price)*Number(amount)).toFixed(2);
      console.log('Verify the total amount is correct')
      await expect(this.cartTotal.last()).toContainText(total.toString());
  }
}