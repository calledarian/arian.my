"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";

export default function NavigationBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  
  const BrandAvatar = (
    <Avatar
      src="/arian/arian-khademolghorani.jpg"
      alt="Arian Khademolghorani"
      sx={{ width: { xs: 60, sm: 80, md: 100 }, height: { xs: 60, sm: 80, md: 100 } }}
    />
  );

  const BrandSection = (
    <Link href="/" passHref style={{ textDecoration: 'none' }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}>
        {BrandAvatar}
        <Typography
          variant="h6"
          component="div"
          className="mono"
          sx={{
            color: "var(--deep-blue)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            fontSize: { xs: "1rem", sm: "1.2rem" }
          }}
        >
          Arian Khademolghorani
        </Typography>
      </Box>
    </Link>
  );

  const NavLinks = (
    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
      <Button
        className="mono"
        sx={{ color: "var(--tech-color)", fontSize: "14px", "&:hover": { color: "var(--accent-orange)" } }}
        component="a"
        href="#work"
      >
        Work
      </Button>
      <Button
        className="mono"
        sx={{ color: "var(--tech-color)", fontSize: "14px", "&:hover": { color: "var(--accent-orange)" } }}
        component="a"
        href="#about"
      >
        About
      </Button>
    </Box>
  );

  const MobileDrawer = (
    <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
      <Box sx={{ width: 250, p: 2, bgcolor: "var(--background)", height: "100%" }} role="presentation">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#work" onClick={handleDrawerToggle}>
              <ListItemText
                primary=".work()"
                slotProps={{
                  primary: {
                    className: "mono",
                    sx: { fontSize: "14px", color: "var(--deep-blue)" }
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#about" onClick={handleDrawerToggle}>
              <ListItemText
                primary=".about()"
                slotProps={{
                  primary: {
                    className: "mono",
                    sx: { fontSize: "14px", color: "var(--deep-blue)" }
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <Box component="nav">
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: "1px solid var(--border-color)", backdropFilter: "blur(10px)", background: "rgba(253, 250, 243, 0.8)" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", minHeight: "64px" }}>
            {BrandSection}
            {NavLinks}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "var(--deep-blue)" }}
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
        {MobileDrawer}
      </AppBar>
    </Box>
  );
}
