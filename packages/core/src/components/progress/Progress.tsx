/**
 * Velora Progress
 *
 * Animated progress bar with multiple variants, sizes, and
 * optional label/value display.
 */

"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const progressTrackVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-[var(--velora-bg-muted)]",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-1.5",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: { size: "md" },
  }
);

const progressFillVariants = cva(
  "h-full w-full flex-1 rounded-full transition-all",
  {
    variants: {
      variant: {
        default: "bg-[var(--velora-brand-default)]",
        success: "bg-[var(--velora-state-success)]",
        warning: "bg-[var(--velora-state-warning)]",
        danger: "bg-[var(--velora-state-danger)]",
        info: "bg-[var(--velora-state-info)]",
        gradient: "bg-gradient-to-r from-violet-500 to-cyan-400",
        striped: [
          "bg-[var(--velora-brand-default)]",
          "bg-[length:1rem_1rem]",
          "animate-[progress-stripes_1s_linear_infinite]",
          "[background-image:linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)]",
        ].join(" "),
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressFillVariants> {
  /** Value 0-100 */
  value?: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label */
  label?: string;
  /** Animate the fill on mount */
  animated?: boolean;
  /** Show indeterminate loading animation */
  indeterminate?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      size,
      variant,
      showLabel,
      label,
      animated = true,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
      <div className="flex w-full flex-col gap-1.5">
        {(showLabel || label) && (
          <div className="flex items-center justify-between">
            {label && (
              <span className="text-xs font-medium text-[var(--velora-text-secondary)]">
                {label}
              </span>
            )}
            {showLabel && (
              <span className="text-xs font-semibold tabular-nums text-[var(--velora-text-primary)]">
                {clampedValue}%
              </span>
            )}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressTrackVariants({ size }), className)}
          value={clampedValue}
          {...props}
        >
          {indeterminate ? (
            <motion.div
              className={cn(progressFillVariants({ variant }), "absolute inset-y-0 w-1/3 rounded-full")}
              animate={{ x: ["-100%", "400%"] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            />
          ) : (
            <ProgressPrimitive.Indicator asChild>
              <motion.div
                className={progressFillVariants({ variant })}
                initial={animated ? { width: "0%" } : false}
                animate={{ width: `${clampedValue}%` }}
                transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                style={{ transform: "none" }}
              />
            </ProgressPrimitive.Indicator>
          )}
        </ProgressPrimitive.Root>
      </div>
    );
  }
);

Progress.displayName = "Progress";

// ─── Circular Progress ────────────────────────────────────────────────────────

export interface CircularProgressProps {
  value?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "success" | "warning" | "danger";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const variantColorMap: Record<string, string> = {
  default: "var(--velora-brand-default)",
  success: "var(--velora-state-success)",
  warning: "var(--velora-state-warning)",
  danger: "var(--velora-state-danger)",
};

function CircularProgress({
  value = 0,
  size = 48,
  strokeWidth = 4,
  variant = "default",
  showLabel = false,
  label,
  className,
}: CircularProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;
  const color = variantColorMap[variant] ?? variantColorMap["default"];

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--velora-bg-muted)"
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
        />
      </svg>
      {(showLabel || label) && (
        <span
          className="absolute text-xs font-semibold tabular-nums text-[var(--velora-text-primary)]"
          style={{ fontSize: size * 0.22 }}
        >
          {label ?? `${clampedValue}%`}
        </span>
      )}
    </div>
  );
}

export { Progress, CircularProgress };
