"use client";

import React, { useState } from "react";
import { Box, Typography, Modal, Fade, Chip } from "@mui/material";
import Image from "next/image";
import FadeIn from "../utils/fadeIn";

type SectionType = "job" | "education" | "certificate" | "learning" | "development";

interface CertImage {
    src: string;
    alt: string;
}

interface ExperienceItem {
    title: string;
    org?: string;
    desc: string;
    year?: string;
    type: SectionType;
    images?: CertImage[];
}

const EXPERIENCE: ExperienceItem[] = [
    {
        title: "Software Engineer",
        org: "",
        year: "2026 - 2027",
        desc: "Build stuff. Maintain stuff. Ship stuff. Expand my learning and experience acroos platforms, languages, and frameworks. Not just a developer, but a solution architect and problem solver.",
        type: "development",
    },
    {
        title: "Cross-Platform Software Developer Intern",
        org: "Web Essentials Co., Ltd.",
        year: "2025 - 2026",
        desc: "Contributed to cross-platform applications and backend systems within a professional development team, gaining experience in production workflows.",
        type: "development",
    },
    {
        title: "Developer Student",
        org: "Self Thought Student",
        year: "2024 - 2025",
        desc: "Built full-stack applications using ReactJS, NestJS, and PostgreSQL, handling requirements gathering and deployment end-to-end.",
        type: "development",
    },
];

const EDUCATION: ExperienceItem[] = [
    {
        title: "CS50: Introduction to Computer Science",
        org: "Harvard University",
        year: "2025",
        desc: "Algorithms, data structures, and system design. This is where programming clicked at a deeper level — not just writing code but understanding what it's actually doing.",
        type: "education",
        images: [
            { src: "/arian/cs50.png", alt: "CS50 Certificate" },
        ],
    },
    {
        title: "Computer Programming — JavaScript & the Web",
        org: "Khan Academy",
        year: "2024 - 2025",
        desc: "JS fundamentals, DOM manipulation, how browsers work. The foundation everything else is built on.",
        type: "education",
    },
];

const CERTIFICATES: ExperienceItem[] = [
    {
        title: "Postman API Fundamentals Student Expert",
        org: "Postman",
        year: "2025",
        desc: "REST API design, testing, auth flows, and integration patterns. Every backend project I ship gets tested this way.",
        type: "certificate",
        images: [
            { src: "/arian/postman-api.png", alt: "Postman Certificate" },
        ],
    },
    {
        title: "AI Introduction Certification",
        org: "TAFE",
        year: "2025",
        desc: "ML principles, data-driven systems, and practical AI applications. Already using this to build smarter automation into production projects.",
        type: "certificate",
        images: [
            { src: "/arian/tafe-ai.jpg", alt: "TAFE AI Certificate" },
        ],
    },
];

const LEARNING: ExperienceItem[] = [
    {
        title: "CS50: Cybersecurity",
        org: "Harvard University",
        year: "In Progress",
        desc: "Threat models, cryptography, authentication, and building systems that don't get owned.",
        type: "learning",
    },
    {
        title: "Artificial Intelligence — Applied",
        org: "TAFE",
        year: "In Progress",
        desc: "Model integration, intelligent automation, building AI into real software workflows.",
        type: "learning",
    },
];

const TYPE_CHIP: Record<SectionType, { bg: string; color: string }> = {
    job: { bg: "var(--tag-teal-bg)", color: "var(--tag-teal-text)" },
    education: { bg: "var(--tag-blue-bg)", color: "var(--tag-blue-text)" },
    certificate: { bg: "var(--tag-purple-bg)", color: "var(--tag-purple-text)" },
    learning: { bg: "var(--tag-orange-bg)", color: "var(--tag-orange-text)" },
    development: { bg: "var(--tag-green-bg)", color: "var(--tag-green-text)" },
};

