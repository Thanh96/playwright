const { expect } = require('@playwright/test');

exports.MealPage = class MealPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.mealSummary_title = page.locator('[data-cy="mealSummary"] h2');
    this.mealItem = page.locator('[data-cy="mealItem"]');
    this.mealItem_name = page.locator('[data-cy="mealItem_name"]');
    this.mealItem_description = page.locator('[data-cy="mealItem_description"]')
    this.mealItem_price = page.locator('[data-cy="mealItem_price"]')
    this.mealItemForm_submit = page.locator('[data-cy="mealItemForm"] button')
    this.mealItemForm_amount = page.locator('[data-cy="mealItemForm"] input')
  }

  /**
   * Verify Meal Page is visible.
   * 
   * @returns this
   */
  async verifyMealSectionVisible() {
    await expect(this.mealSummary_title).toContainText('Delicious Food, Delivered To You');
    await expect(this.mealItem_name.first()).toBeVisible();
    await expect(this.mealItem_description.first()).toBeVisible();
    await expect(this.mealItem_price.first()).toBeVisible();
  }

  /**
   * Verify Meal item in Meals table.
   * 
   * @param {string} name - the name of meal 
   * @param {string} description - the description of meal
   * @param {strong} price - the price of meal
   * @returns this
   */
  async verifyMealItem(name, description, price) {
    await expect(this.mealItem_name.last()).toContainText(name)
    await expect(this.mealItem_description.last()).toContainText(description)
    await expect(this.mealItem_price.last()).toContainText(price)
  }

  /**
   * Add Meal to the Cart.
   * 
   * @param {string} name - the name of meal
   * @param {number} amount - the meal amount
   * 
   * @returns this
   */
  async addMealToCart(name, amount) {
    const mealInput_xpath = `//*[@data-cy="mealItem_name"][contains(text(), "${name}")]/../..//*[@data-cy="mealItemForm"]//input`;
    const mealAdd_xpath = `//*[@data-cy="mealItem_name"][contains(text(), "${name}")]/../..//*[@data-cy="mealItemForm"]//button`;

    console.log(`Add Meal with name: ${name} and amount: ${amount} to the cart`)
    await this.page.locator(mealInput_xpath).fill(amount);
    await this.page.locator(mealAdd_xpath).click();
  }
}