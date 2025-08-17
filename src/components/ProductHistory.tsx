import { customerThemes } from "@/utils/theme";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

const products = [
  {
    name: "Spectre pro x360",
    category: "Ultrabook",
    price: "$4,999",
    availability: "In Stock",
  },
  {
    name: "Spectre x360",
    category: "ProBook",
    price: "$2999",
    availability: "In Stock",
  },
  {
    name: "Spectre probook yoga x360",
    category: "ProBook",
    price: "$2099",
    availability: "In Stock",
  },
  {
    name: "Spectre build Pro x360",
    category: "ProBook",
    price: "$3999",
    availability: "In Stock",
  },
  {
    name: "Spectre yoga x360",
    category: "Ultrabook pro",
    price: "$1999",
    availability: "In Stock",
  },
];
interface Props{
  customerKey:string
}
export default function ProductHistory({ customerKey }: Props) {
  const theme = customerThemes[customerKey];
  return (
    <Box sx={{m:4}}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#f5f5f5",
              "& .MuiTableCell-root": { color: `${theme?.primaryColor}` },
            }}
          >
            <TableRow>
              <TableCell>
                <strong>Product</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Availability</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Chip
                    label={product.availability}
                    color="success"
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
