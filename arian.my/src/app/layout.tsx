import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NavigationBar from "./layouts/navigationBar";
import Footer from "./layouts/footer";
import { Container } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arian Khademolghorani (Calledarian) – Software Developer",
  description:
    "Portfolio of Arian Khademolghorani, also known as Calledarian or Arian Khadem. Showcasing full-stack web, mobile, and automation projects using Next.js and Nest.js.",
  keywords: [
    "Arian Khademolghorani",
    "Arian Khadem",
    "Calledarian",
    "Software Developer",
    "Full-Stack Developer",
    "Web Developer",
    "Portfolio",
    "Personal Website",
  ],

  authors: [
    { name: "Arian Khademolghorani (Calledarian)", url: "https://arian.my" },
  ],

  openGraph: {
    title: "Arian Khademolghorani (Calledarian) – Software Developer",
    description:
      "Portfolio of Arian Khademolghorani, also known as Calledarian or Arian Khadem. Showcasing projects in software development and automation.",
    url: "https://arian.my",
    siteName: "Arian Khademolghorani Portfolio",
    images: [
      {
        url: "https://arian.my/arian/arian-khademolghorani.jpg",
        width: 1200,
        height: 630,
        alt: "Arian Khademolghorani – Software Developer",
      },
    ],
    locale: "en_AU",
    alternateLocale: ["fa_IR", "tr_TR", "km_KH", "en_US"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Arian Khademolghorani (Calledarian) – Software Developer",
    description:
      "Portfolio of Arian Khademolghorani, also known as Calledarian or Arian Khadem. Showcasing projects in software development and automation.",
    images: ["https://arian.my/arian/arian-khademolghorani.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#007acc" />
        <link rel="canonical" href="https://arian.my" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-219DS7TCKT"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-219DS7TCKT');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <NavigationBar />
        <Container maxWidth="lg" sx={{ flex: 1, mt: 4, mb: 4 }}>
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
