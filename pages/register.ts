import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

interface AccountDetails {
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class Register extends BasePage {
  username: Locator;
  email: Locator;
  signup: Locator;
  password: Locator;
  firstname: Locator;
  lastname: Locator;
  company: Locator;
  address: Locator;
  address2: Locator;
  country: Locator;
  state: Locator;
  city: Locator;
  zipcode: Locator;
  mobile: Locator;
  createAccount: Locator;
  verifyAccountCreated: Locator;
  continueButton: Locator;
  whologged: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByRole("textbox", { name: "Name" });
    this.email = page.getByTestId("signup-email");
    this.signup = page.getByRole("button", { name: "Signup" });

    this.password = page.locator("#password");
    this.firstname = page.locator("#first_name");
    this.lastname = page.locator("#last_name");
    this.company = page.getByLabel("Company", { exact: true });
    this.address = page.getByRole("textbox", {
      name: "Address * (Street address, P.O. Box, Company name, etc.)",
    });
    this.address2 = page.getByRole("textbox", { name: "Address 2" });
    this.country = page.locator("#country");
    this.state = page.locator("#state");
    this.city = page.locator("#city");
    this.zipcode = page.locator("#zipcode");
    this.mobile = page.locator("#mobile_number");
    this.createAccount = page.getByRole("button", { name: "Create Account" });

    this.verifyAccountCreated = page.locator('b:has-text("ACCOUNT CREATED!")');
    this.continueButton = page.getByRole("link", { name: "Continue" });
    this.whologged = page.getByText("Logged in as ocho", {
      exact: true,
    });
  }

  async signupPage(username: string, email: string) {
    await this.fillField(this.username, username);
    await this.fillField(this.email, email);
    await this.clickElement(this.signup);
  }

  async accountInfo(details: AccountDetails) {
    await this.fillField(this.password, details.password);
    await this.fillField(this.firstname, details.firstName);
    await this.fillField(this.lastname, details.lastName);
    await this.fillField(this.company, details.company);
    await this.fillField(this.address, details.address);
    await this.fillField(this.address2, details.address2);
    await this.selectOption(this.country, "United States");
    await this.fillField(this.state, details.state);
    await this.fillField(this.city, details.city);
    await this.fillField(this.zipcode, details.zipcode);
    await this.fillField(this.mobile, details.mobileNumber);
  }

  async createAccountnow() {
    await this.clickElement(this.createAccount);
  }

  async accountVerificationPage() {
    await this.clickElement(this.continueButton);
  }
}
