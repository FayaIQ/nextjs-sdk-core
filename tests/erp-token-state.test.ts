import { beforeEach, describe, expect, it } from "vitest";
import {
  configureErpTokenRuntime,
  getOrGenerateErpToken,
  InMemoryErpTokenStore,
} from "../src/erp-token-state";

describe("ERP commercial token window", () => {
  let now = 0;
  let issues = 0;

  beforeEach(() => {
    now = 1_000_000;
    issues = 0;
    configureErpTokenRuntime({
      tenantKey: "lavender",
      store: new InMemoryErpTokenStore(),
      now: () => now,
    });
  });

  const anonymous = () => getOrGenerateErpToken({
    browserId: "browser-a",
    authState: "anonymous" as const,
    actorId: "browser:browser-a",
    reason: "anonymous" as const,
    issue: async () => ({ accessToken: `token-${++issues}`, backendExpiresAt: now + 24 * 60 * 60 * 1000 }),
  });

  it("issues exactly one token for concurrent tabs and repeated access", async () => {
    const states = await Promise.all(Array.from({ length: 100 }, anonymous));
    expect(new Set(states.map((state) => state.accessToken))).toEqual(new Set(["token-1"]));
    expect(issues).toBe(1);
  });

  it("uses the same token through 02:59:59 and renews once at 03:00:00", async () => {
    const first = await anonymous();
    now = first.issuedAt + 3 * 60 * 60 * 1000 - 2;
    expect((await anonymous()).accessToken).toBe(first.accessToken);
    now += 1;
    expect((await anonymous()).accessToken).toBe(first.accessToken);
    now += 1;
    const states = await Promise.all(Array.from({ length: 100 }, anonymous));
    expect(new Set(states.map((state) => state.accessToken)).size).toBe(1);
    expect(states[0].accessToken).not.toBe(first.accessToken);
    expect(issues).toBe(2);
  });

  it("replaces an anonymous token once on login and keeps the authenticated actor", async () => {
    const anonymousState = await anonymous();
    const authenticated = await getOrGenerateErpToken({
      browserId: "browser-a",
      authState: "authenticated",
      actorId: "user:42",
      userId: "42",
      reason: "login",
      forceReplacement: true,
      issue: async () => ({ accessToken: `token-${++issues}`, backendExpiresAt: now + 24 * 60 * 60 * 1000 }),
    });
    expect(authenticated.accessToken).not.toBe(anonymousState.accessToken);
    expect(authenticated.actorId).toBe("user:42");
    expect(issues).toBe(2);
  });

  it("uses the dedicated bot lock/key, independent of browser identity", async () => {
    const states = await Promise.all(Array.from({ length: 100 }, (_, index) => getOrGenerateErpToken({
      browserId: "bot:google",
      authState: "anonymous" as const,
      actorId: "bot:google",
      reason: "bot" as const,
      lockKey: "lock:erp-token:bot:lavender:google",
      issue: async () => ({ accessToken: `bot-${++issues}`, backendExpiresAt: now + 24 * 60 * 60 * 1000 }),
    })));
    expect(new Set(states.map((state) => state.accessToken))).toEqual(new Set(["bot-1"]));
    expect(issues).toBe(1);
  });
});
