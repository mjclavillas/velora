/**
 * Velora Accordion
 *
 * Animated collapsible sections with multiple style variants
 * and full keyboard accessibility via Radix UI.
 */

"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const accordionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "divide-y divide-[var(--velora-border-muted)]",
      bordered:
        "rounded-[var(--velora-radius-xl)] border border-[var(--velora-border-base)] overflow-hidden divide-y divide-[var(--velora-border-muted)]",
      cards: "flex flex-col gap-2",
      ghost: "flex flex-col gap-1",
    },
  },
  defaultVariants: { variant: "default" },
});

const itemVariants = cva("", {
  variants: {
    variant: {
      default: "py-0",
      bordered: "bg-[var(--velora-surface-base)]",
      cards:
        "rounded-[var(--velora-radius-lg)] border border-[var(--velora-border-base)] bg-[var(--velora-surface-base)] overflow-hidden shadow-[var(--velora-shadow-xs)]",
      ghost: "rounded-[var(--velora-radius-lg)] overflow-hidden",
    },
  },
  defaultVariants: { variant: "default" },
});

const triggerVariants = cva(
  [
    "flex w-full items-center justify-between gap-4 text-left",
    "font-medium text-[var(--velora-text-primary)]",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--velora-brand-default)]",
    "[&[data-state=open]>svg]:rotate-180",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "py-4 text-sm hover:text-[var(--velora-text-brand)]",
        bordered: "px-4 py-4 text-sm hover:bg-[var(--velora-bg-subtle)]",
        cards: "px-4 py-4 text-sm hover:bg-[var(--velora-bg-subtle)]",
        ghost:
          "px-3 py-3 text-sm hover:bg-[var(--velora-bg-subtle)] rounded-[var(--velora-radius-lg)] data-[state=open]:rounded-b-none",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const contentVariants = cva(
  [
    "overflow-hidden text-sm text-[var(--velora-text-secondary)]",
    "data-[state=closed]:animate-accordion-up",
    "data-[state=open]:animate-accordion-down",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "pb-4",
        bordered: "px-4 pb-4",
        cards: "px-4 pb-4",
        ghost: "px-3 pb-3",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

// ─── Context ─────────────────────────────────────────────────────────────────

const AccordionVariantContext = React.createContext<
  VariantProps<typeof accordionVariants>["variant"]
>("default");

// ─── Root ─────────────────────────────────────────────────────────────────────

interface AccordionRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  type: "single" | "multiple";
  collapsible?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ className, variant, type, collapsible, children, ...props }, ref) => (
    <AccordionVariantContext.Provider value={variant}>
      <AccordionPrimitive.Root
        ref={ref}
        type={type}
        collapsible={collapsible}
        className={cn(accordionVariants({ variant }), className)}
        {...(props as any)}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionVariantContext.Provider>
  )
);
Accordion.displayName = "Accordion";

// ─── Item ─────────────────────────────────────────────────────────────────────

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(itemVariants({ variant }), className)}
      {...props}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

// ─── Trigger ─────────────────────────────────────────────────────────────────

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    icon?: React.ReactNode;
  }
>(({ className, children, icon, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(triggerVariants({ variant }), className)}
        {...props}
      >
        <span className="flex items-center gap-2">
          {icon && (
            <span className="shrink-0 text-[var(--velora-text-tertiary)] [&>svg]:h-4 [&>svg]:w-4">
              {icon}
            </span>
          )}
          {children}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-[var(--velora-text-tertiary)] transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

// ─── Content ─────────────────────────────────────────────────────────────────

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(contentVariants({ variant }), className)}
      {...props}
    >
      <div>{children}</div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
