"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command, Dialog, DialogContent } from "@velora/core";
import {
  Layers,
  Palette,
  Puzzle,
  Zap,
  BookOpen,
  Home,
} from "lucide-react";

// ─── Context ─────────────────────────────────────────────────────────────────

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommandPaletteContext = React.createContext<CommandPaletteContextValue>({
  open: false,
  setOpen: () => {},
});

export function useCommandPalette() {
  return React.useContext(CommandPaletteContext);
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

// ─── Navigation items ────────────────────────────────────────────────────────

const navigationItems = [
  { group: "Pages", items: [
    { id: "home", label: "Home", icon: <Home />, href: "/", shortcut: ["H"] },
    { id: "docs", label: "Documentation", icon: <BookOpen />, href: "/docs", shortcut: ["D"] },
    { id: "examples", label: "Examples", icon: <Layers />, href: "/docs/examples", shortcut: ["E"] },
  ]},
  { group: "Components", items: [
    { id: "button", label: "Button", icon: <Puzzle />, href: "/docs/components/button" },
    { id: "card", label: "Card", icon: <Puzzle />, href: "/docs/components/card" },
    { id: "input", label: "Input", icon: <Puzzle />, href: "/docs/components/input" },
    { id: "badge", label: "Badge", icon: <Puzzle />, href: "/docs/components/badge" },
    { id: "avatar", label: "Avatar", icon: <Puzzle />, href: "/docs/components/avatar" },
    { id: "dialog", label: "Dialog", icon: <Puzzle />, href: "/docs/components/dialog" },
    { id: "dropdown", label: "Dropdown Menu", icon: <Puzzle />, href: "/docs/components/dropdown-menu" },
    { id: "tabs", label: "Tabs", icon: <Puzzle />, href: "/docs/components/tabs" },
    { id: "select", label: "Select", icon: <Puzzle />, href: "/docs/components/select" },
    { id: "toast", label: "Toast", icon: <Puzzle />, href: "/docs/components/toast" },
    { id: "tooltip", label: "Tooltip", icon: <Puzzle />, href: "/docs/components/tooltip" },
    { id: "sidebar", label: "Sidebar", icon: <Puzzle />, href: "/docs/components/sidebar" },
    { id: "form", label: "Form", icon: <Puzzle />, href: "/docs/components/form" },
    { id: "data-table", label: "DataTable", icon: <Puzzle />, href: "/docs/components/data-table" },
    { id: "accordion", label: "Accordion", icon: <Puzzle />, href: "/docs/components/accordion" },
    { id: "checkbox", label: "Checkbox", icon: <Puzzle />, href: "/docs/components/checkbox" },
    { id: "switch", label: "Switch", icon: <Puzzle />, href: "/docs/components/switch" },
    { id: "separator", label: "Separator", icon: <Puzzle />, href: "/docs/components/separator" },
    { id: "progress", label: "Progress", icon: <Puzzle />, href: "/docs/components/progress" },
    { id: "skeleton", label: "Skeleton", icon: <Puzzle />, href: "/docs/components/skeleton" },
    { id: "spinner", label: "Spinner", icon: <Puzzle />, href: "/docs/components/spinner" },
    { id: "textarea", label: "Textarea", icon: <Puzzle />, href: "/docs/components/textarea" },
    { id: "command", label: "Command", icon: <Puzzle />, href: "/docs/components/command" },
    { id: "popover", label: "Popover", icon: <Puzzle />, href: "/docs/components/popover" },
    { id: "scroll-area", label: "Scroll Area", icon: <Puzzle />, href: "/docs/components/scroll-area" },
    { id: "navigation-menu", label: "Navigation Menu", icon: <Puzzle />, href: "/docs/components/navigation-menu" },
  ]},
  { group: "Hooks", items: [
    { id: "use-debounce", label: "useDebounce", icon: <Zap />, href: "/docs/hooks/use-debounce" },
    { id: "use-toggle", label: "useToggle", icon: <Zap />, href: "/docs/hooks/use-toggle" },
    { id: "use-keyboard", label: "useKeyboard", icon: <Zap />, href: "/docs/hooks/use-keyboard" },
    { id: "use-copy", label: "useCopyToClipboard", icon: <Zap />, href: "/docs/hooks/use-copy-to-clipboard" },
    { id: "use-local-storage", label: "useLocalStorage", icon: <Zap />, href: "/docs/hooks/use-local-storage" },
    { id: "use-media-query", label: "useMediaQuery", icon: <Zap />, href: "/docs/hooks/use-media-query" },
    { id: "use-count-up", label: "useCountUp", icon: <Zap />, href: "/docs/hooks/use-count-up" },
    { id: "use-click-outside", label: "useClickOutside", icon: <Zap />, href: "/docs/hooks/use-click-outside" },
  ]},
  { group: "Theming", items: [
    { id: "tokens", label: "Design Tokens", icon: <Palette />, href: "/docs/theming/tokens" },
    { id: "css-vars", label: "CSS Variables", icon: <Palette />, href: "/docs/theming/css-variables" },
    { id: "custom-themes", label: "Custom Themes", icon: <Palette />, href: "/docs/theming/custom-themes" },
    { id: "tailwind", label: "Tailwind Plugin", icon: <Palette />, href: "/docs/theming/tailwind-plugin" },
  ]},
  { group: "Animation", items: [
    { id: "fade-in", label: "FadeIn", icon: <Zap />, href: "/docs/motion/fade-in" },
    { id: "stagger", label: "Stagger", icon: <Zap />, href: "/docs/motion/stagger" },
    { id: "reveal", label: "Reveal", icon: <Zap />, href: "/docs/motion/reveal" },
    { id: "parallax", label: "Parallax", icon: <Zap />, href: "/docs/motion/parallax" },
    { id: "variants", label: "Variants", icon: <Zap />, href: "/docs/motion/variants" },
  ]},
  { group: "Examples", items: [
    { id: "dashboard", label: "Dashboard", icon: <Layers />, href: "/examples/dashboard" },
    { id: "auth", label: "Auth Forms", icon: <Layers />, href: "/examples/auth" },
  ]},
];

// ─── Dialog Component ────────────────────────────────────────────────────────

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();

  const items = React.useMemo(() => {
    return navigationItems.flatMap((group) =>
      group.items.map((item) => ({
        id: item.id,
        label: item.label,
        icon: item.icon,
        shortcut: "shortcut" in item ? item.shortcut : undefined,
        group: group.group,
        onSelect: () => {
          router.push(item.href);
          setOpen(false);
        },
      }))
    );
  }, [router, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-lg" showClose={false} aria-label="Command palette">
        <Command
          items={items}
          placeholder="Search docs, components, hooks…"
          emptyText="No results found."
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
