import React, { useState } from "react";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Button,
  ButtonGroup,
  Rating,
  Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { customerThemes } from "@/utils/theme";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
import { AppState } from "@/store";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  price?: number;
  oldPrice?: number;
  customerId?: number;
}

interface Props {
  product: Product;
  customerKey: string;
}

export default function ProductCard({ product, customerKey }: Props) {
  const theme = customerThemes[customerKey ?? ""];
  const primaryColor = theme?.primaryColor ?? "";

  const [hover, setHover] = useState(false);

 
const dispatch = useDispatch();
const cartQuantity = useSelector(
  (state: AppState) => state.cart.items[product.id] || 0
);

const handleIncrement = () => dispatch(addToCart(product.id));
const handleDecrement = () => dispatch(removeFromCart(product.id));

  return (
    <Card
      sx={{
        height: "auto",
        //display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 4,
          borderRadius: 2,
        },
        position: "relative",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        sx={{
          overflow: "hidden",
          height: 220,
          backgroundColor: "#f9fafb",
        }}
      >
        <CardMedia
          component="img"
          image={
            product.imageUrl ||
            (theme?.name === "Lenovo" ? "/lenovoLaptop.jpg" : "/HPLaptop.jpg")
          }
          alt={product.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hover ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
      </Box>

      <Box
        sx={{
          p: 1,
          backgroundImage:
            theme?.name !== "Lenovo"
              ? "linear-gradient(to bottom, rgba(166, 198, 210, 0.8), rgba(0, 160, 220, 0))"
              : "linear-gradient(to bottom, rgba(208, 172, 172, 0.8), rgba(241, 119, 121, 0))",
       
        }}
      >        
         <Tooltip title={product.name} arrow>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              display: "block",
            }}
          >
            {product.name}
          </Typography>
        </Tooltip>

        <Tooltip title={product.description} arrow>
          <Typography
            sx={{
              fontSize: "12px",
              color: "text.secondary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              display: "block",
            }}
          >
            {product.description}
          </Typography>
        </Tooltip>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#0f172a" }}
            >
              ${product.price}
            </Typography>
          </Box>

          {cartQuantity === 0 ? (
            <Button
            size="small"
              variant="contained"
              startIcon={<ShoppingCartIcon />}
    onClick={handleIncrement}
              sx={{
                backgroundColor: primaryColor,
                color: "#fff",
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: theme?.accentColor,
                },
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <ButtonGroup
              size="small"
              sx={{
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Button
                onClick={handleDecrement}
                sx={{
                  backgroundColor: primaryColor,
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: theme?.accentColor,
                  },
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>

              <Button
                
                sx={{
                  backgroundColor: primaryColor,
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: primaryColor,
                  },
                }}
              >
      {cartQuantity}
              </Button>

              <Button
                onClick={handleIncrement}
                sx={{
                  backgroundColor: primaryColor,
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: theme?.accentColor,
                  },
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1,
            borderTop: "1px solid #E3E8EF",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={5} readOnly size="small" />
            <Typography variant="body2" sx={{ color: "#6788b8ff" }}>
              245 Reviews
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{ color: "green", fontWeight: "medium" }}
          >
            In Stock
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