function CertImageGrid({ images }: { images: CertImage[] }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<CertImage | null>(null);

    if (!images.length) return null;

    const handleOpen = (img: CertImage) => {
        setSelected(img);
        setOpen(true);
    };

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                    gap: 2,
                    mt: 3,
                }}
            >
                {images.map((img, idx) => (
                    <Box
                        key={idx}
                        onClick={() => handleOpen(img)}
                        sx={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "16 / 10",
                            borderRadius: "4px",
                            overflow: "hidden",
                            cursor: "zoom-in",
                            border: "1px solid var(--border-color)",
                            transition: "transform 0.25s ease",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                        }}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </Box>
                ))}
            </Box>

            <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
                <Fade in={open} timeout={400}>
                    <Box
                        onClick={() => setOpen(false)}
                        sx={{
                            position: "fixed",
                            inset: 0,
                            bgcolor: "rgba(0,0,0,0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "zoom-out",
                            p: 2,
                            zIndex: 9999,
                        }}
                    >
                        {selected && (
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    maxWidth: 1000,
                                    aspectRatio: "16 / 10",
                                }}
                            >
                                <Image
                                    src={selected.src}
                                    alt={selected.alt}
                                    fill
                                    style={{ objectFit: "contain" }}
                                />
                            </Box>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

function GridRow({ item, index }: { item: ExperienceItem; index: number }) {
    const chipStyle = TYPE_CHIP[item.type];
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "250px 1fr" },
                gap: { xs: 2, md: 4 },
                py: 5,
                borderTop: "1px solid var(--border-color)",
            }}
        >
            <FadeIn delay={index * 100}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography className="mono" sx={{ fontSize: "12px", color: "var(--tech-color)", fontWeight: 600 }}>
                        {item.year}
                    </Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
                        {item.org}
                    </Typography>
                    <Chip
                        label={item.type.toUpperCase()}
                        size="small"
                        sx={{
                            alignSelf: "flex-start",
                            height: 20,
                            fontSize: "10px",
                            fontWeight: 700,
                            borderRadius: "4px",
                            bgcolor: chipStyle.bg,
                            color: chipStyle.color,
                        }}
                    />
                </Box>
            </FadeIn>

            <FadeIn delay={index * 100 + 50}>
                <Typography sx={{ fontSize: "18px", fontWeight: 800, mb: 1.5 }}>
                    {item.title}
                </Typography>
                <Typography sx={{ fontSize: "15px", color: "var(--tech-color)", lineHeight: 1.8, maxWidth: 650 }}>
                    {item.desc}
                </Typography>
                {item.images && <CertImageGrid images={item.images} />}
            </FadeIn>
        </Box>
    );
}

export default function AboutPage() {
    return (
        <Box>
            <Box sx={{ mb: 8 }}>
                <Typography sx={{ fontSize: "22px", lineHeight: 1.6, color: "var(--foreground)", maxWidth: 750, fontWeight: 500 }}>
                    I build reliable software for the web. From CMS platforms to automation workflows, I enjoy solving technical problems that have real-world impact.
                </Typography>
            </Box>

            <Typography className="mono" sx={{ fontSize: "12px", color: "var(--tech-color)", mb: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {"//"} Experience
            </Typography>
            <Box sx={{ borderBottom: "1px solid var(--border-color)", mb: 10 }}>
                {EXPERIENCE.map((item, i) => (
                    <GridRow key={item.title} item={item} index={i} />
                ))}
            </Box>

            <Typography className="mono" sx={{ fontSize: "12px", color: "var(--tech-color)", mb: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {"//"} Education
            </Typography>
            <Box sx={{ borderBottom: "1px solid var(--border-color)", mb: 10 }}>
                {EDUCATION.map((item, i) => (
                    <GridRow key={item.title} item={item} index={i} />
                ))}
            </Box>

            <Typography className="mono" sx={{ fontSize: "12px", color: "var(--tech-color)", mb: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {"//"} Certifications
            </Typography>
            <Box sx={{ borderBottom: "1px solid var(--border-color)", mb: 10 }}>
                {CERTIFICATES.map((item, i) => (
                    <GridRow key={item.title} item={item} index={i} />
                ))}
            </Box>

            <Typography className="mono" sx={{ fontSize: "12px", color: "var(--tech-color)", mb: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {"//"} Currently Learning
            </Typography>
            <Box sx={{ borderBottom: "1px solid var(--border-color)" }}>
                {LEARNING.map((item, i) => (
                    <GridRow key={item.title} item={item} index={i} />
                ))}
            </Box>
        </Box>
    );
}
