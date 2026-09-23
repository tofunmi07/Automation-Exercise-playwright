import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Homepage extends BasePage {
  verifySub: Locator;
  inputEmail: Locator;
  clickArrow: Locator;
  subSuccess: Locator;
  viewProduct: Locator;

  constructor(page: Page) {
    super(page);
    this.verifySub = page.getByRole("heading", { name: "Subscription" });
    this.inputEmail = page.getByRole("textbox", { name: "Your email address" });
    this.clickArrow = page.locator("#subscribe");
    this.subSuccess = page.getByText("You have been successfully subscribed!", {
      exact: true,
    });

    this.viewProduct = page.locator("a[href='/product_details/3']");
  }

  async subscription(email: string) {
    await this.fillField(this.inputEmail, email);
    await this.clickElement(this.clickArrow);
  }

  async clickProduct() {
    await this.clickElement(this.viewProduct);
  }
}
