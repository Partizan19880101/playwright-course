import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";
import { isDesktopViewport } from "../utils/isDesktopVieport";

export class ProductPage {

    constructor(page) {
        this.page = page;

        this.addButton = page.locator('xpath=//button[@data-qa="product-button"]');
        this.dropDown = page.locator('[data-qa="sort-dropdown"]');
        this.procuctTitle = page.locator('[data-qa="product-title"]');
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index, ) => {
        const specificAddButton = this.addButton.nth(index);
        
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket");
        
        const navigation = new Navigation(this.page)

        let basketCountBeforeAdding
        if (isDesktopViewport(this.page)) {
            basketCountBeforeAdding = await navigation.getBasketCounter();
        }
        
        await specificAddButton.click();
        await expect(specificAddButton).toHaveText("Remove from Basket");

        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCounter();
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
        }
    }

    sortByCheapest = async () => {
        await this.dropDown.waitFor()
        // get order of products
        await this.procuctTitle.first().waitFor()
        const productTitlesBeforeSorting = await this.procuctTitle.allInnerTexts();

        await this.dropDown.selectOption("price-asc")
        // get order of products
        const productTitlesAfterSorting = await this.procuctTitle.allInnerTexts();
        // expect that these lists are different
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);
    }
}