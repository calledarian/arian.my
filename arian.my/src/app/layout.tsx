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
  title: "Arian Khademolghorani – Software Developer",
  description:
    "Portfolio and projects of Arian Khademolghorani, showcasing web, mobile, and automation solutions.",
  keywords: [
    "Arian Khademolghorani",
    "Software developer",
    "Calledarian",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Arian Khademolghorani" }],
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
        <Container
          maxWidth="lg"
          sx={{ flex: 1, mt: 4, mb: 4 }}
        >
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
