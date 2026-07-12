"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@velora/core";

interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
      { title: "Theming", href: "/docs/theming" },
      { title: "TypeScript", href: "/docs/typescript" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Command", href: "/docs/components/command", badge: "⌘K" },
      { title: "DataTable", href: "/docs/components/data-table" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Form", href: "/docs/components/form" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Navigation Menu", href: "/docs/components/navigation-menu" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Scroll Area", href: "/docs/components/scroll-area" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Sidebar", href: "/docs/components/sidebar" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Spinner", href: "/docs/components/spinner" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
  {
    title: "Hooks",
    items: [
      { title: "useDebounce", href: "/docs/hooks/use-debounce" },
      { title: "useLocalStorage", href: "/docs/hooks/use-local-storage" },
      { title: "useMediaQuery", href: "/docs/hooks/use-media-query" },
      { title: "useClickOutside", href: "/docs/hooks/use-click-outside" },
      { title: "useCopyToClipboard", href: "/docs/hooks/use-copy-to-clipboard" },
      { title: "useCountUp", href: "/docs/hooks/use-count-up" },
      { title: "useToggle", href: "/docs/hooks/use-toggle" },
      { title: "useKeyboard", href: "/docs/hooks/use-keyboard" },
    ],
  },
  {
    title: "Animation",
    items: [
      { title: "FadeIn", href: "/docs/motion/fade-in" },
      { title: "Stagger", href: "/docs/motion/stagger" },
      { title: "Reveal", href: "/docs/motion/reveal" },
      { title: "Parallax", href: "/docs/motion/parallax" },
      { title: "Typewriter", href: "/docs/motion/typewriter" },
      { title: "AnimatedNumber", href: "/docs/motion/animated-number" },
      { title: "Variants", href: "/docs/motion/variants" },
    ],
  },
  {
    title: "Theming",
    items: [
      { title: "Design Tokens", href: "/docs/theming/tokens" },
      { title: "CSS Variables", href: "/docs/theming/css-variables" },
      { title: "Custom Themes", href: "/docs/theming/custom-themes" },
      { title: "Tailwind Plugin", href: "/docs/theming/tailwind-plugin" },
    ],
  },
  {
    title: "Examples",
    items: [
      { title: "Dashboard", href: "/examples/dashboard", badge: "Full" },
      { title: "Auth Forms", href: "/examples/auth", badge: "Full" },
      { title: "All Previews", href: "/docs/examples" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-[var(--velora-border-muted)] py-8 pr-2 lg:block scrollbar-thin">
      <nav aria-label="Documentation navigation">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--velora-text-tertiary)]">
              {section.title}
            </p>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-[var(--velora-radius-md)] px-3 py-1.5 text-sm transition-colors duration-100",
                        isActive
                          ? "bg-[var(--velora-brand-subtle)] font-medium text-[var(--velora-text-brand)]"
                          : "text-[var(--velora-text-secondary)] hover:bg-[var(--velora-bg-subtle)] hover:text-[var(--velora-text-primary)]"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.title}
                      {item.badge && (
                        <span className="rounded-full bg-[var(--velora-brand-subtle)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--velora-text-brand)]">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
