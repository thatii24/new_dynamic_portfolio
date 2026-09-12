import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SkillShowcase from "../SkillShowcase";

describe("SkillShowcase Component", () => {
  it("renders skills list and credentials panel", () => {
    render(<SkillShowcase />);
    expect(screen.getAllByText("Web Design").length).toBeGreaterThan(0);
    expect(screen.getByText("Mission Objective / Certificate")).toBeInTheDocument();
  });

  it("updates selected skill when clicked", () => {
    render(<SkillShowcase />);
    const uiSkill = screen.getAllByText("UI/UX Development")[0];
    fireEvent.click(uiSkill);
    expect(screen.getByText("Frontend Web Development Bootcamp")).toBeInTheDocument();
  });
});
