"use client";

import { ThemeProvider, ThemeScript, ToastProvider } from "@velora/core";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeScript defaultTheme="dark" />
      <ThemeProvider defaultTheme="dark">
        <ToastProvider position="bottom-right">{children}</ToastProvider>
      </ThemeProvider>
    </>
  );
}
