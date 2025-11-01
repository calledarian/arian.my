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
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

// Styled Badge
const BrandBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: 20,
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

export default function NavigationBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const mode = saved !== null ? saved === "true" : prefersDark;
    setDarkMode(mode);
    document.body.classList.toggle("dark", mode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", String(newMode));
      document.body.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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
          sx={{ width: { xs: 60, sm: 80, md: 100 }, height: { xs: 60, sm: 80, md: 100 } }}
        />
      </BrandBadge>
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: "1rem", sm: "1.4rem", md: "2rem" },
          fontWeight: 700,
        }}
      >
        Software Developer
      </Typography>
    </Box>
  );

  const NavLinks = (
    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
      <Switch checked={darkMode} onChange={toggleDarkMode} />
      <Button color="inherit" LinkComponent={Link} href="/">
        Home
      </Button>
      <Button color="inherit" LinkComponent={Link} href="/blog">
        Blog
      </Button>
    </Box>
  );

  const MobileDrawer = (
    <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
      <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
        <List>
          <ListItem>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/">
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/blog">
              <ListItemText primary="Blog" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: 80, sm: 100, md: 120 },
          }}
        >
          {BrandSection}
          {NavLinks}
          {/* Mobile menu icon */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      {MobileDrawer}
    </AppBar>
  );
}
