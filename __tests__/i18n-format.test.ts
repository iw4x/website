import { describe, expect, it } from "vitest";

import { fill } from "@/lib/i18n/format";

describe("fill", () => {
  it("substitutes a named placeholder", () => {
    expect(fill("Download {version}", { version: "r5123" })).toBe("Download r5123");
  });

  it("substitutes every occurrence", () => {
    expect(fill("{a} and {a}", { a: "x" })).toBe("x and x");
  });

  it("lets a translation put the placeholder anywhere", () => {
    expect(fill("{version} herunterladen", { version: "r5123" })).toBe("r5123 herunterladen");
  });

  it("leaves an unknown placeholder visible rather than printing undefined", () => {
    expect(fill("Download {version}", {})).toBe("Download {version}");
  });

  it("returns a template without placeholders untouched", () => {
    expect(fill("Download", { version: "r5123" })).toBe("Download");
  });
});
