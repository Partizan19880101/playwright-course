import { test, expect } from "@playwright/test"
import { url } from "inspector";

test.skip("Product Page Add To Basket", async ({ page }) => {
    await page.goto("/")
    
    const addToBasketButton = page.locator("xpath=//button[@data-qa='product-button']").first();
    const basketCounter = page.locator("[data-qa=header-basket-count]");
    const checkoutLink = page.locator("xpath=//a[@href='/basket']").last();

    await addToBasketButton.waitFor();
    await expect(addToBasketButton).toHaveText("Add to Basket");
    await expect(basketCounter).toHaveText("0")

    await addToBasketButton.click();
    
    await expect(addToBasketButton).toHaveText("Remove from Basket");
    await expect(basketCounter).toHaveText("1")

    await checkoutLink.waitFor()
    await checkoutLink.click()

    await page.waitForURL("/basket")

    //await page.pause();
})
