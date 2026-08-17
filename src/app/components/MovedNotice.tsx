"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Container } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { NEW_SITE_URL, REDIRECT_DELAY_SECONDS } from "@/lib/site";

export default function MovedNotice() {
  const [seconds, setSeconds] = useState(REDIRECT_DELAY_SECONDS);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds((remaining) => {
        if (remaining <= 1) {
          window.clearInterval(interval);
          window.location.replace(NEW_SITE_URL);
          return 0;
        }
        return remaining - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        minHeight: { xs: "calc(100vh - 180px)", md: "calc(100vh - 160px)" },
        display: "flex",
        alignItems: "center",
        py: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="sm" sx={{ px: { xs: 3, md: 4 }, textAlign: "center" }}>
        <Avatar
          src="/arian/arian-khademolghorani.jpg"
          alt="Arian Khademolghorani"
          sx={{
            width: 96,
            height: 96,
            mx: "auto",
            mb: 4,
            border: "1px solid var(--border-color)",
          }}
        />

        <Typography
          className="mono"
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-orange)",
            mb: 2,
          }}
        >
          Website moved
        </Typography>

        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "2rem", md: "2.75rem" },
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            mb: 3,
          }}
        >
          I have a new website
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "1.125rem" },
            color: "var(--tech-color)",
            lineHeight: 1.7,
            mb: 2,
          }}
        >
          Arian Khademolghorani (Arian Khadem) has permanently moved this site
          from <strong>arian.my</strong> to the official new website at{" "}
          <Box
            component="a"
            href={NEW_SITE_URL}
            sx={{
              color: "var(--deep-blue)",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            arian.cheddybytes.com
          </Box>
          .
        </Typography>

        <Typography
          sx={{
            fontSize: "0.95rem",
            color: "var(--tech-color)",
            lineHeight: 1.7,
            mb: 5,
          }}
        >
          Portfolio, case studies, and contact details now live there. Please
          update bookmarks, search results, and citations to the new address.
        </Typography>

        <Button
          component="a"
          href={NEW_SITE_URL}
          variant="contained"
          endIcon={<ArrowForward />}
          sx={{
            bgcolor: "var(--deep-blue)",
            color: "#fff",
            px: 3,
            py: 1.25,
            borderRadius: 0,
            fontWeight: 700,
            textTransform: "none",
            fontSize: "15px",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "var(--accent-orange)",
              boxShadow: "none",
            },
          }}
        >
          Go to the new website
        </Button>

        <Typography
          className="mono"
          sx={{
            mt: 4,
            fontSize: "12px",
            color: "var(--tech-color)",
          }}
        >
          Redirecting in {seconds}s
        </Typography>
      </Container>
    </Box>
  );
}
