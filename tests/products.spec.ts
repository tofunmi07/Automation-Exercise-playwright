import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/Products";
import { DetailsPage } from "../pages/ProductDetailsPage";
import { AddCart } from "../pages/Carts";
import { Register } from "../pages/register";
import { Payment } from "../pages/payments";

test("TC08: Verify all products and product details page", async ({ page }) => {
  const productsPage = new ProductPage(page);
  const detailsPage = new DetailsPage(page);

  await productsPage.navigate("http://automationexercise.com/");

  await productsPage.gotoProduct();
  await productsPage.expectVisible(productsPage.verifyProductPage);
  await productsPage.expectVisible(productsPage.productList);

  await productsPage.viewFirstProduct();
  await productsPage.expectVisible(productsPage.product1Page);

  await detailsPage.expectVisible(detailsPage.name);
  await detailsPage.expectVisible(detailsPage.category);
  await detailsPage.expectVisible(detailsPage.price);
  await detailsPage.expectVisible(detailsPage.availability);
  await detailsPage.expectVisible(detailsPage.condition);
  await detailsPage.expectVisible(detailsPage.brand);
});

test("TC09: Search Products", async ({ page }) => {
  const productsPage = new ProductPage(page);
  const searchTerm = "Tank Tops";

  await productsPage.navigate("http://automationexercise.com/");
  await productsPage.gotoProduct();
  await productsPage.expectVisible(productsPage.verifyProductPage);

  await productsPage.SearchProduct(searchTerm);
  await productsPage.expectVisible(productsPage.searchPage);
  await productsPage.expectVisible(productsPage.relatedResults);

  const names = await productsPage.relatedResults.allTextContents();
  console.log("Returned results", names);
});

test("TC12: Add products to Cart", async ({ page }) => {
  const productsPage = new ProductPage(page);
  const addcart = new AddCart(page);

  await productsPage.navigate("http://automationexercise.com/");
  await productsPage.gotoProduct();
  await productsPage.expectVisible(productsPage.verifyProductPage);

  await productsPage.AddToCart();

  await addcart.expectVisible(addcart.cartTable);

  const product = await addcart.getProductDetails(0);
  console.log("cart products details include:", product);
});

test("TC14: Place Order: Register while Checkout", async ({ page }) => {
  const productsPage = new ProductPage(page);
  const addcart = new AddCart(page);
  const register = new Register(page);
  const payment = new Payment(page);

  await productsPage.navigate("http://automationexercise.com/");
  await productsPage.AddToCart();
  await addcart.expectVisible(addcart.cartTable);
  await addcart.gotoCheckout();
  await register.signupPage("ocho", "ocho2121@yahoo.com");
  await register.accountInfo({
    password: "Test1234!",
    firstName: "Okafor",
    lastName: "Rashford",
    company: "Test Co",
    address: "1 Test Street",
    address2: "2, kokoro street",
    country: "United States",
    state: "Lagos",
    city: "Lagos",
    zipcode: "100001",
    mobileNumber: "08000000000",
  });
  await register.createAccountnow();
  await register.expectVisible(register.verifyAccountCreated);
  await register.accountVerificationPage();
  await register.expectVisible(register.whologged);
  await addcart.EnterCart();
  await addcart.expectVisible(addcart.verifyAddress);
  await addcart.expectVisible(addcart.verifyOrder);
  await addcart.checkout(
    "I want my order to specially packed and ready for shipment in 2 hours.",
  );
  await payment.fillCard({
    name: "Okafor rashford",
    number: "0923839920389830",
    cvc: "333",
    expireDate: "09",
    expireYear: "2030",
  });
  await payment.payNow();
  await payment.expectVisible(payment.confirmation);
  await payment.deleteAccount();
  await payment.expectVisible(payment.verifyDelete);
  await payment.confirmDelete();
});
