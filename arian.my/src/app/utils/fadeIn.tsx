'use client'
import React, { useRef, useState, useEffect } from "react";
import { Fade } from "@mui/material";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;       // optional delay in ms
  once?: boolean;       // fade only once or every time it's visible
  threshold?: number;   // how much of element must be visible (0-1)
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  once = true,
  threshold = 0.2,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) {
            observer.disconnect(); // stop observing after first show
          }
        } else if (!once) {
          setVisible(false); // reset if you want repeated animations
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <div ref={ref}>
      <Fade in={visible} style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}>
        <div>{children}</div>
      </Fade>
    </div>
  );
};

export default FadeIn;
