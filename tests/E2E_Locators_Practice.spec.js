const { test, expect } = require('@playwright/test');
 
test('@Webst Client App login', async ({page}) => {
  const productName = 'ZARA COAT 3';
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill('sathishps18@gmail.com');
  await page.locator("#userPassword").fill('sathish@1999');
  await page.getByRole("button", {name: 'Login'}).click();
  console.log(await page.locator('[role="alert"],.toast-message').allTextContents());
  //await page.waitForLoadState('networkidle');
  //await page.locator('.card-body b').first().waitFor();
  await expect(page.locator('.card-body b').first()).toBeVisible();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
});