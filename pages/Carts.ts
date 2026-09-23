import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AddCart extends BasePage {
  cartTable: Locator;
  productRows: Locator;
  verifyClickCart: Locator;
  clickRegister: Locator;
  clickCartButton: Locator;
  clickProceedCheckout: Locator;
  verifyAddress: Locator;
  verifyOrder: Locator;
  comment: Locator;
  placeOrder: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = page.locator("#cart_info_table");
    this.productRows = page.locator("#cart_info_table tbody tr");
    this.verifyClickCart = page.getByText("Proceed To Checkout");
    this.clickRegister = page.getByText("Register / Login", { exact: true });

    this.clickCartButton = page.getByText("Cart", { exact: true });
    this.clickProceedCheckout = page.getByText("Proceed To Checkout", {
      exact: true,
    });

    this.verifyAddress = page.getByRole("heading", { name: "Address Details" });
    this.verifyOrder = page.getByRole("heading", { name: "Review Your Order" });
    this.comment = page.locator('[name="message"]');
    this.placeOrder = page.getByRole("link", { name: "Place Order" });
  }

  async getProductDetails(index: number) {
    const row = this.productRows.nth(index);
    return {
      name: await row.locator(".cart_description h4").textContent(),
      price: await row.locator(".cart_price p").textContent(),
      quantity: await row.locator(".cart_quantity button").textContent(),
      total: await row.locator(".cart_total p").textContent(),
    };
  }

  async gotoCheckout() {
    await this.clickElement(this.verifyClickCart);
    await this.clickElement(this.clickRegister);
  }

  async EnterCart() {
    await this.clickElement(this.clickCartButton);
  }

  async enterCheckout() {
    await this.clickElement(this.clickProceedCheckout);
  }

  async checkout(comment: string) {
    await this.fillField(this.comment, comment);
    await this.clickElement(this.placeOrder);
  }
}
