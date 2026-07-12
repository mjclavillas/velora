import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velora UI Playground",
  description: "Interactive playground for Velora UI components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
