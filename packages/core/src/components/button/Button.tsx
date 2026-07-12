/**
 * Velora Button
 *
 * A fully accessible, animated button component supporting 14 visual variants,
 * 6 sizes, loading states, icon compositions, and the asChild render pattern.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" loading={isLoading}>
 *   Save changes
 * </Button>
 *
 * <Button variant="ghost" size="sm" asChild>
 *   <Link href="/dashboard">Dashboard</Link>
 * </Button>
 * ```
 */

"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const buttonVariants = cva(
  // Base styles applied to every variant
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium transition-all duration-150 select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-[var(--velora-brand-default)]",
    "focus-visible:ring-offset-[var(--velora-bg-base)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
    // Rounded corners via CSS variable for theme overrides
    "rounded-[var(--velora-radius-button)]",
  ].join(" "),
  {
    variants: {
      variant: {
        /** Solid brand-colored button. Primary CTA. */
        default:
          "bg-[var(--velora-brand-default)] text-[var(--velora-brand-fg)] shadow-[var(--velora-shadow-sm)] hover:bg-[var(--velora-brand-emphasis)] hover:shadow-[var(--velora-shadow-brand)]",

        /** Subtle brand button for secondary actions */
        secondary:
          "bg-[var(--velora-brand-subtle)] text-[var(--velora-text-brand)] hover:bg-[var(--velora-brand-muted)] hover:brightness-95",

        /** Outlined border button */
        outline:
          "border border-[var(--velora-border-base)] bg-transparent text-[var(--velora-text-primary)] hover:bg-[var(--velora-bg-subtle)] hover:border-[var(--velora-border-strong)]",

        /** No background, text only */
        ghost:
          "bg-transparent text-[var(--velora-text-primary)] hover:bg-[var(--velora-bg-subtle)]",

        /** Soft muted background */
        soft: "bg-[var(--velora-bg-muted)] text-[var(--velora-text-primary)] hover:bg-[var(--velora-border-muted)]",

        /** Glassmorphism effect */
        glass:
          "border border-white/20 bg-white/10 text-[var(--velora-text-primary)] backdrop-blur-md hover:bg-white/20 hover:border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",

        /** Gradient brand button */
        gradient:
          "bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-[var(--velora-shadow-brand)] hover:from-violet-600 hover:to-cyan-600 hover:shadow-[var(--velora-shadow-brand-lg)]",

        /** Flat, no shadow or elevation */
        flat: "bg-[var(--velora-surface-base)] text-[var(--velora-text-primary)] hover:bg-[var(--velora-surface-raised)]",

        /** High-end gold/luxury aesthetic */
        luxury:
          "bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 font-semibold shadow-[0_4px_16px_-4px_rgba(212,175,55,0.5)] hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.7)]",

        /** Enterprise conservative styling */
        enterprise:
          "bg-[var(--velora-text-primary)] text-[var(--velora-text-inverse)] hover:opacity-90",

        /** Minimal text-only */
        minimal:
          "bg-transparent text-[var(--velora-text-secondary)] underline-offset-4 hover:underline hover:text-[var(--velora-text-primary)]",

        /** Destructive / danger actions */
        destructive:
          "bg-[var(--velora-state-danger)] text-white shadow-[var(--velora-shadow-sm)] hover:bg-rose-600 hover:shadow-[0_0_20px_-4px_rgba(244,63,94,0.5)]",

        /** Positive action confirmation */
        success:
          "bg-[var(--velora-state-success)] text-white shadow-[var(--velora-shadow-sm)] hover:bg-emerald-600 hover:shadow-[0_0_20px_-4px_rgba(16,185,129,0.5)]",

        /** Warning / caution */
        warning:
          "bg-[var(--velora-state-warning)] text-amber-950 shadow-[var(--velora-shadow-sm)] hover:bg-amber-500 hover:shadow-[0_0_20px_-4px_rgba(245,158,11,0.5)]",
      },
      size: {
        xs: "h-7 px-2.5 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        xl: "h-12 px-6 text-base",
        "2xl": "h-14 px-8 text-lg",
        /** Icon-only square button */
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child element (polymorphic) */
  asChild?: boolean;
  /** Show a loading spinner and disable interaction */
  loading?: boolean;
  /** Icon displayed before the label */
  leadingIcon?: React.ReactNode;
  /** Icon displayed after the label */
  trailingIcon?: React.ReactNode;
  /** Screen-reader-only label when using icon-only variant */
  srLabel?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      leadingIcon,
      trailingIcon,
      srLabel,
      children,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const isDisabled = disabled ?? loading;

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size }), className)}
          data-loading={loading}
          aria-disabled={isDisabled}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-busy={loading}
        data-loading={loading}
        {...props}
      >
        {/* Loading spinner */}
        <AnimatePresence mode="wait" initial={false}>
          {loading && (
            <motion.span
              key="loader"
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Content — hidden when loading */}
        <span
          className={cn(
            "inline-flex items-center gap-2 transition-opacity duration-150",
            loading && "opacity-0"
          )}
          aria-hidden={loading}
        >
          {leadingIcon && (
            <span className="shrink-0 text-current/80" aria-hidden>
              {leadingIcon}
            </span>
          )}
          {children}
          {trailingIcon && (
            <span className="shrink-0 text-current/80" aria-hidden>
              {trailingIcon}
            </span>
          )}
        </span>

        {srLabel && <span className="sr-only">{srLabel}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

// ─── Exports ─────────────────────────────────────────────────────────────────

export { Button, buttonVariants };
