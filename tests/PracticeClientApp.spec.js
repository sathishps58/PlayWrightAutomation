const {test, expect} = require ('@playwright/test');

test('Signup & Login Test', async({page}) =>
{
    await page.goto('https://www.rahulshettyacademy.com/client/');
    await page.locator('text=Register here').click();
    await expect(page).toHaveURL('https://www.rahulshettyacademy.com/client/#/auth/register');
    console.log(await page.title());
    await page.locator('#firstName').fill('Sathish');
    await page.locator('#lastName').fill('PSS');
    await page.locator('#userEmail').fill('sathishps18@gmail.com');
    await page.locator('#userMobile').fill('8074294338');
    await page.getByRole('combobox').selectOption('Engineer');
    await page.locator("[value='Male']").check();
    await page.locator('#userPassword').fill('Sathish@1999');
    await page.locator('#confirmPassword').fill('Sathish@1999');
    await page.locator("[type='checkbox']").check();
    await page.locator('#login').click();
    //await page.getByText('Login').click();
    //await expect(page).toHaveURL('https://www.rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('sathishps18@gmail.com');
    await page.locator('#userPassword').fill('Sathish@1999');
    await page.locator('#login').click();
    //await expect(page).toHaveURL('https://www.rahulshettyacademy.com/client/#/dashboard/dash');
    await page.waitForLoadState('networkidle'); //one method to get all the data after page load
    const cardTitles = await page.locator('.card-body b').allTextContents();
    console.log(cardTitles);
    // another method to get all the data after page load
    // await page.locator(cardTitles).first().waitFor();
    /*console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());*/
});
