/**
 * Velora Badge
 *
 * Status indicators, labels, and counters with dot, icon, and dismissable variants.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 font-medium",
    "rounded-[var(--velora-radius-badge)]",
    "transition-colors duration-150",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[var(--velora-brand-subtle)] text-[var(--velora-text-brand)] border border-[var(--velora-brand-subtle)]",
        secondary:
          "bg-[var(--velora-bg-muted)] text-[var(--velora-text-secondary)] border border-[var(--velora-border-base)]",
        outline:
          "bg-transparent text-[var(--velora-text-primary)] border border-[var(--velora-border-base)]",
        solid:
          "bg-[var(--velora-brand-default)] text-[var(--velora-brand-fg)] border border-[var(--velora-brand-default)]",
        success:
          "bg-[var(--velora-state-success-subtle)] text-[var(--velora-text-success)] border border-[var(--velora-state-success)]/30",
        warning:
          "bg-[var(--velora-state-warning-subtle)] text-[var(--velora-text-warning)] border border-[var(--velora-state-warning)]/30",
        danger:
          "bg-[var(--velora-state-danger-subtle)] text-[var(--velora-text-danger)] border border-[var(--velora-state-danger)]/30",
        info: "bg-[var(--velora-state-info-subtle)] text-cyan-600 dark:text-cyan-400 border border-[var(--velora-state-info)]/30",
        glass:
          "bg-white/10 text-white border border-white/20 backdrop-blur-md",
        gradient:
          "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-[var(--velora-text-brand)] border border-violet-500/30",
      },
      size: {
        xs: "h-4 px-1.5 text-[10px]",
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-2.5 text-xs",
        lg: "h-7 px-3 text-sm",
      },
      dot: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      dot: false,
    },
  }
);

const dotColorMap: Record<string, string> = {
  default: "bg-[var(--velora-brand-default)]",
  secondary: "bg-[var(--velora-text-tertiary)]",
  outline: "bg-[var(--velora-text-secondary)]",
  solid: "bg-white",
  success: "bg-[var(--velora-state-success)]",
  warning: "bg-[var(--velora-state-warning)]",
  danger: "bg-[var(--velora-state-danger)]",
  info: "bg-[var(--velora-state-info)]",
  glass: "bg-white",
  gradient: "bg-[var(--velora-brand-default)]",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a status dot before content */
  dot?: boolean;
  /** Whether the dot should pulse (live indicators) */
  pulseDot?: boolean;
  /** Show dismiss button */
  dismissable?: boolean;
  /** Called when dismiss button is clicked */
  onDismiss?: () => void;
  /** Icon before content */
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size,
      dot,
      pulseDot,
      dismissable,
      onDismiss,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const dotColor = dotColorMap[variant ?? "default"] ?? dotColorMap["default"];

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, dot }), className)}
        {...props}
      >
        {/* Status dot */}
        {(dot || pulseDot) && (
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            {pulseDot && (
              <span
                className={cn(
                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                  dotColor
                )}
                aria-hidden
              />
            )}
            <span
              className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", dotColor)}
              aria-hidden
            />
          </span>
        )}

        {/* Icon */}
        {icon && (
          <span className="shrink-0 [&>svg]:h-3 [&>svg]:w-3" aria-hidden>
            {icon}
          </span>
        )}

        {children}

        {/* Dismiss button */}
        {dismissable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
            className="ml-0.5 -mr-0.5 rounded-full p-0.5 opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-1"
            aria-label="Remove"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
