import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TestimonialMarquee from "../TestimonialMarquee";

describe("TestimonialMarquee Component", () => {
  it("renders client testimonials and rating indicators", () => {
    render(<TestimonialMarquee />);
    expect(screen.getByText(/06 — CLIENT ENDORSEMENTS/i)).toBeInTheDocument();
    expect(screen.getByText(/5.0 \/ 5.0 Average Rating/i)).toBeInTheDocument();
    expect(screen.getAllByText("Alexandre Mercier").length).toBeGreaterThan(0);
  });

  it("cycles to next testimonial on arrow button click", () => {
    render(<TestimonialMarquee />);
    const nextBtn = screen.getByRole("button", { name: /next testimonial/i });
    fireEvent.click(nextBtn);

    expect(screen.getAllByText("David Sterling").length).toBeGreaterThan(0);
  });
});
