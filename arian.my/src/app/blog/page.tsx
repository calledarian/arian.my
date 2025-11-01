"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Fade,
} from "@mui/material";
import { useEffect } from "react";
import "glightbox/dist/css/glightbox.min.css";
import FadeIn from "../utils/fadeIn";
import Link from "next/link";

interface BlogsCard {
  id: number;
  title: string;
  path: string | string[];
  description: string;
  href: string;
}

const BLOGS: BlogsCard[] = [
  {
    id: 1,
    title: "Building an Audio Waveform in Expo Audio: IOS & ANDROID",
    path: ["expo-audio-soundwave.jpg"],
    description:
      "Most tutorials for audio waveforms rely on outdated expo-av methods that no longer work seamlessly in modern Expo apps. This guide provides a practical, step-by-step approach to implementing a fully functional audio waveform using expo-audio. Perfect for developers who want a working solution for recording, visualizing, and managing audio without the headaches of deprecated APIs.",
    href: "/blog/expo-audio-waveform",
  },
  {
    id: 2,
    title: "Developed a Telegram Restaurant Mini App & Bot for Order Management",
    path: ["SHW/new_order.jpg"],
    description:
      "This blog describes a Telegram Mini App built with Next.js and NestJS, allowing customers to place restaurant orders while the backend bot manages workflows efficiently.",
    href: "/blog/food-ordering-webapp",
  },
];

const BlogCard = ({ blog }: { blog: BlogsCard }) => {
  const primaryImage = Array.isArray(blog.path) ? blog.path[0] : blog.path;

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={primaryImage}
          alt={blog.title}
        />
        <Link href={blog.href} passHref style={{ textDecoration: "none" }}>
          <CardContent
            sx={{
              background: "var(--card-color)",
              color: "var(--card-text)",
              height: 220,
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {blog.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "var(--card-text)" }}>
              {blog.description}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
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
      {BLOGS.map((blog, index) => (
        <FadeIn key={blog.id} delay={index * 400}>
          <BlogCard blog={blog} />
        </FadeIn>
      ))}
    </Container>
  );
}
