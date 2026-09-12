import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Wordmark } from "@/components/brand/wordmark";
import { SITE } from "@/lib/site-config";

describe("Wordmark", () => {
  it("reads as the site name despite the two-tone setting", () => {
    render(<Wordmark />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(SITE.name);
  });

  it("accents only the final letter", () => {
    const { container } = render(<Wordmark />);

    const accented = container.querySelectorAll(".text-accent-text");

    expect(accented).toHaveLength(1);
    expect(accented[0]).toHaveTextContent(SITE.name.slice(-1));
  });

  it("applies Inter's display tracking rather than shouting in capitals", () => {
    render(<Wordmark />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveClass("tracking-display", "text-display");
    expect(heading.className).not.toContain("uppercase");
  });
});
