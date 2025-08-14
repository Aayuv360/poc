import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface Product {
  imageUrl: string;
  title: string;
  subtitle?: string;
  price: string;
  oldPrice?: string;
  rating: number; // 0–5
  reviewsCount?: number;
  tags?: string[];
  description: string;
  onAddToCart?: () => void;
  onWishlist?: () => void;
}


export default function V2ProductCard({
  imageUrl,
  title,
  subtitle,
  price,
  oldPrice,
  rating,
  reviewsCount = 0,
  tags = [],
  description,
  onAddToCart,
  onWishlist,
}: Product) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        maxWidth: 1000,
        borderRadius: 3,
        boxShadow: 4,
        overflow: "hidden",
      }}
    >
      {/* Left-side image */}
      <CardMedia
        component="img"
        image={imageUrl}
        alt={title}
        sx={{
          width: { xs: "100%", md: 300 },
          height: { xs: 220, md: "auto" },
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      {/* Right-side content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Header: title + optional subtitle + tags */}
        <Box sx={{ mb: 1, display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600, flex: 1 }}>
            {title}
          </Typography>
          {tags.map((t) => (
            <Chip key={t} label={t} size="small" variant="outlined" />
          ))}
        </Box>
        {subtitle && (
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
        )}

        {/* Rating + reviews */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            {rating.toFixed(1)} ({reviewsCount} reviews)
          </Typography>
        </Box>

        {/* Price */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {price}
          </Typography>
          {oldPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              {oldPrice}
            </Typography>
          )}
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ flexGrow: 1, mb: 2, lineHeight: 1.4 }}
        >
          {description}
        </Typography>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            mt: "auto",
          }}
        >
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={onAddToCart}
            sx={{ flexGrow: 1, minWidth: 140, borderRadius: 2, py: 1.25 }}
          >
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            startIcon={<FavoriteBorderIcon />}
            onClick={onWishlist}
            sx={{ minWidth: 140, borderRadius: 2, py: 1.25 }}
          >
            Wishlist
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
