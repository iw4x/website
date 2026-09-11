import { afterEach, describe, expect, it, vi } from "vitest";

const languages = vi.hoisted(() => vi.fn());
const match = vi.hoisted(() => vi.fn());

vi.mock("negotiator", () => ({
  default: class {
    languages = languages;
  },
}));

vi.mock("@formatjs/intl-localematcher", () => ({ match }));

const { negotiateTag } = await import("@/lib/i18n/negotiate");

afterEach(() => {
  vi.clearAllMocks();
});

describe("negotiateTag defensive paths", () => {
  it("falls back when the header parser throws", () => {
    languages.mockImplementation(() => {
      throw new Error("malformed header");
    });

    expect(negotiateTag("garbage", ["en", "fr"], "en")).toBe("en");
  });

  it("falls back when the locale matcher throws", () => {
    languages.mockReturnValue(["en_US"]);
    match.mockImplementation(() => {
      throw new RangeError("Incorrect locale information provided");
    });

    expect(negotiateTag("en_US", ["en", "fr"], "en")).toBe("en");
  });

  it("falls back when the parser reports no preference", () => {
    languages.mockReturnValue([]);

    expect(negotiateTag("something", ["en", "fr"], "en")).toBe("en");
    expect(match).not.toHaveBeenCalled();
  });
});
