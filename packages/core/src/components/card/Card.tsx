/**
 * Velora Card
 *
 * A composable card primitive with elevation variants,
 * hover effects, and semantic sub-components.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const cardVariants = cva(
  [
    "relative flex flex-col overflow-hidden",
    "rounded-[var(--velora-radius-card)]",
    "transition-all duration-200",
    "text-[var(--velora-text-primary)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[var(--velora-surface-base)] border border-[var(--velora-border-base)] shadow-[var(--velora-shadow-sm)]",
        raised:
          "bg-[var(--velora-surface-raised)] border border-[var(--velora-border-muted)] shadow-[var(--velora-shadow-md)]",
        flat: "bg-[var(--velora-surface-sunken)] border border-[var(--velora-border-muted)]",
        glass:
          "border border-white/15 bg-white/8 backdrop-blur-xl shadow-[var(--velora-shadow-lg)] before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none",
        gradient:
          "border border-[var(--velora-border-base)] bg-gradient-to-br from-[var(--velora-surface-base)] to-[var(--velora-surface-sunken)] shadow-[var(--velora-shadow-sm)]",
        premium:
          "border border-[var(--velora-brand-subtle)]/60 bg-[var(--velora-surface-base)] shadow-[var(--velora-shadow-sm)] before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-[var(--velora-brand-muted)]/40 before:to-transparent before:pointer-events-none",
        outlined:
          "border-2 border-[var(--velora-border-base)] bg-transparent",
        ghost: "bg-transparent border-transparent",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-0.5 hover:shadow-[var(--velora-shadow-md)] active:translate-y-0 active:shadow-[var(--velora-shadow-xs)]",
        false: "",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
      padding: "none",
    },
  }
);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Focusable / clickable card */
  interactive?: boolean;
}

// ─── Root ────────────────────────────────────────────────────────────────────

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, interactive, padding, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, interactive, padding }),
          className
        )}
        {...(interactive && {
          role: "button",
          tabIndex: 0,
        })}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

// ─── Header ──────────────────────────────────────────────────────────────────

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-5 pb-0", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// ─── Title ───────────────────────────────────────────────────────────────────

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }
>(({ className, as: Tag = "h3", ...props }, ref) => (
  <Tag
    ref={ref}
    className={cn(
      "text-base font-semibold leading-tight tracking-tight text-[var(--velora-text-primary)]",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// ─── Description ─────────────────────────────────────────────────────────────

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--velora-text-tertiary)]", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ─── Content ─────────────────────────────────────────────────────────────────

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5", className)} {...props} />
));
CardContent.displayName = "CardContent";

// ─── Footer ──────────────────────────────────────────────────────────────────

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-3 p-5 pt-0",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// ─── Divider ──────────────────────────────────────────────────────────────────

const CardDivider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("border-t border-[var(--velora-border-muted)]", className)}
    {...props}
  />
));
CardDivider.displayName = "CardDivider";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardDivider,
  cardVariants,
};
