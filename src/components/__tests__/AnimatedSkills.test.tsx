import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AnimatedSkills from "../AnimatedSkills";

describe("AnimatedSkills Component", () => {
  it("renders skills branding banner and software icons", () => {
    render(<AnimatedSkills />);
    expect(screen.getByText("sk")).toBeInTheDocument();
    expect(screen.getByText("ills")).toBeInTheDocument();
    expect(screen.getByAltText("Photoshop")).toBeInTheDocument();
    expect(screen.getByAltText("Figma")).toBeInTheDocument();
  });
});
