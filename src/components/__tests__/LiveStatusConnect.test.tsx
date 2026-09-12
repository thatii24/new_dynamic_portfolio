import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LiveStatusConnect from "../LiveStatusConnect";

describe("LiveStatusConnect Component", () => {
  it("renders live status indicator and quick actions", () => {
    render(<LiveStatusConnect />);
    expect(screen.getByText(/Available For Worldwide Contracts/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /book discovery chat/i })).toBeInTheDocument();
  });

  it("handles copying email to clipboard", async () => {
    render(<LiveStatusConnect />);
    const copyBtn = screen.getByRole("button", { name: /copy email address/i });
    expect(copyBtn).toBeInTheDocument();

    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(screen.getByText(/Email Copied to Clipboard!/i)).toBeInTheDocument();
    });
  });
});
