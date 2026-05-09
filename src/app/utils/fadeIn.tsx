"use client";

import React, { useRef, useState, useEffect, CSSProperties } from "react";
import { Fade } from "@mui/material";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  once?: boolean;
  threshold?: number;
  style?: CSSProperties;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  once = true,
  threshold = 0.2,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <div ref={ref} style={{ height: "100%", ...style }}>
      <Fade in={visible} style={{ transitionDelay: visible ? `${delay}ms` : "0ms", height: "100%" }}>
        <div style={{ height: "100%" }}>{children}</div>
      </Fade>
    </div>
  );
};

export default FadeIn;
