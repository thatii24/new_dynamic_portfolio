import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutExpertise from "../AboutExpertise";

describe("AboutExpertise Component", () => {
  it("renders about narrative and signature", () => {
    render(<AboutExpertise />);
    expect(screen.getByText(/From Code to Intelligent Systems/i)).toBeInTheDocument();
    expect(screen.getByText("Thatila")).toBeInTheDocument();
  });

  it("renders feature cards and core capabilities", () => {
    render(<AboutExpertise />);
    expect(screen.getByText("AI & Problem Solving")).toBeInTheDocument();
    expect(screen.getAllByText("Full-Stack Development").length).toBeGreaterThan(0);
    expect(screen.getByText("Computer Vision")).toBeInTheDocument();
  });
});
