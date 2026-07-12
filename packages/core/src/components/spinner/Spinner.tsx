/**
 * Velora Spinner
 *
 * Loading indicators with multiple styles and sizes.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const spinnerVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-7 w-7",
      xl: "h-9 w-9",
      "2xl": "h-12 w-12",
    },
    variant: {
      default: "text-[var(--velora-brand-default)]",
      muted: "text-[var(--velora-text-tertiary)]",
      white: "text-white",
      success: "text-[var(--velora-state-success)]",
      danger: "text-[var(--velora-state-danger)]",
    },
  },
  defaultVariants: { size: "md", variant: "default" },
});

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

// ─── Ring Spinner ─────────────────────────────────────────────────────────────

function Spinner({ className, size, variant, label = "Loading...", ...props }: SpinnerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={cn(spinnerVariants({ size, variant }), "animate-spin", className)}
      aria-label={label}
      role="status"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Dots Spinner ─────────────────────────────────────────────────────────────

function SpinnerDots({ size, variant, className, label = "Loading..." }: SpinnerProps) {
  const sizeMap = { xs: 4, sm: 5, md: 6, lg: 8, xl: 10, "2xl": 12 };
  const dotSize = sizeMap[size ?? "md"];

  return (
    <div
      role="status"
      aria-label={label}
      className={cn("flex items-center gap-1", className)}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "rounded-full",
            variant === "white"
              ? "bg-white"
              : variant === "muted"
              ? "bg-[var(--velora-text-tertiary)]"
              : "bg-[var(--velora-brand-default)]",
            "animate-[bounce_0.8s_ease-in-out_infinite]"
          )}
          style={{
            width: dotSize,
            height: dotSize,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Pulse Spinner ────────────────────────────────────────────────────────────

function SpinnerPulse({ size, variant, className, label = "Loading..." }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        spinnerVariants({ size, variant }),
        "relative inline-flex rounded-full",
        className
      )}
    >
      <span
        className={cn(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
          variant === "white"
            ? "bg-white"
            : "bg-[var(--velora-brand-default)]"
        )}
      />
      <span
        className={cn(
          "relative inline-flex rounded-full h-full w-full",
          variant === "white"
            ? "bg-white"
            : "bg-[var(--velora-brand-default)]"
        )}
      />
    </span>
  );
}

// ─── Full-screen Loading Overlay ──────────────────────────────────────────────

interface LoadingOverlayProps {
  visible: boolean;
  label?: string;
  blur?: boolean;
}

function LoadingOverlay({ visible, label = "Loading...", blur = true }: LoadingOverlayProps) {
  if (!visible) return null;
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex flex-col items-center justify-center gap-3",
        "bg-[var(--velora-bg-base)]/80",
        blur && "backdrop-blur-sm",
        "rounded-[inherit]"
      )}
      role="status"
      aria-label={label}
    >
      <Spinner size="lg" />
      {label && (
        <p className="text-sm font-medium text-[var(--velora-text-secondary)]">
          {label}
        </p>
      )}
    </div>
  );
}

export { Spinner, SpinnerDots, SpinnerPulse, LoadingOverlay };
