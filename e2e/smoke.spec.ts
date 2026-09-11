import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("home page renders without client-side errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    const response = await page.goto("/");

    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page).toHaveTitle("IW4x");
    await expect(page.getByRole("main")).toBeAttached();
    expect(errors).toEqual([]);
  });

  test("unknown routes respond with 404", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");

    expect(response?.status()).toBe(404);
  });
});
