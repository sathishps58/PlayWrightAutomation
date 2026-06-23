const {test, expect} = require('@playwright/test');

test('Website Client App', async({page}) => {
    const products = page.locator('.card-body');
    const ProductName = 'iphone 13 pro';
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('Sathishps18@gmail.com');
    await page.locator('#userPassword').fill('Sathish@1999');
    await page.locator('#Login').click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
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

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect (bool).toBeTruthy();
    await page.locator('text=Checkout').click();






});