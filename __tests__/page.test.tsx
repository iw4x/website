import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home page", () => {
  it("renders an empty main landmark", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toBeEmptyDOMElement();
  });
});
