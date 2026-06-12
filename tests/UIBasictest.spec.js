const {test, expect} = require('@playwright/test');

test('Browser Context Playwright Test', async ({browser}) => 
    {
       const context = await browser.newContext();
       const page = await context.newPage(); 
       await page.goto('https://www.google.com/');
       console.log(await page.title());
    });

    test('Page Playwright Test', async ({page}) =>
        {
            await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
            // get title of the page
            console.log(await page.title());
            await expect(page).toHaveTitle("Loginpage Practise | Rahul Shetty Academy");
            await page.locator('#username').fill('rahulshettyacademy');
            await page.locator('[name="password"]').fill('Learning@830$3mK2');
            await page.locator('#otp-login-btn').click();
        });
