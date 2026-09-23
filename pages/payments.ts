import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

interface cardDetails {
  name: string;
  number: string;
  cvc: string;
  expireDate: string;
  expireYear: string;
}

export class Payment extends BasePage {
  cardName: Locator;
  cardNumber: Locator;
  cardcvc: Locator;
  cardExpireDate: Locator;
  expiryYear: Locator;
  clickPay: Locator;
  confirmation: Locator;
  clickDelete: Locator;
  verifyDelete: Locator;
  clickContinue: Locator;

  constructor(page: Page) {
    super(page);
    this.cardName = page.locator('[name="name_on_card"]');
    this.cardNumber = page.locator('[name="card_number"]');
    this.cardcvc = page.getByTestId("cvc");
    this.cardExpireDate = page.getByRole("textbox", { name: "MM" });
    this.expiryYear = page.getByRole("textbox", { name: "YYYY" });

    this.clickPay = page.getByRole("button", { name: "Pay and Confirm Order" });

    this.confirmation = page.getByText(
      "Congratulations! Your order has been confirmed!",
      { exact: true },
    );

    this.clickDelete = page.getByRole("link", { name: "Delete Account" });
    this.verifyDelete = page.locator(
      "//b[normalize-space()='Account Deleted!']",
    );
    this.clickContinue = page.getByRole("link", { name: "Continue" });
  }

  async fillCard(details: cardDetails) {
    await this.fillField(this.cardName, details.name);
    await this.fillField(this.cardNumber, details.number);
    await this.fillField(this.cardcvc, details.cvc);
    await this.fillField(this.cardExpireDate, details.expireDate);
    await this.fillField(this.expiryYear, details.expireYear);
  }

  async payNow() {
    await this.clickElement(this.clickPay);
  }

  async deleteAccount() {
    await this.clickElement(this.clickDelete);
  }

  async confirmDelete() {
    await this.clickElement(this.clickContinue);
  }
}
