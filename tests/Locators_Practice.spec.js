const {test, expect} = require('@playwright/test');

test.only('Additional Locators Practice', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator("input.form-control[name='name']").fill('Sathish');
    await page.locator("input.form-control[name='email']").fill('Sathishps18@gmail.com');
    await page.getByPlaceholder('Password').fill('Sathish@1999');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByLabel('Employed').check();
    await page.getByRole('button', {name: 'submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

});