"use client";

import React, { useState } from "react";
import { Container, Typography, Box, Chip, Modal, Fade } from "@mui/material";
import Image from "next/image";
import FadeIn from "../utils/fadeIn";

type SectionType = "job" | "education" | "certificate" | "learning";

interface CertImage {
    src: string;
    alt: string;
}

interface ExperienceItem {
    title: string;
    org?: string;
    desc: string;
    type: SectionType;
    images?: CertImage[];
}

const EXPERIENCE: ExperienceItem[] = [
    {
        title: "Founder & Software Engineer",
        org: "Ariel Solutions",
        desc: "Designed and delivered full-stack systems including CMS platforms, booking engines, Telegram Mini Apps, dashboards, and automation tools. Responsible for architecture, development, deployment, and maintenance.",
        type: "job",
    },
    {
        title: "Cross-Platform Software Developer Intern",
        org: "Web Essentials Co., Ltd.",
        desc: "Contributed to cross-platform applications and backend systems within a professional development team, gaining experience working in a production environment with structured workflows and deadlines.",
        type: "job",
    },
    {
        title: "Freelance Full-Stack Developer",
        org: "ReactJS · NestJS · PostgreSQL",
        desc: "Independently delivered full-stack applications for clients across different industries, handling requirements gathering, development, and deployment end-to-end.",
        type: "job",
    },
];

const EDUCATION: ExperienceItem[] = [
    {
        title: "CS50: Introduction to Computer Science",
        org: "Harvard University",
        desc: "Algorithms, data structures, memory, system design. This is where programming clicked at a deeper level — not just writing code but understanding what it's actually doing.",
        type: "education",
        images: [
            { src: "/arian/cs50.png", alt: "CS50 Certificate" },
        ],
    },
    {
        title: "Computer Programming — JavaScript & the Web",
        org: "Khan Academy",
        desc: "Where it started. JS fundamentals, DOM manipulation, how browsers work. The foundation everything else is built on.",
        type: "education",
        images: [
            // { src: "/certs/khan-academy.png", alt: "Khan Academy Certificate" },
        ],
    },
];

const CERTIFICATES: ExperienceItem[] = [
    {
        title: "Postman API Fundamentals Student Expert",
        org: "Postman",
        desc: "REST API design, testing, auth flows, and integration patterns. Every backend project I ship gets tested this way.",
        type: "certificate",
        images: [
            { src: "/arian/postman-api.png", alt: "Postman Certificate" },
        ],
    },
    {
        title: "AI Introduction Certification",
        org: "TAFE",
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
        desc: "Threat models, cryptography, authentication, and building systems that don't get owned. In progress.",
        type: "learning",
    },
    {
        title: "Artificial Intelligence — Applied",
        org: "TAFE",
        desc: "Going deeper — model integration, intelligent automation, building AI into real software workflows. In progress.",
        type: "learning",
    },
];

const TYPE_CHIP: Record<SectionType, { label: string; bg: string; color: string }> = {
    job: { label: "Work", bg: "#E1F5EE", color: "#085041" },
    education: { label: "Education", bg: "#E6F1FB", color: "#0C447C" },
    certificate: { label: "Certificate", bg: "#EEEDFE", color: "#3C3489" },
    learning: { label: "Learning", bg: "#FAEEDA", color: "#633806" },
};

const STACK = ["TypeScript", "Node.js", "React", "Next.js", "NestJS", "PostgreSQL", "Python", "Material UI", "Expo.js"];

const LINKS = [
    { label: "GitHub", href: "https://github.com/calledarian" },
    { label: "LinkedIn", href: "https://linkedin.com/in/arian-khademolghorani" },
    { label: "Telegram", href: "https://t.me/calledarian" },
];

