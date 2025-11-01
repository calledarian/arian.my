import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
} from "@mui/material";
import FadeIn from "@/app/utils/fadeIn";
import Script from "next/script";

// --- Types & Interfaces ---
interface BlogSection {
  id: string;
  title: string;
  content?: string | React.ReactNode;
  codeSnippet?: string;
  listItems?: string[];
}

enum BlogSections {
  Introduction = "introduction",
  FrontendFeatures = "frontend-features",
  BackendFeatures = "backend-features",
  Timeline = "development-timeline",
  Deployment = "deployment-hosting",
  WhyThisWorks = "why-this-works",
}
const blogSections: BlogSection[] = [
  {
    id: BlogSections.Introduction,
    title: "Project Overview",
    content:
      "This blog describes a Telegram Mini App built with Next.js and NestJS, allowing customers to place restaurant orders while the backend bot manages workflows efficiently.",
    listItems: [
      "Frontend Mini App built with Next.js for a smooth, responsive UI.",
      "Backend API built with NestJS for fast and reliable order management.",
      "SQLite database for storing blacklisted IDs and other essential data.",
      "Security features including Telegram widget login and blacklist handling by ID.",
      "Telegram Bot integration for workflow automation and group updates.",
    ],
  },
  {
    id: BlogSections.FrontendFeatures,
    title: "Frontend Features: Telegram Mini App",
    content:
      "The Mini App provides a smooth ordering experience, handling menu display, cart functionality, secure login, and a 3-step checkout process.",
    listItems: [
      "Dynamic Menu System with categories and items.",
      "Shopping Cart: Add, remove, and review items before checkout.",
      "3-Step Checkout Process:",
      "  1. Customer details (Name, Phone Number, Address, Note).",
      "  2. Branch selection from available locations.",
      "  3. Payment options: Cash on Delivery or QR Code.",
      "Telegram widget login for secure authentication.",
      "Orders submitted securely to backend via Telegram Web App API.",
      "Fast and responsive UI powered by Next.js.",
    ],
  },
  {
    id: BlogSections.BackendFeatures,
    title: "Backend Features: NestJS API & Telegram Bot",
    content:
      "The backend is an API service built with NestJS, handling order management, workflows, security, and real-time updates efficiently.",
    listItems: [
      "Order Forwarding: Sends order summary to Admin (Boss) Group with Confirm/Cancel buttons.",
      "Workflow Management:",
      "  - On confirmation, updates Boss Group and sends details to Workers Group.",
      "  - Status transitions: Confirm → Preparing → Delivering → Complete.",
      "Blacklist feature with SQLite to prevent banned users from placing orders.",
      "Supports multiple simultaneous orders with real-time updates.",
      "Customers do not receive order status updates.",
      "API ensures low latency and reliable performance for all operations.",
    ],
  },
  {
    id: BlogSections.Timeline,
    title: "Development Timeline",
    content:
      "The project was completed in 21 days, following a structured plan to ensure stability, security, and full functionality.",
    listItems: [
      "Week 1 (Days 1–7): Project setup, Next.js frontend development, menu & cart implementation, 3-step checkout, Telegram login integration.",
      "Week 2 (Days 8–14): NestJS backend API development, order forwarding, workflow logic, blacklist feature implementation using SQLite.",
      "Week 3 (Days 15–21): QA & testing with concurrent orders, integration of frontend & backend, final bug fixes, deployment via Telegram Web App..",
    ],
  },
  {
    id: BlogSections.Deployment,
    title: "Deployment & Hosting",
    content:
      "The Mini App frontend is hosted as a Telegram Web App using BotFather, while the backend API is hosted on Render. SQLite is used for lightweight and efficient data storage.",
    listItems: [
      "Frontend hosted via Telegram Web App using BotFather.",
      "Backend API hosted on Render for fast and reliable performance.",
      "SQLite database stores blacklisted IDs and other essential management data.",
    ],
  },
  {
    id: BlogSections.WhyThisWorks,
    title: "Why This Project Was Successful",
    listItems: [
      "Next.js frontend provides a fast, responsive, and smooth UI.",
      "NestJS backend ensures reliable and low-latency API performance.",
      "Telegram widget login ensures secure user authentication.",
      "Blacklist feature prevents unwanted or malicious users from placing orders.",
      "SQLite provides lightweight and efficient storage for management data.",
      "Workflow buttons (Confirm, Preparing, Delivering, Complete) function as expected.",
      "System handles multiple orders efficiently with real-time updates.",
      "Integration of all assets ensures smooth operations without delays.",
    ],
  },
];

