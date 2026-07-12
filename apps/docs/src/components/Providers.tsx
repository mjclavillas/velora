"use client";

import { ThemeProvider, ThemeScript, ToastProvider } from "@velora/core";
import { CommandPaletteProvider, CommandPalette } from "./CommandPalette";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeScript defaultTheme="dark" />
      <ThemeProvider defaultTheme="dark">
        <ToastProvider position="bottom-right">
          <CommandPaletteProvider>
            {children}
            <CommandPalette />
          </CommandPaletteProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}
