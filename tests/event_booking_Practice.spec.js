const {test, expect} = require ('@playwright/test')

test.only('event booking practice website', async ({page}) => {

/* creating a User Account for logging in
await page.goto("https://eventhub.rahulshettyacademy.com/login");
await page.getByRole("link", {name:'Register'}).click();
await expect (page).toHaveURL("https://eventhub.rahulshettyacademy.com/register");
await page.getByPlaceholder("you@email.com").fill("sathishps218@gmail.com");
await page.locator('#register-password').fill("Sathish@1999");
await page.getByPlaceholder("Repeat your password").fill("Sathish@1999");
await page.getByTestId("register-btn").click();
await expect (page).toHaveURL("https://eventhub.rahulshettyacademy.com/");
await page.getByRole("button", {name:'Logout'}).click();
expect (page).toHaveURL("https://eventhub.rahulshettyacademy.com/login"); */

//step-1
const email = "sathishps18@gmail.com";
const password = "Sathish@1999";
await page.goto("https://eventhub.rahulshettyacademy.com/login");
await page.getByPlaceholder("you@email.com").fill(email);
await page.getByLabel("Password").fill(password);
await page.locator("#login-btn").click();
await expect (page.getByText("Browse Events →")).toBeVisible();

//step-2
await page.getByRole('button', { name: 'Admin' }).click();
await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
const eventTitle = "Test Event ${Date.now()}";
await page.locator('#event-title-input').fill("New Christmas Event");
await page.locator("#admin-event-form textarea").fill("A Christmas Event is organised for the children.");
await page.getByLabel("Category*").selectOption('Festival');
await page.getByLabel('City*').fill('Hyderabad');
await page.getByLabel('Venue*').fill('Aston Church, Jubliee Hills, Hyderabad');
await page.getByLabel('Event Date & Time*').fill("2026-12-25T16:30");
await page.getByLabel('Price ($)*').fill("99");
await page.getByLabel('Total Seats*').fill("50");
await page.getByLabel('Image URL (optional)').fill("https://www.christmas.com");
await page.locator("#add-event-btn").click();
await expect (page.getByText("Event Created!")).toBeVisible();
console.log("Created event: '${eventTitle}'");

//step-3
await page.getByTestId('nav-events').click();
const allEvents = await page.getByTestId("event-card").allTextContents();
console.log('${allEvents}');
await expect (page.getByTestId("event-card").first()).toBeVisible();
const targetCard = await page.getByTestId("event-card").filter({hasText:'New Christmas Event'});
await expect(targetCard).toBeVisible({timeout:5000});

const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
console.log('Seats Before Booking: ${seatsseatsBeforeBooking}');

await targetCard.getByTestId('book-now-btn').click();








});