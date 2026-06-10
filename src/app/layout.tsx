import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import { Container } from "@mui/material";

import "./globals.css";

import NavigationBar from "./layouts/navigationBar";
import Footer from "./layouts/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = "https://arian.my";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Arian Khadem — Full-Stack Developer",
    template: "%s | Arian Khadem",
  },

  description:
    "Full-stack developer building scalable web applications, CMS platforms, dashboards, API integrations, software solutions using Next.js and NestJS.",

  keywords: [
    "Arian Khadem",
    "Arian Khademolghorani",
    "Calledarian",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "NestJS Developer",
    "CMS Development",
    "Dashboard Development",
    "API Integration",
    "Web Development",
    "Automation Systems",
    "Custom Software Solutions",
  ],

  authors: [{ name: "Arian Khadem", url: siteUrl }],
  creator: "Arian Khadem",
  publisher: "Arian Khadem",
  alternates: { canonical: "/" },

  openGraph: {
    title: "Arian Khadem — Full-Stack Developer",
    description:
      "Building systems, scalable web applications, dashboards, CMS platforms, and API integrations tailored for real-world operations.",
    url: siteUrl,
    siteName: "Arian Khadem Portfolio",
    images: [
      {
        url: `${siteUrl}/arian/arian-khademolghorani.jpg`,
        width: 1200,
        height: 630,
        alt: "Arian Khadem — Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Arian Khadem — Full-Stack Developer",
    description:
      "Full-stack developer specializing in scalable web applications, dashboards, CMS systems, and API integrations.",
    images: [`${siteUrl}/arian/arian-khademolghorani.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arian Khademolghorani",
    alternateName: ["Arian Khadem", "Calledarian"],
    url: siteUrl,
    image: `${siteUrl}/arian/arian-khademolghorani.jpg`,
    jobTitle: "Full-Stack Software Developer",
    description:
      "Full-stack developer focused on scalable software, CMS platforms, dashboards, automation systems, and API integrations.",
    knowsAbout: [
      "Next.js", "React", "NestJS", "TypeScript",
      "API Integration", "CMS Development", "Dashboard Development",
      "Automation Systems", "Full-Stack Development", "Software",
    ],
    sameAs: [
      "https://github.com/calledarian",
      "https://linkedin.com/in/arian-khademolghorani",
    ],
  };

  return (
    <html lang="en" className={dmSans.variable}>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          fontFamily: "var(--font-dm-sans), 'Helvetica Neue', Helvetica, sans-serif",
        }}
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(structuredData)}
        </Script>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        <NavigationBar />

        <Container
          component="main"
          maxWidth="lg"
          sx={{ flex: 1, py: { xs: 4, md: 8 } }}
        >
          {children}
        </Container>

        <Footer />
      </body>
    </html>
  );
}