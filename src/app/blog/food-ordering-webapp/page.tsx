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
  codeSnippet?: string;
  listItems?: string[];
  images?: BlogImage[];
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
      "I built a full-stack Telegram ordering system combining a Next.js Mini App with a NestJS backend. The goal was to let customers place restaurant orders directly inside Telegram while giving staff a structured, automated workflow behind the scenes.",
    listItems: [
      "Customer-facing Mini App built with Next.js for fast ordering inside Telegram.",
      "Backend API built with NestJS handling orders, status flow, and admin actions.",
      "SQLite database used for lightweight persistence and blacklist control.",
      "Telegram authentication for secure user access via widget login.",
      "Telegram Bot automation for routing orders between admin and staff groups.",
    ],
    images: [
      { src: "/SHW/menu.png", alt: "Menu screen" },
      { src: "/SHW/new_order.jpg", alt: "New order view" },
    ],
  },
  {
    id: BlogSections.FrontendFeatures,
    title: "Customer Experience (Mini App)",
    content:
      "The frontend focuses entirely on speed and simplicity. Customers can browse a menu, build an order, and complete checkout in a few steps without leaving Telegram.",
    listItems: [
      "Dynamic menu system organized by categories and items.",
      "Cart system with real-time updates and item management.",
      "Simple 3-step checkout flow:",
      "  1. Customer details (name, phone, address, notes)",
      "  2. Branch selection",
      "  3. Payment choice (Cash on Delivery or QR payment)",
      "Telegram login integration for secure identity verification.",
      "Direct submission of orders to backend via Telegram Web App API.",
    ],
    images: [
      { src: "/SHW/quantity.png", alt: "Item quantity selector" },
      { src: "/SHW/payment.png", alt: "Payment screen" },
      { src: "/SHW/telegramlogin.png", alt: "Telegram login screen" },
    ],
  },
  {
    id: BlogSections.BackendFeatures,
    title: "Backend System (Order Workflow Engine)",
    content:
      "The backend is responsible for turning raw orders into a structured workflow that staff can manage in real time.",
    listItems: [
      "Incoming orders are sent to an admin (boss) Telegram group with action buttons.",
      "Admin can confirm or cancel orders instantly.",
      "Confirmed orders are forwarded to a staff group for preparation.",
      "Order lifecycle management: Confirmed → Preparing → Delivering → Completed.",
      "Blacklist system prevents flagged users from placing new orders.",
      "Supports multiple concurrent orders with isolated workflows.",
      "No customer-side status spam — updates are internal only.",
    ],
    images: [
      { src: "/SHW/prepare_order.jpg", alt: "Order preparation view in Telegram" },
    ],
  },
  {
    id: BlogSections.Timeline,
    title: "How It Was Built (21-Day Build Process)",
    content:
      "The system was built in a structured 3-week cycle, focusing first on core functionality, then backend automation, and finally full integration and testing.",
    listItems: [
      "Week 1: Built the Next.js Mini App, menu system, cart, and checkout flow with Telegram login.",
      "Week 2: Developed NestJS backend, order routing logic, and blacklist system using SQLite.",
      "Week 3: Connected frontend and backend, tested multi-order scenarios, fixed edge cases, and deployed via Telegram Web App.",
    ],
  },
  {
    id: BlogSections.Deployment,
    title: "Deployment Setup",
    content:
      "The system is split between frontend and backend hosting to ensure reliability and scalability.",
    listItems: [
      "Frontend deployed as a Telegram Web App via BotFather configuration.",
      "Backend hosted on Render for continuous API availability.",
      "SQLite used for lightweight operational data and blacklist storage.",
    ],
  },
  {
    id: BlogSections.WhyThisWorks,
    title: "Why This System Works Well",
    listItems: [
      "Minimal friction ordering directly inside Telegram.",
      "Clear internal workflow for staff reduces confusion.",
      "Automated routing replaces manual order handling.",
      "Lightweight backend keeps performance fast and stable.",
      "Blacklist protection prevents abuse without slowing users down.",
      "Scales naturally with multiple simultaneous orders.",
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

// --- Blog Page ---
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
                  <Typography component="p" sx={{ mt: 1, color: "var(--tech-color)", mb: 2 }}>
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
                    {section.listItems.map((item, idx) => (
                      <ListItem
                        key={idx}
                        sx={{ display: "list-item", py: 0.5, color: "var(--card-color)" }}
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

          <Typography component="p" sx={{ mt: 4, fontStyle: "italic", mb: 2 }}>
            If you come this far, thank you.
          </Typography>
        </article>
      </Container>
    </>
  );
}

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
  },
};
