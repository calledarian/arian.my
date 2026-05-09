"use client";

import React from "react";
import { Container, Typography, Box, Chip } from "@mui/material";
import FadeIn from "../utils/fadeIn";
import Link from "next/link";

interface BlogsCard {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  href: string;
  tag: string;
  tagColor: "blue" | "teal" | "purple";
}

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  blue:   { bg: "#E6F1FB", color: "#0C447C" },
  teal:   { bg: "#E1F5EE", color: "#085041" },
  purple: { bg: "#EEEDFE", color: "#3C3489" },
};

const BLOGS: BlogsCard[] = [
  {
    id: 1,
    title: "CMS Platform for Educational Organization",
    thumbnail: "/CMS/cambodia-bible-education-centre-3.png",
    description:
      "Built a centralized system allowing an educational organization to manage content, events, and internal updates through a secure admin dashboard.",
    href: "/blog/cms-platform",
    tag: "CMS",
    tagColor: "blue",
  },
  {
    id: 2,
    title: "Tour Booking Management System",
    thumbnail: "/BMS/booking-management-system.png",
    description:
      "A booking system for tour operations enabling automated reservations, package management, and admin control.",
    href: "/blog/tour-system",
    tag: "Booking",
    tagColor: "teal",
  },
  {
    id: 3,
    title: "Restaurant Ordering System (Telegram Mini App)",
    thumbnail: "/SHW/new_order.jpg",
    description:
      "Telegram-based ordering system where users place orders and backend bot manages workflow automation.",
    href: "/blog/food-ordering-webapp",
    tag: "Telegram",
    tagColor: "purple",
  },
];

export default function BlogsPage() {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "20px",
        py: { xs: 4, md: 6 },
      }}
    >
      {BLOGS.map((blog, index) => (
        <FadeIn key={blog.id} delay={index * 150} style={{ height: "100%" }}>
          <Box
            component={Link}
            href={blog.href}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              textDecoration: "none",
              background: "var(--background)",
              border: "0.5px solid rgba(0,0,0,0.1)",
              borderRadius: "16px",
              overflow: "hidden",
              transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "rgba(0,0,0,0.2)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Box
              component="img"
              src={blog.thumbnail}
              alt={blog.title}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
                flexShrink: 0,
              }}
            />

            <Box sx={{ p: "1rem 1.25rem 1.25rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Chip
                label={blog.tag}
                size="small"
                sx={{
                  mb: 1.25,
                  height: 22,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  background: TAG_STYLES[blog.tagColor].bg,
                  color: TAG_STYLES[blog.tagColor].color,
                  border: "none",
                  borderRadius: "6px",
                  alignSelf: "flex-start",
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontSize: "15px",
                  fontWeight: 500,
                  lineHeight: 1.4,
                  mb: 1,
                  color: "var(--foreground)",
                }}
              >
                {blog.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "var(--tech-color)",
                  flexGrow: 1,
                }}
              >
                {blog.description}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "13px",
                  color: "var(--card-color)",
                  opacity: 0.7,
                  mt: 2,
                }}
              >
                Read case study →
              </Typography>
            </Box>
          </Box>
        </FadeIn>
      ))}
    </Container>
  );
}