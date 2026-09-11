import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/[lang]/page";
import { SITE } from "@/lib/site-config";

describe("Home page", () => {
  it("renders the site name as the only top-level heading", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: SITE.name })).toBeInTheDocument();
  });

  it("renders its heading inside the main landmark", () => {
    render(<Home />);

    expect(within(screen.getByRole("main")).getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
