import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActionLink } from "@/components/ui/action-link";

describe("ActionLink", () => {
  it("renders a link rather than a button, because it navigates", () => {
    render(
      <ActionLink href="https://example.com/" variant="primary">
        Download
      </ActionLink>,
    );

    expect(screen.getByRole("link", { name: "Download" })).toHaveAttribute("href", "https://example.com/");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("reserves a target taller than the 44 pixel minimum", () => {
    render(
      <ActionLink href="/a" variant="primary">
        Download
      </ActionLink>,
    );

    expect(screen.getByRole("link")).toHaveClass("min-h-12");
  });

  it("carries Inter's body tracking", () => {
    render(
      <ActionLink href="/a" variant="secondary">
        Docs
      </ActionLink>,
    );

    expect(screen.getByRole("link")).toHaveClass("tracking-body");
  });

  it.each([
    ["primary", "bg-accent", "text-accent-ink"],
    ["secondary", "bg-transparent", "text-foreground"],
  ] as const)("dresses the %s variant distinctly", (variant, background, foreground) => {
    render(
      <ActionLink href="/a" variant={variant}>
        Label
      </ActionLink>,
    );

    expect(screen.getByRole("link")).toHaveClass(background, foreground);
  });

  it("changes the primary hover with fill alone, adding no ring, shadow or underline", () => {
    render(
      <ActionLink href="/a" variant="primary">
        Download
      </ActionLink>,
    );

    const classes = screen.getByRole("link").className;

    expect(classes).toContain("hover:bg-accent-hover");

    for (const decoration of ["shadow", "underline", "scale", "translate"]) {
      expect(classes).not.toContain(decoration);
    }
  });

  it("wraps instead of overflowing when the row runs out of room", () => {
    render(
      <ActionLink href="/a" variant="primary">
        Download
      </ActionLink>,
    );

    expect(screen.getByRole("link")).toHaveClass("flex-1", "basis-40");
  });
});
