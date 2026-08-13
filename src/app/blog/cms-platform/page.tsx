"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
} from "@mui/material";
import Image from "next/image";
import FadeIn from "@/app/utils/fadeIn";
import Script from "next/script";

// --- Types ---
interface BlogImage {
  src: string;
  alt: string;
}

interface BlogSection {
  id: string;
  title: string;
  content?: string;
  listItems?: string[];
  images?: BlogImage[];
}

enum Sections {
  Overview = "overview",
  Features = "features",
  Admin = "admin",
  Workflow = "workflow",
  Deployment = "deployment",
  Outcome = "outcome",
}

const sections: BlogSection[] = [
  {
    id: Sections.Overview,
    title: "Project Overview",
    content:
      "I built a full-stack CMS platform for an educational organization to help them manage events, announcements, and internal content in one centralized system.",
    listItems: [
      "Secure admin dashboard for content management",
      "Event publishing and updates system",
      "Structured content workflow for staff",
      "Role-based access control",
    ],
    images: [
      { src: "/CMS/cambodia-bible-education-centre.png", alt: "CMS platform overview" },
      { src: "/CMS/cambodia-bible-education-centre-2.png", alt: "CMS dashboard view" },
    ],
  },
  {
    id: Sections.Features,
    title: "Core Features",
    content:
      "The system focuses on simplicity for staff while maintaining flexibility for managing different types of content.",
    listItems: [
      "Create, edit, and publish events instantly",
      "Manage announcements and public content",
      "Organized content structure for easy navigation",
      "Media support for images and event details",
    ],
  },
  {
    id: Sections.Admin,
    title: "Admin Dashboard",
    content:
      "The admin dashboard is the core of the system, designed to be fast, minimal, and easy for non-technical users.",
    listItems: [
      "Clean dashboard UI for daily operations",
      "Quick editing tools for content updates",
      "Secure login and session handling",
      "Optimized for speed and usability",
    ],
    images: [
      { src: "/CMS/cambodia-bible-education-centre-3.png", alt: "Admin dashboard UI" },
      { src: "/CMS/cambodia-bible-education-centre-4.png", alt: "Content editing interface" },
    ],
  },
  {
    id: Sections.Workflow,
    title: "Content Workflow",
    content:
      "The system replaces manual posting with a structured workflow that ensures content is always consistent and controlled.",
    listItems: [
      "Draft → Review → Publish flow",
      "Controlled publishing for events and announcements",
      "Reduced dependency on manual updates",
      "Clear separation between admin roles",
    ],
  },
  {
    id: Sections.Deployment,
    title: "Deployment",
    content:
      "The platform is deployed and actively used by the organization at bec.cheddybytes.com.",
    listItems: [
      "Hosted as a full-stack web application",
      "Optimized for mobile and desktop use",
      "Secure backend API integration",
      "Production-ready environment setup",
    ],
  },
  {
    id: Sections.Outcome,
    title: "Real-World Impact",
    content:
      "This system helped the organization move from manual updates to a structured digital workflow, improving consistency and reducing operational overhead.",
    listItems: [
      "Faster content publishing",
      "Reduced manual coordination",
      "Improved organization of events",
      "Easier long-term content management",
    ],
  },
];

// --- Image Grid ---
function SectionImageGrid({ images }: { images: BlogImage[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        gap: 2.5,
        mt: 3,
      }}
    >
      {images.map((img, idx) => (
        <Box
          key={idx}
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 10",
            borderRadius: 3,
            overflow: "hidden",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            transition: "all 0.25s ease",
            "&:hover": {
              transform: "translateY(-4px) scale(1.01)",
              boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
            },
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
          />
        </Box>
      ))}
    </Box>
  );
}

// --- CMS Page ---
export default function CMSPage() {
  return (
    <>
      <Script type="application/ld+json" id="cms-schema">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "CMS Platform for Educational Organization",
          description:
            "A full-stack CMS platform built to manage events, announcements, and content for an educational organization.",
          author: { "@type": "Person", name: "Arian Khademolghorani" },
          publisher: {
            "@type": "Organization",
          },
        })}
      </Script>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
        >
          CMS Platform for Educational Organization
        </Typography>

        {sections.map((section, i) => (
          <FadeIn key={section.id} delay={i * 200}>
            <Paper
              elevation={0}
              sx={{
                py: 3,
                px: { xs: 2, sm: 4 },
                mb: 3,
                background: "var(--background)",
                color: "var(--foreground)",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" sx={{ color: "var(--card-color)", mb: 1 }}>
                {section.title}
              </Typography>

              {section.content && (
                <Typography sx={{ color: "var(--tech-color)", mb: 2 }}>
                  {section.content}
                </Typography>
              )}

              {section.listItems && (
                <List>
                  {section.listItems.map((item, idx) => (
                    <ListItem
                      key={idx}
                      sx={{ display: "list-item", color: "var(--card-color)", py: 0.5 }}
                    >
                      {item}
                    </ListItem>
                  ))}
                </List>
              )}

              {section.images && <SectionImageGrid images={section.images} />}
            </Paper>
          </FadeIn>
        ))}
      </Container>
    </>
  );
}
