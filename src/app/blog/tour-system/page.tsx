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
import FadeIn from "@/app/utils/fadeIn";
import Script from "next/script";
import Image from "next/image";

interface Section {
    id: string;
    title: string;
    content?: string;
    listItems?: string[];
    images?: {
        src: string;
        alt: string;
    }[];
}

enum Sections {
    Overview = "overview",
    Features = "features",
    BookingFlow = "booking-flow",
    Admin = "admin",
    Security = "security",
    Outcome = "outcome",
}

const sections: Section[] = [
    {
        id: Sections.Overview,
        title: "Project Overview",
        content:
            "I built a full-stack tour booking system that allows users to browse travel packages, submit bookings, and receive confirmations while administrators manage everything through a secure backend system.",
        listItems: [
            "Customer-facing booking interface for tour selection",
            "Admin system for managing packages and bookings",
            "Secure authentication and protected routes",
            "Backend API handling booking logic and validation",
        ],
    },
    {
        id: Sections.Features,
        title: "Core Features",
        content:
            "The system focuses on simplifying the booking process while giving administrators full control over travel packages and reservations.",
        listItems: [
            "Browse available tour packages with details and images",
            "Submit booking requests with user information",
            "Real-time booking status updates",
            "Admin tools for creating and updating packages",
        ],
    },
    {
        id: Sections.Features,
        title: "Core Features",
        content:
            "The system focuses on simplifying the booking process while giving administrators full control over travel packages and reservations.",
        listItems: [
            "Browse available tour packages with details and images",
            "Submit booking requests with user information",
            "Real-time booking status updates",
            "Admin tools for creating and updating packages",
        ],
        images: [
            {
                src: "/BMS/booking-management-system-2.png",
                alt: "Package details screen",
            },
            {
                src: "/BMS/booking-management-system-3.png",
                alt: "Package creation screen",
            },
            {
                src: "/BMS/booking-management-system-4.png",
                alt: "Tour booking screen",
            },
            {
                src: "/BMS/booking-management-system-5.png",
                alt: "Tour status tracking via client verificaiton code",
            },
            {
                src: "/BMS/booking-management-system.png",
                alt: "Admin booking management",
            },
        ],
    },
    {
        id: Sections.BookingFlow,
        title: "Booking Flow",
        content:
            "The booking process is designed to be simple for users while ensuring structured handling on the backend.",
        listItems: [
            "User selects a tour package",
            "Fills out booking form with required details",
            "Request is sent to backend API",
            "Admin reviews and confirms booking",
            "Confirmation is sent back to user",
        ],
    },
    {
        id: Sections.Admin,
        title: "Admin Dashboard",
        content:
            "The admin side of the system provides full control over tour operations in a clean and efficient interface.",
        listItems: [
            "Create, edit, and delete tour packages",
            "Manage incoming bookings",
            "Approve or reject reservations",
            "View booking history and customer data",
        ],
    },
    {
        id: Sections.Security,
        title: "Security & Reliability",
        content:
            "The system was built with security and stability in mind to ensure safe booking operations.",
        listItems: [
            "JWT-based authentication for admin access",
            "Protected API routes for sensitive operations",
            "Input validation for booking requests",
            "Rate limiting to prevent abuse",
        ],
    },
    {
        id: Sections.Outcome,
        title: "Real-World Outcome",
        content:
            "This system replaced manual booking handling with a structured digital workflow, improving efficiency and reducing communication overhead.",
        listItems: [
            "Faster booking processing",
            "Reduced manual coordination",
            "Clear booking tracking system",
            "Scalable structure for future expansion",
        ],
    },
];

export default function TourSystemPage() {
    return (
        <>
            <Script type="application/ld+json" id="tour-schema">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: "Tour Booking System Full-Stack Platform",
                    description:
                        "A full-stack travel booking system for managing tour packages, customer bookings, and admin operations.",
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
                    Tour Booking System (Full-Stack Platform)
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
                            <Typography
                                variant="h5"
                                sx={{ color: "var(--card-color)", mb: 1 }}
                            >
                                {section.title}
                            </Typography>

                            {section.content && (
                                <Typography sx={{ color: "var(--tech-color)", mb: 2 }}>
                                    {section.content}
                                </Typography>
                            )}
                            {section.images && (
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: {
                                            xs: "1fr",
                                            sm: "repeat(2, 1fr)",
                                        },
                                        gap: 2.5,
                                        mt: 3,
                                    }}
                                >
                                    {section.images.map((img, idx) => (
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
                                                style={{
                                                    objectFit: "cover",
                                                    transition: "transform 0.4s ease",
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            )}
                            {section.listItems && (
                                <List>
                                    {section.listItems.map((item, idx) => (
                                        <ListItem
                                            key={idx}
                                            sx={{
                                                display: "list-item",
                                                color: "var(--card-color)",
                                                py: 0.5,
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
            </Container>
        </>
    );
}