import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MAIN_CONTENT_ID, SkipLink } from "@/components/skip-link";

describe("SkipLink", () => {
  it("links to the main content", () => {
    render(<SkipLink label="Skip to main content" />);

    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", `#${MAIN_CONTENT_ID}`);
  });

  it("stays out of view until focused", () => {
    render(<SkipLink label="Skip to main content" />);

    const link = screen.getByRole("link");

    expect(link).toHaveClass("sr-only", "focus:not-sr-only");
  });

  it("becomes a target of at least 44 by 44 pixels when focused", () => {
    render(<SkipLink label="Skip to main content" />);

    expect(screen.getByRole("link")).toHaveClass("focus:min-h-11", "focus:min-w-11");
  });
});
