import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Box } from "@mui/material";

import "./globals.css";

import Footer from "./layouts/footer";
import { NEW_SITE_URL, OLD_SITE_URL } from "@/lib/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(OLD_SITE_URL),

  title: {
    default: "Arian Khadem has moved — new website at arian.cheddybytes.com",
    template: "%s | Arian Khadem",
  },

  description:
    "Arian Khademolghorani's personal website has permanently moved from arian.my to https://arian.cheddybytes.com. This is the official new site for his portfolio, case studies, and contact.",

  keywords: [
    "Arian Khadem",
    "Arian Khademolghorani",
    "Calledarian",
    "arian.cheddybytes.com",
    "website moved",
  ],

  authors: [{ name: "Arian Khadem", url: NEW_SITE_URL }],
  creator: "Arian Khadem",
  publisher: "Arian Khadem",
  alternates: { canonical: NEW_SITE_URL },

  openGraph: {
    title: "Arian Khadem has a new website",
    description:
      "This website has permanently moved to https://arian.cheddybytes.com.",
    url: NEW_SITE_URL,
    siteName: "Arian Khadem",
    images: [
      {
        url: `${NEW_SITE_URL}/arian/arian-khademolghorani.jpg`,
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
    title: "Arian Khadem has a new website",
    description:
      "This website has permanently moved to https://arian.cheddybytes.com.",
    images: [`${NEW_SITE_URL}/arian/arian-khademolghorani.jpg`],
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
    "@graph": [
      {
        "@type": "Person",
        "@id": `${NEW_SITE_URL}/#person`,
        name: "Arian Khademolghorani",
        alternateName: ["Arian Khadem", "Calledarian"],
        url: NEW_SITE_URL,
        image: `${NEW_SITE_URL}/arian/arian-khademolghorani.jpg`,
        jobTitle: "Full-Stack Software Developer",
        description:
          "Full-stack developer focused on scalable software, CMS platforms, dashboards, automation systems, and API integrations.",
        sameAs: [
          "https://github.com/calledarian",
          "https://linkedin.com/in/arian-khademolghorani",
          OLD_SITE_URL,
        ],
      },
      {
        "@type": "WebPage",
        name: "Arian Khadem has moved to a new website",
        url: `${OLD_SITE_URL}/`,
        description:
          "Arian Khademolghorani's personal website has permanently moved from arian.my to arian.cheddybytes.com.",
        mainEntity: { "@id": `${NEW_SITE_URL}/#person` },
        significantLink: NEW_SITE_URL,
        relatedLink: NEW_SITE_URL,
      },
    ],
  };

  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          fontFamily:
            "var(--font-dm-sans), 'Helvetica Neue', Helvetica, sans-serif",
        }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
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

            <Box component="main" sx={{ flex: 1 }}>
              {children}
            </Box>

            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
