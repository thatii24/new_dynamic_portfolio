import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServiceOfferings from "../ServiceOfferings";

describe("ServiceOfferings Component", () => {
  it("renders service cards and deliverables", () => {
    render(<ServiceOfferings />);
    expect(screen.getByText(/05 — SERVICE CAPABILITIES/i)).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Web Engineering")).toBeInTheDocument();
    expect(screen.getByText("UI/UX & Design Systems")).toBeInTheDocument();
    expect(screen.getByText("AI & Computer Vision Integration")).toBeInTheDocument();
    expect(screen.getByText("Creative 3D & Brand Identity")).toBeInTheDocument();
  });

  it("renders CTA links pointing to contact", () => {
    render(<ServiceOfferings />);
    const ctaLinks = screen.getAllByRole("link", { name: /start a project/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
    expect(ctaLinks[0]).toHaveAttribute("href", "/contact");
  });
});
