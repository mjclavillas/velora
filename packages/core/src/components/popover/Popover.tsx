/**
 * Velora Popover
 *
 * Floating content panel with anchor positioning, arrow support,
 * and animated entry via Radix UI.
 */

"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { cn } from "../../utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    showArrow?: boolean;
    showClose?: boolean;
  }
>(
  (
    {
      className,
      align = "center",
      sideOffset = 8,
      showArrow = false,
      showClose = false,
      children,
      ...props
    },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "relative z-[1400] w-72 rounded-[var(--velora-radius-xl)]",
          "border border-[var(--velora-border-base)]",
          "bg-[var(--velora-surface-overlay)]",
          "p-4 shadow-[var(--velora-shadow-xl)]",
          "text-[var(--velora-text-primary)]",
          "outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {showClose && (
          <PopoverPrimitive.Close
            className={cn(
              "absolute right-3 top-3 rounded-[var(--velora-radius-sm)] p-1",
              "text-[var(--velora-text-tertiary)] hover:text-[var(--velora-text-primary)]",
              "hover:bg-[var(--velora-bg-subtle)] transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--velora-brand-default)]"
            )}
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </PopoverPrimitive.Close>
        )}
        {children}
        {showArrow && (
          <PopoverPrimitive.Arrow className="fill-[var(--velora-surface-overlay)]" />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
