/**
 * Velora Switch
 *
 * Accessible toggle switch with animated thumb, size variants,
 * labels, and color variants.
 */

"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const switchVariants = cva(
  [
    "peer inline-flex shrink-0 cursor-pointer items-center",
    "rounded-full border-2 border-transparent",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-[var(--velora-brand-default)]",
    "focus-visible:ring-offset-[var(--velora-bg-base)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-[var(--velora-brand-default)]",
    "data-[state=unchecked]:bg-[var(--velora-bg-muted)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-5 w-9",
        lg: "h-6 w-11",
        xl: "h-7 w-14",
      },
      colorVariant: {
        brand: "data-[state=checked]:bg-[var(--velora-brand-default)]",
        success: "data-[state=checked]:bg-[var(--velora-state-success)]",
        danger: "data-[state=checked]:bg-[var(--velora-state-danger)]",
        warning: "data-[state=checked]:bg-[var(--velora-state-warning)]",
      },
    },
    defaultVariants: { size: "md", colorVariant: "brand" },
  }
);

const thumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-white shadow-md",
    "ring-0 transition-transform duration-200",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
        md: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        lg: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        xl: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  labelPosition?: "left" | "right";
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      size,
      colorVariant,
      label,
      description,
      labelPosition = "right",
      ...props
    },
    ref
  ) => {
    const switchEl = (
      <SwitchPrimitive.Root
        ref={ref}
        className={cn(switchVariants({ size, colorVariant }), className)}
        {...props}
      >
        <SwitchPrimitive.Thumb className={thumbVariants({ size })} />
      </SwitchPrimitive.Root>
    );

    if (!label && !description) return switchEl;

    return (
      <label className="flex cursor-pointer items-start gap-3 select-none">
        {labelPosition === "left" && (
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-sm font-medium text-[var(--velora-text-primary)]">
              {label}
            </span>
            {description && (
              <span className="text-xs text-[var(--velora-text-tertiary)]">
                {description}
              </span>
            )}
          </div>
        )}
        <div className="mt-0.5">{switchEl}</div>
        {labelPosition === "right" && (
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-[var(--velora-text-primary)]">
              {label}
            </span>
            {description && (
              <span className="text-xs text-[var(--velora-text-tertiary)]">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
