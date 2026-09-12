import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ExperienceTimeline from "../ExperienceTimeline";

describe("ExperienceTimeline Component", () => {
  it("renders timeline milestones and filters", () => {
    render(<ExperienceTimeline />);
    expect(screen.getByText(/04 — JOURNEY & MILESTONES/i)).toBeInTheDocument();
    expect(screen.getByText(/B.Sc. in Computer Science/i)).toBeInTheDocument();
    expect(screen.getByText(/Lead UI\/UX Designer/i)).toBeInTheDocument();
  });

  it("filters milestones by category", () => {
    render(<ExperienceTimeline />);
    const educationFilter = screen.getByRole("button", { name: /education/i });
    fireEvent.click(educationFilter);

    expect(screen.getByText(/Eastern University, Sri Lanka/i)).toBeInTheDocument();
    expect(screen.queryByText(/Lead UI\/UX Designer/i)).not.toBeInTheDocument();
  });

  it("toggles expanded highlights when milestone card is clicked", () => {
    render(<ExperienceTimeline />);
    const card = screen.getByText(/Lead UI\/UX Designer/i);
    fireEvent.click(card);

    expect(screen.getAllByText(/Key Highlights & Impact:/i).length).toBeGreaterThan(0);
  });
});
