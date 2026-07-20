const {test, expect} = require ('@playwright/test')

test('event booking practice website', async ({page}) => {

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
const email = "test1999@gmail.com";
const password = "Test@123";
await page.goto("https://eventhub.rahulshettyacademy.com/login");
await page.getByPlaceholder("you@email.com").fill(email);
await page.getByLabel("Password").fill(password);
await page.locator("#login-btn").click();
await expect(page.getByText("Browse Events →")).toBeVisible();

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
await expect(page.getByText("Event Created!")).toBeVisible();
console.log("Created event: '${eventTitle}'");

//step-3
await page.getByTestId('nav-events').click();
const allEvents = page.getByTestId("event-card");
await expect(allEvents.first()).toBeVisible();
const targetCard = allEvents.filter({hasText:'New Christmas Event'}).first();
await expect(targetCard).toBeVisible({timeout:5000});

const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
console.log('Seats Before Booking: ${seatsBeforeBooking}');

//step-4
await targetCard.getByTestId('book-now-btn').click();

//step-5
await expect(page.locator("#ticket-count")).toHaveText("1");
await page.getByLabel("Full Name*").fill("Sathish");
await page.locator("#customer-email").fill(email);
await page.getByPlaceholder("+91 98765 43210").fill("8077807433");
await page.locator(".confirm-booking-btn").click();

//step-6
await expect(page.getByText("Booking Confirmed! 🎉")).toBeVisible();
const bookingRefId =  page.locator(".booking-ref").first();
await expect(bookingRefId).toBeVisible();
const bookingRef = (await bookingRefId.innerText()).trim();
console.log("Booking confirmed. Ref: ${bookingRef}");

//step-7
await page.getByRole("link", {name: "View My Bookings"}).click();
await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
const bookingCard = page.locator("#booking-card");
await expect(bookingCard.first()).toBeVisible();
const matchingCard = bookingCard.filter({has: page.locator('.booking-ref', {hasText: bookingRef}) });
await expect(matchingCard).toBeVisible();


//step-8
await page.getByTestId("nav-events").click();
const updatedCard = page.getByTestId("event-card").filter({hasText:'New Christmas Event'}).first();
await expect(updatedCard).toBeVisible();

const seatsAfterBooking = parseInt(await updatedCard.getByText('seat').first().innerText());
console.log('Seats after booking: ${seatsAfterBooking}');

//expect(seatsBeforeBooking).toBe(seatsAfterBooking + 1);

});