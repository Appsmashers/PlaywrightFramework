import {test, expect, Page} from '@playwright/test'

test.only("Sign in to Ecart site",async function ({page}) {

    let productCount=0;
    
    await signIn(page);
    
    await verifyProductCount(page,productCount);

    await addProductToCart(page,"Hammer");
    
    await verifyProductCount(page,++productCount);

    await navigateToHome(page);
    
    await addProductToCart(page,"Bolt Cutters");

    await verifyProductCount(page,++productCount);
   
    
});

async function navigateToHome(page)
{
    const navbar=page.locator(".navbar-brand");
    await navbar.click();

    await expect(page.locator(".card-title").first()).toBeVisible();
}

async function naviagteToCart(page) {
    let cartCount=page.locator("#lblCartCount");
    await cartCount.click();

    await expect(page.locator(".step-indicator").first()).toBeVisible();  
}

async function verifyProductCount(page, productCount)
{
     let cartCount=page.locator("#lblCartCount");
    
     if(productCount==0){
        await expect(cartCount).not.toBeVisible();
        await expect(cartCount).toBeHidden();
     }
     else{
        await expect(cartCount).toBeVisible();
        await expect(cartCount).toHaveText(String(productCount));
     }

}

async function signIn(page) {
    await page.goto("https://practicesoftwaretesting.com/auth/login");
    await page.locator("#email").fill("customer2@practicesoftwaretesting.com");
    await page.locator("#password").fill("welcome01");
    await page.locator(".btnSubmit").click();
    await page.waitForTimeout(2000);
    await navigateToHome(page);
    //check irght user is logged in
    const userloggedIn=page.locator("#menu");
    await expect(userloggedIn).toHaveText("Jack Howe");
    
}
async function addProductToCart(page, productTobeAdded){
    const cards=page.locator(".card");
    await expect(page.locator(".card-title").filter({hasText:productTobeAdded}).first()).toBeVisible();
    const totalNoOfCards=await cards.count();
    console.log(totalNoOfCards);
    for(let i=0;i<totalNoOfCards;i++)
    {
        const productName=await cards.nth(i).locator(".card-title").textContent();
        if( productName.trim()=== productTobeAdded){
            
            await cards.nth(i).click();
            break;
        }
    }
    
    await page.locator("#btn-add-to-cart").click();
      //verify product message when product gets added
    const productAlertMsg=page.locator("[role='alert']");
    await expect(productAlertMsg).toHaveText("Product added to shopping cart.");
}