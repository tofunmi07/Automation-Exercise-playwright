import { Locator, expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DetailsPage extends BasePage {
  name: Locator;
  category: Locator;
  price: Locator;
  availability: Locator;
  condition: Locator;
  brand: Locator;
  productDetails: Locator;
  productQuantity: Locator;
  addToCart: Locator;
  viewCart: Locator;

  constructor(page: Page) {
    super(page);
    this.name = page.locator("div[class='product-information'] h2");
    this.category = page.getByText("Category: Women > Tops");
    this.price = page.getByText("Rs. 500");
    this.availability = page.getByText(" In Stock");
    this.condition = page.getByText("New");
    this.brand = page.locator("p", { hasText: "Category:" });

    this.productDetails = page.locator(".product-information");
    this.productQuantity = page.locator("#quantity");
    this.addToCart = page.getByRole("button", { name: "Add to cart" });
    this.viewCart = page.getByText("View Cart", { exact: true });
  }

  async finalizeProduct(number: string) {
    await this.fillField(this.productQuantity, number);
    await this.clickElement(this.addToCart);
    await this.clickElement(this.viewCart);
  }
}
