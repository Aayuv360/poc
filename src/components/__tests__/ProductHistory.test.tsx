import React from "react";
import { render, screen } from "@testing-library/react";
import ProductHistory from "../ProductHistory"; 
import { customerThemes } from "@/utils/theme";

describe("ProductHistory Component", () => {
  it("renders table headers correctly", () => {
    render(<ProductHistory customerKey="acme" />);
    expect(screen.getByText(/Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Availability/i)).toBeInTheDocument();
  });

  it("renders all product rows", () => {
    render(<ProductHistory customerKey="acme" />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(6);
  });


  it("applies the correct theme color based on customerKey", () => {
    render(<ProductHistory customerKey="globex" />);
    const themedHeaderCell = screen.getByText("Product").closest("th");
    const expectedColor = customerThemes["globex"].primaryColor;
    expect(themedHeaderCell).toHaveStyle(`color: ${expectedColor}`);
  });

  it("falls back gracefully if customerKey is missing", () => {
    render(<ProductHistory customerKey="unknown" />);
    expect(screen.getByText("Product")).toBeInTheDocument();
  });
});
