export class Checkout {
    constructor(page) {
        this.page = page;

        this.basketCards = page.locator('[data-qa="basket-card"]');
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueTo = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeChecapestProduct = async () => {
        await this.basketCards.first().waitFor();
        const itemsBeforeRemoval = await this.basketCards.count();

        await this.basketItemPrice.first().waitFor();
        const allPricesText = await this.basketItemPrice.allInnerTexts()
        //console.warn({allPricesText});
        const justNumbers = allPricesText.map((element) => {
            const withoutDollarSign = element.replace("$", "");
            return parseInt(withoutDollarSign);
            
        })
        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceInd = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceInd)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()

        //const numberOfBasketCards = await this.basketCards.count();
        //await expect(numberOfBasketCards).toHaveCount(itemsBeforeRemoval - 1)
    }

    continueToCheckout = async () => {
        await this.continueTo.waitFor()
        await this.continueTo.click()
        await this.page.waitForURL("/login?redirect=/delivery-details", {timeout: 3000})
    }
}