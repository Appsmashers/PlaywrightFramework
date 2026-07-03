import {test, expect} from '@playwright/test'


test("Login into my app using page",async function({page})
{

await page.goto("https://demoqa.com/login");

await page.locator("#userName").fill("appssmashers@gmail.com");

await page.locator("input#password").fill("Practice@123");

await page.locator("button[id='login']").click();

//await page.locator("#gotoStore").isVisible();

await expect(page.locator("#gotoStore")).toBeVisible();

//await page.locator("#gotoStore").waitFor('networkidle');

await page.locator(".element-group").first().click();

await page.locator("#item-8").first().click();

console.log(await page.locator("#visibleAfter").textContent());

});

test("handle drop down using playwright", async function({page}) {
    
await page.goto("https://practice.expandtesting.com/dropdown");

//value

const countryDropDown=page.locator("#country");

await countryDropDown.selectOption("AF");

await expect(countryDropDown).toHaveValue("AF");

await expect(countryDropDown.locator("option:checked")).toHaveText("Afghanistan");

await page.waitForTimeout(2000);

//label or display text on screen

await countryDropDown.selectOption({label:"Canada"});

await expect(countryDropDown).toHaveValue("CA");

await expect(countryDropDown.locator("option:checked")).toHaveText("Canada");
await page.waitForTimeout(2000);
//index

await countryDropDown.selectOption({index:3});

await expect(countryDropDown).toHaveValue("AL");

await expect(countryDropDown.locator("option:checked")).toHaveText("Albania");
await page.waitForTimeout(2000);


});


test("Select radio button test",async function({page})
{
await page.goto("https://demoqa.com/radio-button");

await page.waitForTimeout(2000);

const yesRadioBtn=page.locator("#yesRadio");

yesRadioBtn.click();

await expect(yesRadioBtn).toBeChecked();

await expect(page.locator("#impressiveRadio")).not.toBeChecked();

await expect(page.locator(".text-success")).toContainText("Yes");

await page.waitForTimeout(2000);

await page.locator("#impressiveRadio").click();

await page.waitForTimeout(2000);
});

test("handle multiple tabs", async function({page,context})
{

await page.goto("https://demoqa.com/browser-windows");

const [newPage]=await Promise.all([
    context.waitForEvent("page"),
    page.locator("#tabButton").click()
]);

await expect(newPage.locator("#sampleHeading")).toHaveText("This is a sample page");


});

test("handle multiple tabs 2", async function ({page, context}) {

    await page.goto("https://playwright.dev/")

    const [newPage]= await Promise.all([
        context.waitForEvent("page"),

        page.locator('[href*="stackoverflow.com"]').click()
    ])
    
    await expect(newPage).toHaveURL("https://stackoverflow.com/questions/tagged/playwright");
})

//heading text
//image/log0- correct image source
//textbox
//correct url - link
//attributes 

test("extract element data in playwright", async function ({page}) {

    await page.goto("https://playwright.dev/");

    const heading=await page.locator("h1").textContent();

    console.log(heading);
    
    const logo=page.locator(".navbar__logo img");

    await expect(logo).toHaveAttribute("alt","Playwright logo");

    await expect(logo).toHaveAttribute("src","/img/playwright-logo.svg");

    const searchBox=page.locator(".DocSearch-Button-Placeholder");

    await searchBox.click();

    const searchInputBox=page.locator("#docsearch-input");

    await expect(searchInputBox).toHaveAttribute("placeholder","Search docs");

    const testText="Sample text"

    await searchInputBox.fill(testText);

    const inputValue=await searchInputBox.inputValue();

    await expect(inputValue).toBe(testText);
    
});



