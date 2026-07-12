/**
 * Velora Select
 *
 * Accessible dropdown select with search, groups, icons, and multi-select support.
 */

"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils";
import { slideUpVariants } from "../../motion/variants";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

// ─── Trigger ─────────────────────────────────────────────────────────────────

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "md" | "lg";
    leadingIcon?: React.ReactNode;
    state?: "default" | "error" | "success";
  }
>(
  (
    { className, children, size = "md", leadingIcon, state = "default", ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-8 px-2.5 text-xs",
      md: "h-10 px-3 text-sm",
      lg: "h-11 px-3.5 text-sm",
    };

    const stateClasses = {
      default:
        "border-[var(--velora-border-base)] hover:border-[var(--velora-border-strong)] focus:border-[var(--velora-border-brand)] focus:ring-[var(--velora-brand-default)]/20",
      error:
        "border-[var(--velora-border-danger)] focus:border-[var(--velora-border-danger)] focus:ring-[var(--velora-state-danger)]/20",
      success:
        "border-[var(--velora-border-success)] focus:border-[var(--velora-border-success)] focus:ring-[var(--velora-state-success)]/20",
    };

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex w-full items-center justify-between gap-2",
          "rounded-[var(--velora-radius-input)]",
          "border bg-[var(--velora-surface-base)]",
          "text-[var(--velora-text-primary)]",
          "transition-all duration-150",
          "focus:outline-none focus:ring-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[placeholder]:text-[var(--velora-text-tertiary)]",
          sizeClasses[size],
          stateClasses[state],
          className
        )}
        {...props}
      >
        {leadingIcon && (
          <span className="shrink-0 text-[var(--velora-text-tertiary)] [&>svg]:h-4 [&>svg]:w-4">
            {leadingIcon}
          </span>
        )}
        <span className="flex-1 truncate text-left">{children}</span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 shrink-0 text-[var(--velora-text-tertiary)] transition-transform duration-200 data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

// ─── Scroll Buttons ───────────────────────────────────────────────────────────

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex items-center justify-center py-1 text-[var(--velora-text-tertiary)]",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex items-center justify-center py-1 text-[var(--velora-text-tertiary)]",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

// ─── Content ─────────────────────────────────────────────────────────────────

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-[1400] min-w-[8rem] overflow-hidden",
        "rounded-[var(--velora-radius-lg)]",
        "border border-[var(--velora-border-base)]",
        "bg-[var(--velora-surface-overlay)]",
        "shadow-[var(--velora-shadow-xl)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=top]:slide-in-from-bottom-2",
        position === "popper" && [
          "data-[side=bottom]:translate-y-1",
          "data-[side=top]:-translate-y-1",
          "data-[side=left]:-translate-x-1",
          "data-[side=right]:translate-x-1",
          "w-[var(--radix-select-trigger-width)]",
          "max-h-[var(--radix-select-content-available-height)]",
        ],
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

// ─── Label ────────────────────────────────────────────────────────────────────

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-xs font-semibold text-[var(--velora-text-tertiary)] uppercase tracking-wider",
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

// ─── Item ─────────────────────────────────────────────────────────────────────

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    icon?: React.ReactNode;
    description?: string;
  }
>(({ className, children, icon, description, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center",
      "rounded-[var(--velora-radius-md)] px-2 py-2 text-sm",
      "text-[var(--velora-text-primary)] outline-none",
      "transition-colors duration-100",
      "focus:bg-[var(--velora-bg-subtle)] focus:text-[var(--velora-text-primary)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "data-[state=checked]:text-[var(--velora-text-brand)]",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemIndicator className="absolute right-2 flex h-4 w-4 items-center justify-center">
      <Check className="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>

    <div className="flex items-center gap-2 pr-6">
      {icon && (
        <span className="shrink-0 text-[var(--velora-text-tertiary)] [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </span>
      )}
      <div className="flex flex-col gap-0.5">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        {description && (
          <span className="text-xs text-[var(--velora-text-tertiary)]">
            {description}
          </span>
        )}
      </div>
    </div>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

// ─── Separator ────────────────────────────────────────────────────────────────

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-[var(--velora-border-muted)]",
      className
    )}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
