// src/components/Greeting.tsx
import ProductStaticData from "./ProductStaticData";
import Typography from '@mui/material/Typography';
import { customerThemes } from "@/utils/theme";

type Props = {
  customerkey: string;
};

export default function ProductHistory({ customerkey }: Props) {
  //const [likes, setLikes] = useState(0);
 const theme = customerThemes[customerkey];
 console.log("theme >>>>> :", theme);
  return (
    <div
      style={{
        border: `1px solid ${theme.primaryColor}`,
        borderRadius: 8,
        padding: 16,
        margin: "16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* <h3>Hello, {name} </h3> */}
      
        <Typography sx={{ color: "text.secondary", fontWeight: "bold" }} variant="h6">
          Order history :
        </Typography> 
      
      <ProductStaticData />
</div>);
}
