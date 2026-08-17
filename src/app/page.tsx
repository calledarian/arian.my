import MovedNotice from "./components/MovedNotice";
import { NEW_SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "This website has moved",
  description:
    "Arian Khademolghorani's personal website has permanently moved from arian.my to https://arian.cheddybytes.com. Update bookmarks and links to the new official site.",
  alternates: { canonical: NEW_SITE_URL },
  openGraph: {
    title: "Arian Khadem has a new website",
    description:
      "This site has permanently moved to https://arian.cheddybytes.com.",
    url: NEW_SITE_URL,
  },
  other: {
    refresh: `6;url=${NEW_SITE_URL}`,
  },
};

export default function HomePage() {
  return (
    <>
      <MovedNotice />
      <noscript>
        <p>
          This website has moved to{" "}
          <a href={NEW_SITE_URL}>{NEW_SITE_URL}</a>.
        </p>
      </noscript>
    </>
  );
}
