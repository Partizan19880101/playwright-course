import { test } from "@playwright/test"
import { v4 as uuidv4 } from "uuid";
import { ProductPage } from "../page-object/ProductPage"
import { Navigation } from "../page-object/Navigation"
import { Checkout } from "../page-object/Checkout"
import { LoginPage } from "../page-object/LoginPage"
import { RegisterPage } from "../page-object/RegisterPage"
import { DeliveryDetails } from "../page-object/DeliveryDetails"
import { deliveryDetails as userAddress } from "../data/deliveryDetails"
import { PaymentPage } from "../page-object/PaymentPage";
import { paymentDetails } from "../data/paymentDetails"; 

test("New user full end-to-end journey", async ({ page }) => {

    const productPage = new ProductPage(page)
    await productPage.visit();
    await productPage.sortByCheapest()

    await productPage.addProductToBasket(0);
    await productPage.addProductToBasket(1);
    await productPage.addProductToBasket(2);
    
    const navigation = new Navigation(page);
    await navigation.goToCheckout();

    const checkout = new Checkout(page)
    await checkout.removeChecapestProduct()
    await checkout.continueToCheckout()

    const login = new LoginPage(page)
    await login.moveToSignup()

    const registerPage = new RegisterPage(page)
    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    //await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(paymentDetails)
    await paymentPage.completePayment()
})

