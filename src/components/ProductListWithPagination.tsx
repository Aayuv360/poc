import React, { useState } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import ProductCard, { Product } from "./ProductCard";
import { customerThemes } from "@/utils/theme";

interface Props {
  products: Product[];
  customerKey: string;
  itemsPerPage?: number;
}

const ProductListWithPagination: React.FC<Props> = ({
  products,
  customerKey,
  itemsPerPage = 5,
}) => {
  const theme = customerThemes[customerKey ?? ""];
  const primaryColor = theme?.primaryColor ?? "";
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box>
      {paginatedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          customerKey={customerKey}
        />
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          gap: 2,
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="body2">
          Page {page} of {totalPages}
        </Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="standard"
          sx={{
            "& .MuiPaginationItem-root": {
              color: primaryColor,
              "&.Mui-selected": {
                backgroundColor: primaryColor,
                color: "#fff",
                "&:hover": {
                  backgroundColor: primaryColor,
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductListWithPagination;
