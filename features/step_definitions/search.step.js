const {Given, When, Then, Before, After} = require('cucumber');
const puppeteer = require('puppeteer');
// const expect = require('chai');
const { clickElement, getText } = require("../../lib/commands.js");

Given("user went to the website, chose tomorrow's date, movie and time", async function () {
    await this.page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(this.page, ".page-nav > a:nth-child(2)");
    await clickElement(this.page, "a.movie-seances__time");
});
  
When("user selects place", async function () {
    return await clickElement(this.page, '.buying-scheme__row > span:nth-child(6)');
});
When("user clicks the book button", async function () {
    return await clickElement(this.page, 'button.acceptin-button');
});
Then("user see text {string}", async function (string) {
    const actual = await getText(this.page, ".acceptin-button");
    const expected = await string;
    expect(actual).contains(expected);
});

When("user selects one place", async function (){
    return await clickElement(this.page, '.buying-scheme__row > span:nth-child(6)');
});
When("user selects two place", async function (){
    return await clickElement(this.page, '.buying-scheme__row > span:nth-child(7)');
});
When("user clicks the get booking code button", async function (){
    return await clickElement(this.page, "button.acceptin-button");
});
Then("user sees the QR code", async function () {
    const actual = await getText(this.page, ".ticket__hint");
    expect(actual).toContain('Покажите QR-код нашему контроллеру для подтверждения бронирования.');
});

Then("user sees that the ticket cannot be booked", async function () {
    expect(await this.page.$eval("button", (button) => { return button.disabled;})).toBe(true); 
});

Before(async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
});
After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});