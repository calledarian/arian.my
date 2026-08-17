import { NextRequest, NextResponse } from "next/server";
import { NEW_SITE_URL } from "./lib/site";

const PASSTHROUGH = new Set([
  "/",
  "/robots.txt",
  "/sitemap.xml",
  "/sitemap-0.xml",
  "/llms.txt",
  "/favicon.ico",
]);

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (PASSTHROUGH.has(pathname)) {
    const response = NextResponse.next();
    if (pathname === "/") {
      response.headers.set("Link", `<${NEW_SITE_URL}/>; rel="canonical"`);
    }
    return response;
  }

  return NextResponse.redirect(`${NEW_SITE_URL}${pathname}${search}`, {
    status: 301,
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?)$).*)",
  ],
};
