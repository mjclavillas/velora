import type { Metadata, Viewport } from "next";
import { Providers } from "../components/Providers";
import "@velora/core/styles";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Velora UI",
    template: "%s — Velora UI",
  },
  description:
    "Premium React UI Ecosystem. Beautiful, accessible, and theme-first components built with Radix UI and Framer Motion.",
  keywords: [
    "react",
    "component library",
    "ui",
    "design system",
    "typescript",
    "tailwind",
    "radix",
    "framer-motion",
    "accessible",
    "dark mode",
  ],
  authors: [{ name: "Velora Contributors" }],
  creator: "Velora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://velora.dev",
    title: "Velora UI",
    description: "Premium React UI Ecosystem",
    siteName: "Velora UI",
    images: [
      {
        url: "https://velora.dev/og.png",
        width: 1200,
        height: 630,
        alt: "Velora UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora UI",
    description: "Premium React UI Ecosystem",
    images: ["https://velora.dev/og.png"],
    creator: "@velora_ui",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d1120" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-[var(--velora-bg-base)] font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
