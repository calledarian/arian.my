"use client";

import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  Switch,
  Container,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

// ------------------------------
// Styled Badge with ripple effect
// ------------------------------
const BrandBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: 20, // badge dot size
    height: 20,
    borderRadius: "50%",
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-50%",
      left: "-50%",
      width: "200%",
      height: "200%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      animation: "ripple 1.2s infinite ease-in-out",
    },
  },
  "@keyframes ripple": {
    "0%": { transform: "scale(1)", opacity: 1 },
    "100%": { transform: "scale(3)", opacity: 0 },
  },
}));

// ------------------------------
// Navbar Component
// ------------------------------
export default function NavigationBar() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const mode = saved !== null ? saved === "true" : prefersDark;
    setDarkMode(mode);
    document.body.classList.toggle("dark", mode);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", String(newMode));
      document.body.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  // ------------------------------
  // Avatar + Text Section
  // ------------------------------
  const BrandSection = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 3, height: "100%" }}>
      <BrandBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          src="/arian/arian-khademolghorani.jpg"
          alt="Arian Khademolghorani"
          sx={{
            width: { xs: 80, sm: 100, md: 120 },
            height: { xs: 80, sm: 100, md: 120 },
          }}
        />
      </BrandBadge>
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2rem" }, // bigger for brand avatar
          fontWeight: 700, // bold
          lineHeight: 1.2,
          letterSpacing: 0.5, // optional, improves readability
        }}
      >
        Software Developer
      </Typography>
    </Box>
  );

  // ------------------------------
  // Navigation Links + Switch
  // ------------------------------
  const NavLinks = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Switch checked={darkMode} onChange={toggleDarkMode} />
      <Button color="inherit" LinkComponent={Link} href="/">
        Home
      </Button>
      <Button color="inherit" LinkComponent={Link} href="/blog">
        Blog
      </Button>
    </Box>
  );

  // ------------------------------
  // Render Navbar
  // ------------------------------
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ top: 0 }}>
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: 100, sm: 120, md: 140 },
            py: 2,
          }}
        >
          {BrandSection}
          {NavLinks}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
