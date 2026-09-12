import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InteractiveTechStack from "../InteractiveTechStack";

describe("InteractiveTechStack Component", () => {
  it("renders tech stack category pills and items", () => {
    render(<InteractiveTechStack />);
    expect(screen.getByText(/03 — TECHNICAL RADAR/i)).toBeInTheDocument();
    expect(screen.getByText("Next.js & React 19")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /frontend/i })).toBeInTheDocument();
  });

  it("filters items by search input", () => {
    render(<InteractiveTechStack />);
    const searchInput = screen.getByLabelText(/filter technologies/i);
    fireEvent.change(searchInput, { target: { value: "Blender" } });
    
    expect(screen.getByText("Blender 3D")).toBeInTheDocument();
    expect(screen.queryByText("PHP & Laravel")).not.toBeInTheDocument();
  });

  it("filters items by category pill click", () => {
    render(<InteractiveTechStack />);
    const aiCategoryBtn = screen.getByRole("button", { name: /ai & vision/i });
    fireEvent.click(aiCategoryBtn);

    expect(screen.getByText("OpenCV")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.queryByText("Next.js & React 19")).not.toBeInTheDocument();
  });
});
