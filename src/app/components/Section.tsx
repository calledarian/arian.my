"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import FadeIn from "../utils/fadeIn";

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  delay?: number;
  noBorder?: boolean;
}

export default function Section({ id, title, children, maxWidth = "lg", delay = 0, noBorder = false }: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        borderTop: noBorder ? "none" : "1px solid var(--border-color)",
        scrollMarginTop: "80px",
        background: "transparent",
      }}
    >
      <Container maxWidth={maxWidth} sx={{ py: { xs: 8, md: 10 }, px: { xs: 3, md: 4 } }}>
        {title && (
          <FadeIn delay={delay}>
            <Typography
              className="mono"
              sx={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--accent-orange)",
                mb: 6,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {"//"} {title}
            </Typography>
          </FadeIn>
        )}
        <Box>{children}</Box>
      </Container>
    </Box>
  );
}
