
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage');
const { MealPage } = require('../pages/mealsPage');
const { AddMealPage } = require('../pages/addMealPage');
const { CartPage } = require('../pages/cartPage');

test('TC_1: Validate UIs on the page', async ({ page }) => {
  const homePage = new HomePage(page);
  const mealPage = new MealPage(page);
  const addMealPage = new AddMealPage(page);

  console.log('Visit home page');
  await page.goto(' http://localhost:3000');

  console.log('Verify HomePage is visible: Logo app & Cart button');
  await homePage.verifyHomePageVisible();

  console.log('Verify Meal Page is visible');
  await mealPage.verifyMealSectionVisible();

  console.log('Verify Add Meal section is visible');
  await addMealPage.verifyAddMealSectionVisible();
});

test('TC_2: Validate the user can add a meal successfully', async ({ page }) => {
  const homePage = new HomePage(page);
  const mealPage = new MealPage(page);
  const addMealPage = new AddMealPage(page);

  const name = 'Hamburger';
  const description = 'Delicious, meat and vegetables';
  const price = '30.00';

  console.log('Visit home page');
  await page.goto(' http://localhost:3000');

  console.log('*** Verify user is navigated to ReactMeals page successfully');
  await homePage.verifyHomePageVisible();

  console.log('Verify Add Meal section is visible');
  await addMealPage.verifyAddMealSectionVisible();

  console.log('Add a new meal');
  await addMealPage.addMeal(name, description, price);

  console.log('*** Verify the new meal should be diplayed in Meals tabel');
  await mealPage.verifyMealItem(name, description, price);
});

test('TC_3. Validate the user can add meal to cart successfully', async ({ page }) => {
  const homePage = new HomePage(page);
  const mealPage = new MealPage(page);
  const cartPage = new CartPage(page);

  const name = 'Sushi';
  const amount = '3';
  const price = '22.99';

  console.log('Visit home page');
  await page.goto(' http://localhost:3000');

  console.log('*** Verify user is navigated to ReactMeals page successfully');
  await homePage.verifyHomePageVisible();

  console.log('*** Add Meal to Your Cart');
  await mealPage.addMealToCart(name, amount);

  console.log('*** Verify amount of meal should be display at the right of Your Cart')
  await expect(cartPage.cartBtn_numberItem).toHaveText(amount);

  console.log('*** Verify the meal info in Your Cart')
  await cartPage.cartBtn.click();
  await cartPage.verifyMealInCart(name, price, amount);
});


