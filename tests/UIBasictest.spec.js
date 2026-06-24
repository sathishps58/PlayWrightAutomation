const {test, expect} = require('@playwright/test');

test('Browser Context Playwright Test', async ({browser}) => 
    {
       const context = await browser.newContext();
       const page = await context.newPage(); 
       await page.goto('https://www.google.com/');
       console.log(await page.title());
    });

    //Happy Path - login with valid credentials
    test('Page Playwright Test', async ({page}) =>
        {
            await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
            // get title of the page
            console.log(await page.title());
            await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
            await page.locator('#username').fill('rahulshettyacademy');
            await page.locator('[name="password"]').fill('Learning@830$3mK2');
            await page.locator('#terms').check();
            await page.locator('#signInBtn').click();
        });

        //Negative Path - login with invalid credentials and verifying error message
        test('Page Playwright Test 02', async ({page}) =>
        {
            await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
            await page.locator('#username').fill('rahulshetty');
            await page.locator("[name='password']").fill('Learning');
            await page.locator('#signInBtn').click();
            console.log(await page.locator("[style*='block']").textContent());
            await expect(page.locator("[style*=block]")).toContainText('Incorrect');
        });

// Assigning locator to a variable and then executing it
test('Page Playwright Test 03', async ({page}) =>
    {
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        const userName = page.locator('#username');
        await userName.fill('rahulshettyacademy');
        const password = page.locator("[name='password']");
        await password.fill('Learning@830$3mK2');
        const signIn = page.locator('#signInBtn');
        await signIn.click();
        const cardTitles = page.locator('.card-body a');
        console.log(await cardTitles.first().textContent());
        console.log(await cardTitles.nth(1).textContent());
    });

    test('Child window handling', async({browser}) =>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        const documentLink = page.locator('[href*="documents-request"]');
        const [newPage] = await Promise.all(
            [
                context.waitForEvent('page'),
                documentLink.click()
            ]
        )
        await newPage.locator('.red').textContent();
        console.log(await newPage.locator('.red').textContent());
        const text = await newPage.locator('.red').textContent();
        const arrayText = text.split('@');
        const domain = arrayText[1].split(' ')[0];
        console.log(domain);
        await page.locator('#username').fill(domain);
        console.log(await page.locator('#username').textContent());
        // In order to get the value in terminal entered in the input field
        console.log(await page.locator('#username').inputValue());
    });