// --- Expandable image ---
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
                    mt: 2,
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
                            borderRadius: "10px",
                            overflow: "hidden",
                            cursor: "zoom-in",
                            border: "0.5px solid rgba(0,0,0,0.08)",
                            transition: "transform 0.25s ease, box-shadow 0.25s ease",
                            "&:hover": {
                                transform: "translateY(-3px) scale(1.01)",
                                boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
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
                            bgcolor: "rgba(0,0,0,0.85)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "zoom-out",
                            p: 2,
                        }}
                    >
                        {selected && (
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    maxWidth: 900,
                                    aspectRatio: "16 / 10",
                                    borderRadius: "12px",
                                    overflow: "hidden",
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

// --- Card ---
function AboutCard({ item, delay }: { item: ExperienceItem; delay: number }) {
    const chip = TYPE_CHIP[item.type];
    return (
        <FadeIn delay={delay}>
            <Box
                sx={{
                    background: "var(--background)",
                    border: "0.5px solid rgba(0,0,0,0.1)",
                    borderRadius: "16px",
                    p: "1.25rem 1.5rem",
                    height: "100%",
                    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                    "&:hover": {
                        borderColor: "rgba(0,0,0,0.18)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
                    },
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, flexWrap: "wrap" }}>
                    <Chip
                        label={chip.label}
                        size="small"
                        sx={{
                            height: 22,
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            background: chip.bg,
                            color: chip.color,
                            border: "none",
                            borderRadius: "6px",
                        }}
                    />
                    {item.org && (
                        <Typography sx={{ fontSize: "13px", color: "var(--tech-color)", opacity: 0.65, fontWeight: 500 }}>
                            {item.org}
                        </Typography>
                    )}
                </Box>

                <Typography
                    sx={{ fontSize: "17px", fontWeight: 800, color: "var(--foreground)", mb: 0.75, lineHeight: 1.3 }}
                >
                    {item.title}
                </Typography>

                <Typography
                    sx={{ fontSize: "14px", lineHeight: 1.75, color: "var(--tech-color)", fontWeight: 400 }}
                >
                    {item.desc}
                </Typography>

                {item.images && item.images.length > 0 && (
                    <CertImageGrid images={item.images} />
                )}
            </Box>
        </FadeIn>
    );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <Typography
            sx={{
                fontSize: { xs: "11px", sm: "11px" },
                fontWeight: 800,
                color: "var(--card-color)",
                mb: 2,
                mt: 5,
                pb: 1,
                borderBottom: "0.5px solid rgba(0,0,0,0.08)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
            }}
        >
            {children}
        </Typography>
    );
}

export default function AboutPage() {
    return (
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>

            <FadeIn delay={0}>
                <Box sx={{ mb: 4 }}>
                    <Typography
                        component="h1"
                        sx={{
                            fontSize: { xs: "2.2rem", sm: "3rem" },
                            fontWeight: 900,
                            color: "var(--foreground)",
                            mb: 0.5,
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Arian Khademolghorani
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "12px",
                            color: "var(--tech-color)",
                            opacity: 0.55,
                            mb: 2.5,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                        }}
                    >
                        Calledarian · Phnom Penh, Cambodia
                    </Typography>

                    <Typography
                        sx={{ fontSize: "16px", lineHeight: 1.9, color: "var(--tech-color)", maxWidth: 600, mb: 3, fontWeight: 400 }}
                    >
                        I build software that businesses actually use. Started coding with JavaScript,
                        went through CS50, interned at Web Essentials, and now run{" "}
                        <Box component="span" sx={{ color: "var(--card-color)", fontWeight: 700 }}>Ariel Solutions</Box>
                        {" "}— where I ship CMS platforms, booking systems, Telegram Mini Apps,
                        and whatever else clients need built properly. Full stack, TypeScript heavy,
                        always learning.
                    </Typography>
                </Box>
            </FadeIn>

            <SectionHeading>Experience</SectionHeading>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {EXPERIENCE.map((item, i) => (
                    <AboutCard key={item.title} item={item} delay={i * 100} />
                ))}
            </Box>

            <SectionHeading>Education</SectionHeading>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
                {EDUCATION.map((item, i) => (
                    <AboutCard key={item.title} item={item} delay={i * 100} />
                ))}
            </Box>

            <SectionHeading>Certifications</SectionHeading>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
                {CERTIFICATES.map((item, i) => (
                    <AboutCard key={item.title} item={item} delay={i * 100} />
                ))}
            </Box>

            <SectionHeading>Currently Learning</SectionHeading>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
                {LEARNING.map((item, i) => (
                    <AboutCard key={item.title} item={item} delay={i * 100} />
                ))}
            </Box>

        </Container>
    );
}
