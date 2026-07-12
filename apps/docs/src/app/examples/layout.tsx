import "@velora/core/styles";
import "./globals.css";
import { Providers } from "../../components/Providers";

export default function ExamplesLayout({
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
