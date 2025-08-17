
/* eslint-disable */

// __tests__/dashboard.test.tsx
import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Home from "@/pages/dashboard";
import "@testing-library/jest-dom";
import { renderWithStore } from "@/store/testUtils";

jest.mock("@/utils/theme", () => ({
  customerThemes: {
    globex: {
      logoPrimaryColor: "#123456",
      primaryColor: "#123456",
      accentColor: "#654321",
      name: "Globex",
    },
  },
}));

jest.mock("@/components/ProductCard", () => (props: any) => (
  <div data-testid="product-card">{props.product.name}</div>
));

describe("Dashboard Page", () => {
  const mockProducts = [
    { id: "1", name: "Product A", description: "Desc A" },
    { id: "2", name: "Product B", description: "Desc B" },
    { id: "3", name: "Another Item", description: "Desc C" },
  ];

  it("renders all products and badge count", () => {
    renderWithStore(<Home products={mockProducts} customerKey="globex" />, {
      preloadedState: {
        search: { keyword: "" },
        cart: { items: { "1": 1, "2": 2 } },
      },
    });

    expect(screen.getAllByTestId("product-card")).toHaveLength(3);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("filters products based on search keyword", () => {
    renderWithStore(<Home products={mockProducts} customerKey="globex" />, {
      preloadedState: {
        search: { keyword: "Product" },
        cart: { items: {} },
      },
    });

    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
    expect(screen.getByText("Showing 2 products")).toBeInTheDocument();
  });

  it("updates search keyword on input change", () => {
    renderWithStore(<Home products={mockProducts} customerKey="globex" />, {
      preloadedState: {
        search: { keyword: "" },
        cart: { items: {} },
      },
    });

    const input = screen.getByPlaceholderText("Search products...");
    fireEvent.change(input, { target: { value: "Another" } });

    expect(input).toHaveValue("Another");
  });
});
