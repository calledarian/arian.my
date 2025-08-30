import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Arian Khademolghorani – Full-stack Developer",
  description: "Portfolio and projects of Arian Khademolghorani, showcasing web, mobile, and AI solutions.",
  keywords: ["Arian Khademolghorani", "Full-stack developer", "React", "Next.js", "TypeScript", "Node.js", "Portfolio"],
  authors: [{ name: "Arian Khademolghorani" }],
  openGraph: {
    title: "Arian Khademolghorani – Full-stack Developer",
    description: "Portfolio and projects of Arian Khademolghorani.",
    url: "https://arian.my",
    siteName: "Arian.my",
    images: [
      {
        url: "https://arian.my/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arian Khademolghorani Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arian Khademolghorani – Full-stack Developer",
    description: "Portfolio and projects of Arian Khademolghorani.",
    creator: "@ariankhadem",
  },
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#007acc" />
        <link rel="canonical" href="https://arian.my" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <NavigationBar />
        <Container maxWidth="lg" component="main" sx={{ flex: 1, mt: 4, mb: 4 }}>
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
