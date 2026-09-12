import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectCarousel from "../ProjectCarousel";

describe("ProjectCarousel Component", () => {
  it("renders carousel and projects", () => {
    render(<ProjectCarousel />);
    expect(screen.getByText("Veloce Bikes")).toBeInTheDocument();
    expect(screen.getByText("Woodcraft")).toBeInTheDocument();
    expect(screen.getByText("Ursanic")).toBeInTheDocument();
  });

  it("navigates through projects using next and prev buttons", () => {
    render(<ProjectCarousel />);
    const nextBtn = screen.getByRole("button", { name: /next project/i });
    const prevBtn = screen.getByRole("button", { name: /previous project/i });

    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn).toBeInTheDocument();

    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);
  });
});
