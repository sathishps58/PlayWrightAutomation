const {test, expect} = require('@playwright/test');
test('Dropdowns and Checkboxes test', async ({ page }) => {
    const url = 'https://www.rahulshettyacademy.com/loginpagePractise/';
    const documentLink = page.locator('[href*="documents-request"]');
    await page.goto(url);
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('.radiotextsty').first().click();
    await expect(page.locator('.radiotextsty').first()).toBeChecked();
    // In order to verify the checkbox is checked or not, we can use the below code
    console.log(await page.locator('.radiotextsty').first().isChecked());
    //await page.locator('#okayBtn').click();
    await page.locator('select.form-control').selectOption('consult');
    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();
    // In order to uncheck the checkbox, we can use the below code
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');


    //await page.pause();

});