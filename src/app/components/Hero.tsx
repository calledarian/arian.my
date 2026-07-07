"use client";

import React, { useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import FadeIn from "../utils/fadeIn";
import Link from "next/link";

interface BlogsCard {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  href: string;
  tag: string;
  tagColor: "blue" | "teal" | "purple" | "orange";
}

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  blue:   { bg: "var(--tag-blue-bg)", color: "var(--tag-blue-text)" },
  teal:   { bg: "var(--tag-teal-bg)", color: "var(--tag-teal-text)" },
  purple: { bg: "var(--tag-purple-bg)", color: "var(--tag-purple-text)" },
  orange: { bg: "var(--tag-orange-bg)", color: "var(--tag-orange-text)" },
};

const BLOGS: BlogsCard[] = [
  {
    id: 1,
    title: "CMS Platform for Educational Organization",
    thumbnail: "/CMS/cambodia-bible-education-centre-3.png",
    description: "Built a centralized system allowing an educational organization to manage content, events, and internal updates through a secure admin dashboard.",
    href: "/blog/cms-platform",
    tag: "CMS",
    tagColor: "blue",
  },
  {
    id: 2,
    title: "Tour Booking Management System",
    thumbnail: "/BMS/booking-management-system.png",
    description: "A booking system for tour operations enabling automated reservations, package management, and admin control.",
    href: "/blog/tour-system",
    tag: "Booking",
    tagColor: "teal",
  },
  {
    id: 3,
    title: "Restaurant Ordering System (Telegram Mini App)",
    thumbnail: "/SHW/new_order.jpg",
    description: "Telegram-based ordering system where users place orders and backend bot manages workflow automation.",
    href: "/blog/food-ordering-webapp",
    tag: "Telegram",
    tagColor: "purple",
  },
  {
    id: 4,
    title: "Expo Audio Waveform Visualizer",
    thumbnail: "/EXPO/waveform.jpg",
    description: "A visualizer for expo audio waveforms, showcasing real-time audio processing capabilities.",
    href: "/blog/expo-audio-waveform",
    tag: "Audio",
    tagColor: "orange",
  },
];

function WorkItem({ blog, index }: { blog: BlogsCard; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const tagStyle = TAG_STYLES[blog.tagColor];

  return (
    <Box
      component={Link}
      href={blog.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        borderRight: { xs: "none", md: "1px solid var(--border-color)" },
        borderBottom: "1px solid var(--border-color)",
        p: { xs: 3, md: 5 },
        transition: "background 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          background: "var(--grid-color)",
        },
      }}
    >
      <FadeIn delay={index * 100}>
        <Box
          sx={{
            width: "100%",
            aspectRatio: "16 / 10",
            overflow: "hidden",
            mb: 3,
            border: "1px solid var(--border-color)",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={blog.thumbnail}
            alt={blog.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: 800, lineHeight: 1.3, maxWidth: "75%" }}>
                {blog.title}
            </Typography>
            <Chip
                label={blog.tag}
                size="small"
                sx={{
                    height: 22,
                    fontSize: "10px",
                    fontWeight: 700,
                    borderRadius: "4px",
                    bgcolor: tagStyle.bg,
                    color: tagStyle.color,
                }}
            />
        </Box>

        <Box
            sx={{
                height: { xs: "auto", md: isHovered ? "auto" : "0px" },
                opacity: { xs: 1, md: isHovered ? 1 : 0 },
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                mt: isHovered ? 2 : 0
            }}
        >
            <Typography sx={{ fontSize: "14px", color: "var(--tech-color)", lineHeight: 1.7, mb: 2 }}>
                {blog.description}
            </Typography>
            <Typography className="mono" sx={{ fontSize: "12px", fontWeight: 700, color: "var(--foreground)" }}>
                Read Case Study →
            </Typography>
        </Box>
      </FadeIn>
    </Box>
  );
}

export default function BlogsPage() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        borderLeft: { xs: "none", md: "1px solid var(--border-color)" },
        borderTop: "1px solid var(--border-color)",
      }}
    >
      {BLOGS.map((blog, index) => (
        <WorkItem key={blog.id} blog={blog} index={index} />
      ))}
    </Box>
  );
}
