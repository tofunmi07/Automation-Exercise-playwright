# Automation Exercise – Playwright Test Suite

An end-to-end test automation project built against [Automation Exercise](https://automationexercise.com), a practice e-commerce site, using **Playwright with TypeScript** and the **Page Object Model**, structured around a shared `BasePage` class.

## What this project demonstrates

- A reusable `BasePage` class providing shared actions (click, fill, select, get text) and assertions (visibility, text match) that every page object inherits — changes to core interaction logic happen in one place and apply everywhere
- Page Object Model applied across multiple, genuinely distinct pages (Products, Product Detail, Cart, Registration/Checkout), not just a single login flow
- Multi-page user flows — registration through to checkout, spanning several pages in one continuous test
- Object-based method parameters with TypeScript interfaces (e.g. a `AccountDetails` interface) instead of long, error-prone parameter lists
- Correctness assertions, not just presence checks — e.g. search results are verified to actually match the search term, not just that a results page loaded

## Tech stack

- **Playwright** (TypeScript) — browser automation
- **Page Object Model** with a shared `BasePage` — test structure/design pattern
- **Playwright Test Runner** — test execution and reporting

## Test coverage

| Test Case | What it validates |
|---|---|
| TC08 | All Products page loads correctly, and clicking into a product shows a complete product detail page (name, category, price, availability, condition, brand) |
| TC09 | Product search returns results, and every returned product genuinely matches the search term |
| TC12 | A product can be added to the cart, and its details (name, price, quantity, total) appear correctly on the Cart page |
| TC14 | A new user can register mid-checkout, and their address details carry through correctly to the checkout page |

## Running it locally

```bash
npm install
npx playwright install
npx playwright test
