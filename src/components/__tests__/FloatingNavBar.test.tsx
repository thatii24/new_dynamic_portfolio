import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FloatingNavBar from "../FloatingNavBar";

describe("FloatingNavBar Component", () => {
  it("renders desktop section navigation items correctly", () => {
    render(<FloatingNavBar />);
    expect(screen.getByRole("navigation", { name: /section navigation/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /home/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /projects/i }).length).toBeGreaterThan(0);
  });

  it("toggles mobile menu when trigger button is clicked", () => {
    render(<FloatingNavBar />);
    const trigger = screen.getByRole("button", { name: /open navigation menu/i });
    expect(trigger).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByRole("complementary", { name: /mobile navigation/i })).toBeInTheDocument();
  });

  it("renders profile avatar trigger", () => {
    render(<FloatingNavBar />);
    expect(screen.getByRole("button", { name: /thatila wijayathunga profile/i })).toBeInTheDocument();
  });
});
