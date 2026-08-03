import { expect, test } from "@playwright/test";

// This suite is run by the SDK consumer's integration pipeline. It exercises
// the real Next app because the SDK intentionally does not own an application
// server or an ERP test tenant.
test.describe("ERP browser identity", () => {
  test.skip(!process.env.PLAYWRIGHT_BASE_URL, "set PLAYWRIGHT_BASE_URL to run against the consumer Next app");

  test("anonymous tabs share an HttpOnly browser identity and token generation window", async ({ browser, baseURL }) => {
  const context = await browser.newContext();
  const first = await context.newPage();
  await first.goto(`${baseURL}/api/auth/token?initialize=1`);
  const firstStatus = await first.evaluate(async () => (await fetch("/api/auth/token")).json());

  const tabs = await Promise.all(Array.from({ length: 20 }, async () => {
    const page = await context.newPage();
    await page.goto(`${baseURL}/`);
    return page.evaluate(async () => (await fetch("/api/auth/token")).json());
  }));

  expect(firstStatus.initialized).toBe(true);
  expect(tabs.every((status) => status.generation === firstStatus.generation)).toBe(true);
  const cookies = await context.cookies();
  expect(cookies.find((cookie) => cookie.name === "erp_browser_id")?.httpOnly).toBe(true);
  expect(await first.evaluate(() => document.cookie.includes("erp_browser_id"))).toBe(false);
  await context.close();
  });

  test("prefetch never initializes a billable ERP token", async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/api/auth/token?initialize=1`, {
      headers: { Purpose: "prefetch", "Next-Router-Prefetch": "1" },
    });
    const status = await response.json();
    expect(status.initialized).toBe(false);
  });
});
