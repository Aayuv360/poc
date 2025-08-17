import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { customerThemes } from "../utils/theme";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Image from "next/image";
import { CustomerKey } from "@/utils/enum";

type Props = {
  children: ReactNode;
  customerKey: string;
};

export default function Layout({ children, customerKey }: Props) {
  const theme = customerThemes[customerKey ?? ""];
  const customerName = theme?.name ?? "";
  const primaryColor = theme?.logoPrimaryColor ?? "#1976d2";
  const logoUrl = theme?.logoUrl ?? "";
  const router = useRouter();
  const companyId = CustomerKey[customerKey  as keyof typeof CustomerKey]; // Default to acme
  const navLinks = [
    {
      href: "/dashboard",
      label: "Products Catalog",
      icon: <Inventory2OutlinedIcon fontSize="small" />,
    },
    {
      href: "/history",
      label: "Order History",
      icon: <HistoryOutlinedIcon fontSize="small" />,
    },
    {
      href: `/faqs/${companyId}`,
      label: "FAQs",
      icon: <Inventory2OutlinedIcon fontSize="small" />,
    },   
    {
      href: "/logout",
      label: "Logout",
      icon: <LogoutOutlinedIcon fontSize="small" />,
      danger: true,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "system-ui, sans-serif",
        background: "#fafafa",
      }}
    >
      {customerKey?.length > 0 && (
        <aside
          style={{
            width: 240,
            padding: "30px 20px",
            background: "#fff",
            borderRight: "1px solid #e0e0e0",
            boxSizing: "border-box",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ marginBottom: 40, textAlign: "center" }}>
            <Image
              src={logoUrl}
              alt={`${customerName} Logo`}
              width={120}
              height={60}
              style={{ maxWidth: "100%", objectFit: "contain" }}
            />
          </div>
          <nav style={{ flex: 1 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 14px",
                  borderRadius: 8,
                  marginBottom: 10,
                  color:
                    router.pathname === link.href
                      ? primaryColor
                      : // : link.danger
                        // ? "#c62828"
                        "#333",

                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  gap: 10,
                }}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </aside>
      )}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginTop: "16px",
        }}
      >
        {/* {customerKey?.length > 0 && (
          <Box
            sx={{
              borderBottom: `4px solid ${theme?.logoPrimaryColor}`,
              p: 1,
              m: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ m: 0, color: theme?.logoPrimaryColor }}
            >
              {theme?.name}
            </Typography>
          </Box>
        )} */}

        {children}
      </div>
    </div>
  );
}
