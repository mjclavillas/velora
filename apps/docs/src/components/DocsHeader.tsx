"use client";

import Link from "next/link";
import { Button, useTheme, type VeloraTheme, SimpleTooltip } from "@velora/core";
import { Sun, Moon, Monitor, Github, Search, Menu } from "lucide-react";

const themeIcons: Record<string, React.ReactNode> = {
  light: <Sun className="h-4 w-4" />,
  dark: <Moon className="h-4 w-4" />,
  system: <Monitor className="h-4 w-4" />,
};

const themeOrder: VeloraTheme[] = ["light", "dark", "system"];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const currentIdx = themeOrder.indexOf(theme as VeloraTheme);
  const nextTheme = themeOrder[(currentIdx + 1) % themeOrder.length] ?? "dark";
  const nextLabel = `Switch to ${nextTheme} mode`;

  return (
    <SimpleTooltip content={nextLabel}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(nextTheme)}
        aria-label={nextLabel}
      >
        {themeIcons[theme] ?? themeIcons.dark}
      </Button>
    </SimpleTooltip>
  );
}

export function DocsHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-[1100] flex h-16 items-center border-b border-[var(--velora-border-muted)] bg-[var(--velora-bg-base)]/80 backdrop-blur-md px-6">
      <div className="flex w-full items-center gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-[var(--velora-text-primary)]"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg,#8060ff,#1ac8ed)" }}
            aria-hidden
          >
            V
          </span>
          <span className="text-base tracking-tight">
            Velora <span className="text-[var(--velora-text-tertiary)] font-normal">UI</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {[
            { href: "/docs", label: "Docs" },
            { href: "/docs/components/button", label: "Components" },
            { href: "/docs/theming/tokens", label: "Themes" },
            { href: "/docs/examples", label: "Examples" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-[var(--velora-radius-md)] px-3 py-1.5 text-sm text-[var(--velora-text-secondary)] transition-colors hover:bg-[var(--velora-bg-subtle)] hover:text-[var(--velora-text-primary)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Search */}
          <button
            className="hidden md:flex items-center gap-2 h-8 rounded-[var(--velora-radius-md)] border border-[var(--velora-border-base)] bg-[var(--velora-surface-base)] px-3 text-sm text-[var(--velora-text-tertiary)] hover:border-[var(--velora-border-strong)] transition-colors w-44"
            aria-label="Search documentation (⌘K)"
          >
            <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="flex-1 text-left">Search…</span>
            <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)] px-1.5 text-[10px] font-mono text-[var(--velora-text-tertiary)]">
              ⌘K
            </kbd>
          </button>

          <ThemeToggle />

          <SimpleTooltip content="GitHub">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/mjclavillas/velora"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </SimpleTooltip>

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
