/**
 * Velora Tailwind Plugin
 *
 * Registers Velora's design tokens, component utilities, and
 * keyframes as Tailwind CSS utilities.
 *
 * @example
 * ```js
 * // tailwind.config.ts
 * import { veloraTailwindPlugin } from "@velora/core/tailwind";
 *
 * export default {
 *   content: [...],
 *   plugins: [veloraTailwindPlugin()],
 * };
 * ```
 */

import plugin from "tailwindcss/plugin";

export interface VeloraPluginOptions {
  /** CSS variable prefix. Defaults to "velora" */
  prefix?: string;
  /** Include glassmorphism utilities */
  glass?: boolean;
  /** Include gradient utilities */
  gradients?: boolean;
}

export function veloraTailwindPlugin(options: VeloraPluginOptions = {}) {
  const { prefix = "velora", glass = true, gradients = true } = options;

  return plugin(
    function ({ addUtilities }) {
      // ─── Keyframes ────────────────────────────────────────────────────

      addUtilities({
        // Accordion animations
        "@keyframes accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "@keyframes accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        ".animate-accordion-down": {
          animation: "accordion-down 200ms ease-out",
        },
        ".animate-accordion-up": {
          animation: "accordion-up 200ms ease-out",
        },

        // Skeleton shimmer
        "@keyframes skeleton-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },

        // Progress stripes
        "@keyframes progress-stripes": {
          "0%": { backgroundPosition: "1rem 0" },
          "100%": { backgroundPosition: "0 0" },
        },

        // Fade animations (used by Radix)
        ".animate-in": { animationFillMode: "both" },
        ".animate-out": { animationFillMode: "both" },
        ".fade-in-0": {
          "@keyframes fade-in": {
            from: { opacity: "0" },
            to: { opacity: "1" },
          },
          animation: "fade-in 150ms ease-out",
        },
        ".fade-out-0": {
          "@keyframes fade-out": {
            from: { opacity: "1" },
            to: { opacity: "0" },
          },
          animation: "fade-out 100ms ease-in",
        },
        ".zoom-in-95": {
          "@keyframes zoom-in": {
            from: { transform: "scale(0.95)" },
            to: { transform: "scale(1)" },
          },
          animation: "zoom-in 150ms ease-out",
        },
        ".zoom-out-95": {
          "@keyframes zoom-out": {
            from: { transform: "scale(1)" },
            to: { transform: "scale(0.95)" },
          },
          animation: "zoom-out 100ms ease-in",
        },
        ".slide-in-from-top-1": {
          "@keyframes slide-from-top": {
            from: { transform: "translateY(-4px)" },
            to: { transform: "translateY(0)" },
          },
          animation: "slide-from-top 150ms ease-out",
        },
        ".slide-in-from-top-2": {
          animation: "slide-from-top 150ms ease-out",
          "--tw-translate-y-from": "-8px",
        },
        ".slide-in-from-bottom-2": {
          "@keyframes slide-from-bottom": {
            from: { transform: "translateY(8px)" },
            to: { transform: "translateY(0)" },
          },
          animation: "slide-from-bottom 150ms ease-out",
        },
        ".slide-in-from-left-1": {
          "@keyframes slide-from-left": {
            from: { transform: "translateX(-4px)" },
            to: { transform: "translateX(0)" },
          },
          animation: "slide-from-left 150ms ease-out",
        },
        ".slide-in-from-left-2": {
          animation: "slide-from-left 150ms ease-out",
        },
        ".slide-in-from-right-1": {
          "@keyframes slide-from-right": {
            from: { transform: "translateX(4px)" },
            to: { transform: "translateX(0)" },
          },
          animation: "slide-from-right 150ms ease-out",
        },
        ".slide-in-from-right-2": {
          animation: "slide-from-right 150ms ease-out",
        },

        // Theme transition
        ".velora-theme-transition *": {
          transitionProperty:
            "background-color, border-color, color, fill, stroke",
          transitionDuration: "200ms",
          transitionTimingFunction: "ease-out",
        },
      });

      // ─── Glass Utilities ───────────────────────────────────────────────

      if (glass) {
        addUtilities({
          ".glass": {
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            "-webkit-backdrop-filter": "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          },
          ".glass-sm": {
            background: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(8px)",
            "-webkit-backdrop-filter": "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
          ".glass-lg": {
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(20px)",
            "-webkit-backdrop-filter": "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          },
          ".glass-dark": {
            background: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(12px)",
            "-webkit-backdrop-filter": "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          },
        });
      }

      // ─── Gradient Utilities ────────────────────────────────────────────

      if (gradients) {
        addUtilities({
          ".gradient-brand": {
            background:
              "linear-gradient(135deg, var(--velora-brand-default), #06add3)",
          },
          ".gradient-brand-subtle": {
            background:
              "linear-gradient(135deg, var(--velora-brand-subtle), var(--velora-state-info-subtle))",
          },
          ".gradient-dark": {
            background:
              "linear-gradient(135deg, #0d1120, #1a2035)",
          },
          ".gradient-text-brand": {
            background:
              "linear-gradient(135deg, var(--velora-brand-default), #06add3)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            backgroundClip: "text",
          },
          ".gradient-text-luxury": {
            background: "linear-gradient(135deg, #d4af37, #f5e168, #d4af37)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            backgroundClip: "text",
          },
          ".gradient-mesh": {
            backgroundImage: `
              radial-gradient(at 40% 20%, hsla(280, 100%, 74%, 0.15) 0px, transparent 50%),
              radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.1) 0px, transparent 50%),
              radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 0.05) 0px, transparent 50%),
              radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 0.08) 0px, transparent 50%),
              radial-gradient(at 0% 100%, hsla(280, 100%, 74%, 0.1) 0px, transparent 50%)
            `,
          },
        });
      }

      // ─── Scrollbar utilities ───────────────────────────────────────────

      addUtilities({
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor:
            "var(--velora-border-base) transparent",
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "var(--velora-border-base)",
            borderRadius: "9999px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "var(--velora-border-strong)",
          },
        },
        ".scrollbar-none": {
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
        },
      });
    },
    {
      theme: {
        extend: {
          colors: {
            velora: {
              brand: "var(--velora-brand-default)",
              "brand-emphasis": "var(--velora-brand-emphasis)",
              "brand-subtle": "var(--velora-brand-subtle)",
              bg: "var(--velora-bg-base)",
              "bg-subtle": "var(--velora-bg-subtle)",
              surface: "var(--velora-surface-base)",
              "text-primary": "var(--velora-text-primary)",
              "text-secondary": "var(--velora-text-secondary)",
              "text-tertiary": "var(--velora-text-tertiary)",
              success: "var(--velora-state-success)",
              warning: "var(--velora-state-warning)",
              danger: "var(--velora-state-danger)",
              info: "var(--velora-state-info)",
              border: "var(--velora-border-base)",
            },
          },
          fontFamily: {
            sans: ["var(--velora-font-sans)"],
            mono: ["var(--velora-font-mono)"],
            display: ["var(--velora-font-display)"],
          },
          boxShadow: {
            "velora-xs": "var(--velora-shadow-xs)",
            "velora-sm": "var(--velora-shadow-sm)",
            "velora-md": "var(--velora-shadow-md)",
            "velora-lg": "var(--velora-shadow-lg)",
            "velora-xl": "var(--velora-shadow-xl)",
            "velora-2xl": "var(--velora-shadow-2xl)",
            "velora-brand": "var(--velora-shadow-brand)",
            "velora-brand-lg": "var(--velora-shadow-brand-lg)",
          },
          borderRadius: {
            velora: "var(--velora-radius-component)",
            "velora-card": "var(--velora-radius-card)",
            "velora-button": "var(--velora-radius-button)",
            "velora-input": "var(--velora-radius-input)",
            "velora-badge": "var(--velora-radius-badge)",
          },
        },
      },
    }
  );
}

export default veloraTailwindPlugin;
