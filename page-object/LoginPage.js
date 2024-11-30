export class LoginPage {
    constructor(page) {
        this.page = page;

        this.email = page.locator('[placeholder="E-Mail"]');
        this.password = page.locator('[placeholder="Password"]');
        this.login = page.locator('[type="submit"]');
        this.moveToSignupButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    moveToSignup = async () => {
        await this.moveToSignupButton.waitFor()
        await this.moveToSignupButton.click()
        this.page.waitForURL(/\/signup/, {timeout: 3000})
    }
}