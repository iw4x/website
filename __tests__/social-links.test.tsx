import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialLinks } from "@/components/social-links";
import { LINKS } from "@/lib/site-config";

const LABELS = { label: "Community", discord: "IW4x on Discord", github: "IW4x on GitHub" } as const;

function renderSocialLinks() {
  render(<SocialLinks labels={LABELS} />);

  return within(screen.getByRole("navigation", { name: LABELS.label }));
}

describe("SocialLinks", () => {
  it("groups the channels in a named navigation landmark", () => {
    const community = renderSocialLinks();

    expect(community.getAllByRole("listitem")).toHaveLength(2);
  });

  it.each([
    ["discord", LINKS.discord],
    ["github", LINKS.github],
  ] as const)("points %s at its public channel", (name, href) => {
    expect(renderSocialLinks().getByRole("link", { name: LABELS[name] })).toHaveAttribute("href", href);
  });

  it("names icon-only links for assistive technology", () => {
    const community = renderSocialLinks();

    for (const link of community.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      expect(link.textContent).toBe("");
    }
  });

  it("hides the decorative marks from the accessibility tree", () => {
    const { container } = render(<SocialLinks labels={LABELS} />);

    const marks = container.querySelectorAll("svg");

    expect(marks).toHaveLength(2);

    for (const mark of marks) {
      expect(mark).toHaveAttribute("aria-hidden", "true");
      expect(mark).toHaveAttribute("focusable", "false");
    }
  });

  it("reserves a 44 by 44 pixel target for each mark", () => {
    const community = renderSocialLinks();

    for (const link of community.getAllByRole("link")) {
      expect(link).toHaveClass("size-11");
    }
  });
});