// --- Blog Page Component ---
export default function BlogPage() {
  return (
    <>
      <Script type="application/ld+json" id="blog-schema">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Telegram Restaurant Mini App Development",
          description:
            "Step-by-step explanation of developing a Telegram Mini App for restaurant ordering and a Telegram Bot for order management.",
          author: { "@type": "Person", name: "Arian Khademolghorani" },
          publisher: {
            "@type": "Organization",
            name: "Arian.my",
            logo: {
              "@type": "ImageObject",
              url: "https://arian.my/assets/logo.png",
            },
          },
          datePublished: "2025-11-01",
          dateModified: "2025-11-01",
        })}
      </Script>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <article>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ mb: { xs: 2, sm: 4 }, fontSize: { xs: "2rem", sm: "3rem" } }}
          >
            Developed a Telegram Restaurant Mini App & Bot for Order Management
          </Typography>

          {blogSections.map((section, i) => (
            <FadeIn key={section.id} delay={i * 200}>
              <Paper
                elevation={0}
                sx={{
                  py: { xs: 2, sm: 3 },
                  px: { xs: 2, sm: 4 },
                  mb: { xs: 3, sm: 4 },
                  background: "var(--background)",
                  color: "var(--foreground)",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    color: "var(--card-color)",
                  }}
                >
                  {section.title}
                </Typography>

                {section.content && (
                  <Typography
                    paragraph
                    sx={{ mt: 1, color: "var(--tech-color)" }}
                  >
                    {section.content}
                  </Typography>
                )}

                {section.codeSnippet && (
                  <Box
                    component="pre"
                    sx={{
                      background: "var(--tech-color)",
                      color: "var(--background)",
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 1,
                      fontFamily: "monospace",
                      mt: 2,
                      mb: 2,
                      overflowX: "auto",
                    }}
                  >
                    {section.codeSnippet}
                  </Box>
                )}

                {section.listItems && (
                  <List sx={{ pl: { xs: 1, sm: 2 } }}>
                    {section.listItems.map((item, i) => (
                      <ListItem
                        key={i}
                        sx={{
                          display: "list-item",
                          py: 0.5,
                          color: "var(--card-color)",
                        }}
                      >
                        {item}
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>
            </FadeIn>
          ))}

          <Typography paragraph sx={{ mt: 4, fontStyle: "italic" }}>
            If you come this far, thank you.
          </Typography>
        </article>
      </Container>
    </>
  );
}

// Metadata
export const metadata = {
  title: "Telegram Restaurant Mini App | Order Management with Bot",
  description:
    "Learn how I developed a Telegram Mini App for restaurant ordering and a Telegram Bot for backend order management. Full workflow explained.",
  keywords: [
    "telegram mini app",
    "restaurant ordering",
    "telegram bot",
    "order management",
    "frontend backend integration",
  ],
  authors: [{ name: "Arian Khademolghorani", url: "https://arian.my" }],
  openGraph: {
    title: "Telegram Restaurant Mini App Development",
    description:
      "Step-by-step explanation of developing a Telegram Mini App and Telegram Bot for order management.",
    url: "https://arian.my/blog/food-ordering-webapp",
    siteName: "Arian.my Dev Blog",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Telegram Restaurant Mini App",
    description:
      "Learn how I developed a Telegram Mini App and Bot for restaurant order management.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://arian.my/blog/food-ordering-webapp",
    languages: {
      "en-US": "https://arian.my/en/blog/food-ordering-webapp",
    },
  },
};
