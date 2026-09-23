import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  productClick: Locator;
  verifyProductPage: Locator;
  productList: Locator;
  clickProduct1: Locator;
  product1Page: Locator;
  searchBar: Locator;
  searchClick: Locator;
  searchPage: Locator;
  relatedResults: Locator;
  product1: Locator;
  continueShopping: Locator;
  product2: Locator;
  viewCart: Locator;

  constructor(page: Page) {
    super(page);
    this.productClick = page.locator("//a[@href='/products']");
    this.verifyProductPage = page.getByText("All Products");
    this.productList = page.locator("//div[@class='features_items']");
    this.clickProduct1 = page.locator("a[href='/product_details/1']");
    this.product1Page = page.locator("//div[@class='product-information']");
    this.searchBar = page.locator("#search_product");
    this.searchClick = page.locator("#submit_search");
    this.searchPage = page.getByText("Searched Products");
    this.relatedResults = page.locator("//div[@class='features_items']");

    this.product1 = page
      .locator("a")
      .filter({ hasText: "Add to cart" })
      .first();
    this.continueShopping = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.product2 = page
      .locator("a")
      .filter({ hasText: "Add to cart" })
      .first();
    this.viewCart = page.locator("//u[normalize-space()='View Cart']");
  }

  async gotoProduct() {
    await this.clickElement(this.productClick);
  }

  async viewFirstProduct() {
    await this.clickElement(this.clickProduct1);
  }

  async SearchProduct(productName: string) {
    await this.fillField(this.searchBar, productName);
    await this.clickElement(this.searchClick);
  }

  async AddToCart() {
    await this.clickElement(this.product1);
    await this.clickElement(this.continueShopping);
    await this.clickElement(this.product2);
    await this.clickElement(this.viewCart);
  }
}
