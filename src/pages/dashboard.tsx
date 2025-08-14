import React from "react";
import {
  Box,
  Stack,
  TextField,
  Badge,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getSessionCustomer } from "../lib/auth";
import { customerThemes } from "@/utils/theme";
import ProductCard, { Product } from "@/components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearchKeyword } from "@/store/slices/searchSlice";
import { AppState, wrapper } from "@/store";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Server-side data fetching
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const customerKey = getSessionCustomer(req);
      if (!customerKey) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      let customerId = 1;
      if (customerKey === "globex") customerId = 2;

      const res = await fetch(
        `https://localhost:7187/api/products?customerId=${customerId}`,
        { cache: "no-store" }
      );
      const products = await res.json();
      store.dispatch(setSearchKeyword(""));

      return {
        props: {
          products: products,
          customerKey,
        },
      };
    }
);

interface HomeProps {
  customerKey: string;
  products: Product[];
}

export default function Home({ products, customerKey }: HomeProps) {
  const theme = customerThemes[customerKey ?? ""];
  const dispatch = useDispatch();
  const search = useSelector((state: AppState) => state.search.keyword);
  const cartItems = useSelector((state: AppState) => state.cart.items);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeyword(e.target.value));
  };

  const filteredProducts: Product[] = products.filter((p: Product) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          bgcolor: "#fff",
          py: 1,
          px: 3,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <TextField
            placeholder="Search products..."
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearchChange}
            sx={{
              width: "70%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": {
                  borderColor: theme?.logoPrimaryColor,
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: theme.logoPrimaryColor,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme?.logoPrimaryColor,
                },
              },
            }}
          />
          <Badge
            badgeContent={totalItems}
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "14px",
                height: "24px",
                minWidth: "24px",
              },
              cursor: "pointer",
              mr: 4,
            }}
          >
            <ShoppingCartIcon
              fontSize="large"
              sx={{ color: theme?.logoPrimaryColor }}
            />
          </Badge>
        </Stack>

        <Typography variant="body2" sx={{ mt: 1, ml: 1 }}>
          Showing {filteredProducts.length} products
        </Typography>
      </Box>

      <Box sx={{ overflowY: "auto", p: 3 }}>
        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {filteredProducts.map((product: Product) => (
            <div key={product.id}>
              <ProductCard product={product} customerKey={customerKey} />
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}
