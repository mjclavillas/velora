/**
 * Velora Checkbox
 *
 * Accessible checkbox with animated check mark, indeterminate state,
 * label/description support, and multiple variants.
 */

"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const checkboxVariants = cva(
  [
    "peer shrink-0 rounded-[var(--velora-radius-xs)]",
    "border transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-[var(--velora-brand-default)]",
    "focus-visible:ring-offset-[var(--velora-bg-base)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-[var(--velora-brand-default)] data-[state=checked]:border-[var(--velora-brand-default)]",
    "data-[state=indeterminate]:bg-[var(--velora-brand-default)] data-[state=indeterminate]:border-[var(--velora-brand-default)]",
    "data-[state=unchecked]:border-[var(--velora-border-strong)] data-[state=unchecked]:bg-transparent",
    "data-[state=unchecked]:hover:border-[var(--velora-brand-default)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
      variant: {
        default: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: { size: "md", variant: "default" },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    { className, size, variant, label, description, checked, indeterminate, ...props },
    ref
  ) => {
    const iconSizeMap = { sm: 10, md: 12, lg: 14 };
    const iconSize = iconSizeMap[size ?? "md"];

    const resolvedChecked = indeterminate ? "indeterminate" : checked;

    const checkbox = (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(checkboxVariants({ size, variant }), className)}
        checked={resolvedChecked}
        {...props}
      >
        <CheckboxPrimitive.Indicator asChild forceMount>
          <AnimatePresence initial={false} mode="wait">
            {resolvedChecked === "indeterminate" ? (
              <motion.span
                key="indeterminate"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="flex items-center justify-center text-white"
              >
                <Minus style={{ width: iconSize, height: iconSize }} strokeWidth={3} />
              </motion.span>
            ) : resolvedChecked ? (
              <motion.span
                key="checked"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="flex items-center justify-center text-white"
              >
                <Check style={{ width: iconSize, height: iconSize }} strokeWidth={3} />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (!label && !description) return checkbox;

    return (
      <label className="flex cursor-pointer items-start gap-2.5 select-none group">
        <div className="mt-0.5">{checkbox}</div>
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-medium text-[var(--velora-text-primary)] peer-disabled:opacity-50">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[var(--velora-text-tertiary)]">
              {description}
            </span>
          )}
        </div>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
