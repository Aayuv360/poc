import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

interface Props {
  product: Product;
}

export default function LeftImageCard({ product }: Props) {
  return (
    <Card sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" }, // stack on xs, side-by-side from sm up
      maxWidth: 800,
      overflow: "hidden",
      borderRadius: 2,
      boxShadow: 3,
    }}>
      <CardMedia
        component="img"
        src={product.imageUrl}
        alt={product.description}
        sx={{
          width: { xs: "100%", sm: 200 }, // full width on mobile, fixed width on larger
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {product.id}
          </Typography>
          <Typography variant="body2">
            {product.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
