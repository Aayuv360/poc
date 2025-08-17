import React from "react";
import {  screen } from "@testing-library/react";
import { renderWithStore } from "@/store/testUtils";
import ProductCard, { Product } from "@/components/ProductCard";


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

describe("ProductCard Component", () => {
  const mockProduct: Product = {
    id: "101",
    name: "Test Laptop",
    description: "A great laptop",
    price: 999.99,
    imageUrl: "/test.jpg",
    customerId: 2,
  };

  it("renders product name, description and price", () => {
    renderWithStore(<ProductCard product={mockProduct} customerKey="globex" />, {
      preloadedState: {
        cart: {
          items: {},
        },
      },
    });

    expect(screen.getByText("Test Laptop")).toBeInTheDocument();
    expect(screen.getByText("A great laptop")).toBeInTheDocument();
    expect(screen.getByText("$999.99")).toBeInTheDocument();
  });

  it("shows 'Add to Cart' button when quantity is 0", () => {
    renderWithStore(<ProductCard product={mockProduct} customerKey="globex" />, {
      preloadedState: {
        cart: {
          items: {},
        },
      },
    });

    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });

  it("shows button group when quantity is > 0", () => {
    renderWithStore(<ProductCard product={mockProduct} customerKey="globex" />, {
      preloadedState: {
        cart: {
          items: {
            "101": 2,
          },
        },
      },
    });

    expect(screen.getByText("2")).toBeInTheDocument(); 
    expect(screen.getAllByRole("button")).toHaveLength(3); 
  });


});
