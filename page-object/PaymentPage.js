import { expect } from "@playwright/test"
import { paymentDetails } from "../data/paymentDetails"

export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.locator('[data-qa="discount-code-input"]')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.activateDiscountMessage = page.locator('[data-qa="discount-active-message"]')
        this.discountValue = page.locator('[data-qa="total-with-discount-value"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.creditCardOwner = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumber = page.locator('[data-qa="credit-card-number"]')
        this.validUntill = page.locator('[data-qa="valid-until"]')
        this.creditCardCSV = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
        
        await this.discountInput.fill(code)
        // await expect(this.discountInput).toHaveValue(code)

        //await this.discountInput.evaluate(input => input.blur());

        // Option 2 for laggy inputs: slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        //await expect(this.discountInput).toHaveValue(code)

        expect(await this.discountValue.isVisible()).toBe(false)
        expect(await this.activateDiscountMessage.isVisible()).toBe(false)

        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()

        await this.activateDiscountMessage.waitFor()

        await this.discountValue.waitFor()
        const discountValueText = await this.discountValue.innerText()
        const discoutValueOnlyStringNumber = discountValueText.replace("$", "")
        const discoutValueNumber = parseInt(discoutValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyStringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)

        expect(discoutValueNumber).toBeLessThan(totalValueNumber)
    }

    fillPaymentDetails = async (paymentDetails) => {
        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(paymentDetails.owner)

        await this.creditCardNumber.waitFor()
        await this.creditCardNumber.fill(paymentDetails.number)

        await this.validUntill.waitFor()
        await this.validUntill.fill(paymentDetails.valideUntil)

        await this.creditCardCSV.waitFor()
        await this.creditCardCSV.fill(paymentDetails.cvc)
    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
    }
}