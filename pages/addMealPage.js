const { expect } = require('@playwright/test');

exports.AddMealPage = class AddMealPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addMeal_title = page.locator('[data-cy="addMeal"] h2');
    this.addMeal_name = page.locator('[data-cy="addMeal_name"] input');
    this.addMeal_description = page.locator('[data-cy="addMeal_description"] input');
    this.addMeal_price = page.locator('[data-cy="addMeal_price"] input');
    this.addMeal_submit = page.locator('[data-cy="addMeal"] button[type="submit"]');
  }

  /**
   * Verify the Add Meal section is visible.
   * 
   * @returns this
   */
  async verifyAddMealSectionVisible() {
    await expect(this.addMeal_title).toContainText('Add a Meal');
    await expect(this.addMeal_name).toBeVisible();
    await expect(this.addMeal_description).toBeVisible();
    await expect(this.addMeal_price).toBeVisible();
  }

  /**
   * Add new Meal.
   * 
   * @param {string} name - the name of meal
   * @param {string} description - the description of meal
   * @param {string} price - the price of meal
   * @returns 
   */
  async addMeal(name, description, price) {
    console.log('*** Enter valid name')
    await this.addMeal_name.fill(name)

    console.log('*** Enter description')
    await this.addMeal_description.fill(description)

    console.log('*** Enter valid price')
    await this.addMeal_price.fill(price)

    console.log('*** Click Add Meal button')
    await this.addMeal_submit.click();
  }
}