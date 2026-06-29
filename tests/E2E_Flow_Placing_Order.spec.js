/* const {test, expect} = require('@playwright/test');

test.only('Website Client App', async({page}) => {
    const products = page.locator('.card-body');
    const ProductName = 'iphone 13 pro';
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('Sathishps18@gmail.com');
    await page.locator('#userPassword').fill('Sathish@1999');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    //await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i=0; i < count; ++i)
    {
        if (await products.nth(i).locator('b').textContent() === ProductName)
        {
            await products.nth(i).locator('text = Add To Cart').click();
            break;
        }
    }
    await page.waitForLoadState('load');
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect (bool).toBeTruthy();
    await page.locator('text=Checkout').click();
    await page.waitForLoadState('networkidle');
    await page.locator('input[type="text"].text-validated').nth(0).fill('1234 5678 9012 1234');
    await page.getByRole('combobox').nth(0).selectOption('09');
    await page.getByRole('combobox').nth(1).selectOption('28');
    await page.locator('input[type="text"].txt').nth(1).fill('123');
    await page.locator('input[type="text"].txt').nth(2).fill('PS SATHISH');
    await page.locator('input[type="text"].txt').nth(3).fill('rahulshettyacademy');
    await page.locator('text=Apply Coupon').click();
    console.log(await page.locator("p[style*='green'].mt-1").textContent());
    await page.locator('input[type="text"].txt').nth(4).fill('123');
    await page.locator('input[type="text"].text-validated').nth(1).fill('sathishps18@gmail.com');
    await page.getByPlaceholder('Select Country').pressSequentially("ind", {delay: 150});
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for (let i=0; i<optionsCount; ++i) {
        const text = await dropdown.locator('button').nth(i).textContent();
        if (text === ' India') {
           await dropdown.locator('button').nth(i).click();
           break;
        }
    }

}); */

const { test, expect } = require('@playwright/test');
 
test('@Webst Client App login', async ({ page }) => {
  //js file- Login js, DashboardPage
  //const email = "anshika@gmail.com";
  const productName = 'ZARA COAT 3';
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill('sathishps18@gmail.com');
  await page.locator("#userPassword").fill('sathish@1999');
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
     if (await products.nth(i).locator("b").textContent() === productName) {
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
     }
  }
 
  await page.locator("[routerlink*='cart']").dispatchEvent('click');
  //await page.pause();
 
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
 
 await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 })
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
     const text = await dropdown.locator("button").nth(i).textContent();
     if (text === " India") {
        await dropdown.locator("button").nth(i).click();
        break;
     }
  }
 
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();
  console.log('Submitted Order');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator("label.ng-star-inserted").textContent();
  console.log(orderId);
 
  await page.locator("button[routerlink*='myorders']").dispatchEvent('click');
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
 
 
  for (let i = 0; i < await rows.count(); ++i) {
     const rowOrderId = await rows.nth(i).locator("th").textContent();
     if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
     }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});

