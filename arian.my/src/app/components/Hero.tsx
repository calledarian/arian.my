"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import "glightbox/dist/css/glightbox.min.css";
import FadeIn from "../utils/fadeIn";
import NextLink from "next/link";

interface ProjectCard {
  id: number;
  title: string;
  path: string | string[];
  description: string;
  href?: string;
}

const PROJECTS: ProjectCard[] = [
  {
    id: 1,
    title: "Content Management System",
    path: [
      "CMS/cambodia-bible-education-centre-3.png",
      "CMS/cambodia-bible-education-centre-2.png",
      "CMS/cambodia-bible-education-centre-4.png",
      "CMS/cambodia-bible-education-centre.png",
    ],
    description:
      "Developed a high-performance full-stack platform serving as a centralized hub for Bible Education Centre's activities. Administrators can securely manage events and content via a streamlined dashboard, enhancing outreach and improving user engagement.",
    href: "#"
  },
  {
    id: 2,
    title: "Booking Management System",
    path: [
      "BMS/booking-management-system.png",
      "BMS/booking-management-system-2.png",
      "BMS/booking-management-system-3.png",
      "BMS/booking-management-system-5.png",
      "BMS/booking-management-system-4.png",
    ],
    description:
      "Built a secure, automated booking platform for a local tour guide. The system enables clients to book tours seamlessly while giving administrators full control over packages, confirmations, and user requests. Features include robust authentication, spam protection, and efficient admin workflows.",
    href: "#"
  },
  {
    id: 3,
    title: "Food Ordering WebApp",
    path: "SHW/new_order.jpg",
    description:
      "This blog describes a Telegram Mini App built with Next.js and NestJS, allowing customers to place restaurant orders while the backend bot manages workflows efficiently.",
    href: "/blog/food-ordering-webapp"
  },
];

const ProjectCard = ({ project }: { project: ProjectCard }) => {
  const primaryImage = Array.isArray(project.path)
    ? project.path[0]
    : project.path;
  const additionalImages = Array.isArray(project.path)
    ? project.path.slice(1)
    : [];

  return (
    <Card sx={{ borderRadius: 4 }}>
      {/* GLightbox image links */}
      <a
        href={primaryImage}
        className="glightbox"
        data-gallery={`gallery-${project.id}`}
      >
        <CardMedia
          component="img"
          height="200"
          image={primaryImage}
          alt={project.title}
        />
      </a>

      {additionalImages.map((image, index) => (
        <a
          key={index}
          href={image}
          className="glightbox"
          data-gallery={`gallery-${project.id}`}
          style={{ display: "none" }}
        />
      ))}

      {/* Make the whole card clickable if href exists */}
      {project.href ? (
        <CardActionArea component={NextLink} href={project.href}>
          <CardContent
            sx={{
              background: "var(--card-color)",
              color: "var(--card-text)",
              minHeight: 220,
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {project.title}
            </Typography>
            <Typography variant="body2">
              {project.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      ) : (
        <CardContent
          sx={{
            background: "var(--card-color)",
            color: "var(--card-text)",
            minHeight: 220,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography variant="body2">
            {project.description}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default function Hero() {
  useEffect(() => {
    let lightbox: ReturnType<typeof import("glightbox")> | null = null;

    const initializeLightbox = async () => {
      try {
        const GLightbox =
          (await import("glightbox")).default || (await import("glightbox"));
        lightbox = GLightbox({
          selector: ".glightbox",
          loop: true,
        });
      } catch (error) {
        console.error("Failed to initialize GLightbox:", error);
      }
    };

    initializeLightbox();

    return () => {
      if (lightbox?.destroy) {
        lightbox.destroy();
      }
    };
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(345px, 1fr))",
        gap: 2,
      }}
    >
      {PROJECTS.map((project, index) => (
        <FadeIn key={project.id} delay={index * 400}>
          <div>
            <ProjectCard project={project} />
          </div>
        </FadeIn>
      ))}
    </Container>
  );
}
