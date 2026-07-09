const { test, expect } = require('@playwright/test');
 
test.only('@Webst Client App login', async ({page}) => {
  const productName = 'ZARA COAT 3';
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill('sathishps18@gmail.com');
  await page.getByPlaceholder("enter your passsword").fill('Sathish@1999');
  await page.getByRole("button", {name: 'Login'}).click();
  console.log(await page.locator('[role="alert"],.toast-message').allTextContents());
  await expect(page.locator('.card-body b').first()).toBeVisible();
  await page.locator('.card-body').filter({hasText:"iphone 13 pro"}).getByRole("button", {name: "Add To Cart"}).click();
  await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();
  await expect (page.getByText("iphone 13 pro")).toBeVisible();
  await page.getByRole("button", {name: 'Checkout'}).click();
  await page.getByPlaceholder('Select Country').pressSequentially('ind');
  await page.getByRole("button", {name: 'India'}).nth(1).click();
  await page.getByText("PLACE ORDER").click();
  await expect (page.getByText(' Thankyou for the order. ')).toBeVisible();
});