/**
 * Velora Dialog
 *
 * Accessible modal dialog built on Radix UI with smooth Framer Motion
 * animations, size variants, and scroll handling.
 */

"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";
import { dialogVariants, overlayVariants } from "../../motion/variants";

// ─── Variants ─────────────────────────────────────────────────────────────────

const dialogContentVariants = cva(
  [
    "fixed z-[1300] flex flex-col",
    "bg-[var(--velora-surface-base)]",
    "border border-[var(--velora-border-base)]",
    "shadow-[var(--velora-shadow-2xl)]",
    "rounded-[var(--velora-radius-card)]",
    "outline-none",
    "max-h-[calc(100dvh-4rem)] overflow-y-auto",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "w-[calc(100%-2rem)] max-w-xs",
        sm: "w-[calc(100%-2rem)] max-w-sm",
        md: "w-[calc(100%-2rem)] max-w-md",
        lg: "w-[calc(100%-2rem)] max-w-lg",
        xl: "w-[calc(100%-2rem)] max-w-xl",
        "2xl": "w-[calc(100%-2rem)] max-w-2xl",
        full: "w-[calc(100%-2rem)] max-w-full mx-4",
      },
      position: {
        center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        top: "left-1/2 top-[10%] -translate-x-1/2",
      },
    },
    defaultVariants: {
      size: "md",
      position: "center",
    },
  }
);

// ─── Re-export Radix primitives ───────────────────────────────────────────────

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// ─── Animated Overlay ─────────────────────────────────────────────────────────

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} {...props} asChild>
    <motion.div
      className={cn(
        "fixed inset-0 z-[1200] bg-[var(--velora-bg-overlay)] backdrop-blur-sm",
        className
      )}
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    />
  </DialogPrimitive.Overlay>
));
DialogOverlay.displayName = "DialogOverlay";

// ─── Animated Content ─────────────────────────────────────────────────────────

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  /** Show close button in top-right corner */
  showClose?: boolean;
  /** Called when the dialog should close (connected to open state) */
  onClose?: () => void;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    { className, size, position, showClose = true, children, ...props },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content ref={ref} {...props} asChild>
          <motion.div
            className={cn(dialogContentVariants({ size, position }), className)}
            variants={shouldReduceMotion ? {} : dialogVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {children}

            {showClose && (
              <DialogClose asChild>
                <button
                  className={cn(
                    "absolute right-4 top-4 rounded-[var(--velora-radius-sm)] p-1.5",
                    "text-[var(--velora-text-tertiary)] hover:text-[var(--velora-text-primary)]",
                    "bg-transparent hover:bg-[var(--velora-bg-subtle)]",
                    "transition-all duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--velora-brand-default)]"
                  )}
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" />
                </button>
              </DialogClose>
            )}
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = "DialogContent";

// ─── Header ──────────────────────────────────────────────────────────────────

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 px-6 py-5 pb-0", className)}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

// ─── Title ───────────────────────────────────────────────────────────────────

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold text-[var(--velora-text-primary)] leading-tight pr-8",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

// ─── Description ─────────────────────────────────────────────────────────────

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-[var(--velora-text-tertiary)]", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

// ─── Body ─────────────────────────────────────────────────────────────────────

const DialogBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-5", className)} {...props} />
));
DialogBody.displayName = "DialogBody";

// ─── Footer ──────────────────────────────────────────────────────────────────

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse gap-2 px-6 py-5 pt-0 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
