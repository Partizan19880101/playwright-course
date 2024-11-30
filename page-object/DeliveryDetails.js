import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.addressStreetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postCodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.deliveryCityInput = page.locator('[data-qa="delivery-city"]')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]')
        this.countryDropDown = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]')

        this.saveAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.saveAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.saveAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.saveAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.saveAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.saveAddressCountry = page.locator('[data-qa="saved-address-country"]')
    }

    fillDetails = async (userAddress) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)
        await this.addressStreetInput.waitFor()
        await this.addressStreetInput.fill(userAddress.street)
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill(userAddress.postcode)
        await this.deliveryCityInput.waitFor()
        await this.deliveryCityInput.fill(userAddress.city)

        await this.countryDropDown.waitFor()
        await this.countryDropDown.selectOption(userAddress.country)
    }

    saveDetails = async () => {
        const addressCountBeforeSaving = await this.saveAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await this.saveAddressContainer.waitFor()
        
        await expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1);

        await this.saveAddressFirstName.first().waitFor()
        expect(await this.saveAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())

        await this.saveAddressLastName.first().waitFor()
        expect(await this.saveAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())

        await this.saveAddressStreet.first().waitFor()
        expect(await this.saveAddressStreet.first().innerText()).toBe(await this.addressStreetInput.inputValue())

        await this.saveAddressPostcode.first().waitFor()
        expect(await this.saveAddressPostcode.first().innerText()).toBe(await this.postCodeInput.inputValue())

        await this.saveAddressCity.first().waitFor()
        expect(await this.saveAddressCity.first().innerText()).toBe(await this.deliveryCityInput.inputValue())

        await this.saveAddressCountry.first().waitFor()
        expect(await this.saveAddressCountry.first().innerText()).toBe(await this.countryDropDown.inputValue())
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })
        //await this.page.pause()
    }
}