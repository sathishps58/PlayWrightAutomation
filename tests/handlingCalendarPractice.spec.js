const {test, expect} = require ('@playwright/test');

test.only('Calendar Validations', async ({page}) =>
{
const date = "1";
const month = "6";
const year = "1999";
const prevButton = page.locator(".react-calendar__navigation__prev-button");
const expectedList = [month,date,year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker__calendar-button__icon").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
for (let i=0; i<3; ++i) {
    await prevButton.click();
}
await page.getByText(year).click();
await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1).click();
await page.locator("//abbr[text()='"+date+"']").nth(0).click();
const inputs = page.locator(".react-date-picker__inputGroup__input");

for (let i=0; i<expectedList.length; i++) {
    const value = await inputs.nth(i).inputValue();
    expect(value).toEqual(expectedList[i]);
}

});
