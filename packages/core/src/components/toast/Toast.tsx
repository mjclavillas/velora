/**
 * Velora Toast
 *
 * Animated notification system with a useToast hook, action support,
 * auto-dismiss, and multiple positions.
 */

"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";
import { toastVariants as motionVariants } from "../../motion/variants";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastData {
  id: string;
  variant?: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ─── Toast Store ─────────────────────────────────────────────────────────────

type ToastStore = {
  toasts: ToastData[];
  add: (toast: Omit<ToastData, "id">) => string;
  remove: (id: string) => void;
  removeAll: () => void;
};

const ToastStoreContext = React.createContext<ToastStore | null>(null);

let toastCount = 0;

// ─── Variants ─────────────────────────────────────────────────────────────────

const toastStyleVariants = cva(
  [
    "relative flex w-full max-w-sm items-start gap-3 rounded-[var(--velora-radius-lg)]",
    "border p-4 shadow-[var(--velora-shadow-lg)]",
    "bg-[var(--velora-surface-overlay)]",
    "transition-all duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-[var(--velora-border-base)]",
        success:
          "border-[var(--velora-state-success)]/30 bg-[var(--velora-state-success-subtle)]",
        error:
          "border-[var(--velora-state-danger)]/30 bg-[var(--velora-state-danger-subtle)]",
        warning:
          "border-[var(--velora-state-warning)]/30 bg-[var(--velora-state-warning-subtle)]",
        info: "border-[var(--velora-state-info)]/30 bg-[var(--velora-state-info-subtle)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const iconMap: Record<ToastVariant, React.ReactNode> = {
  default: null,
  success: (
    <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--velora-state-success)]" />
  ),
  error: (
    <AlertCircle className="h-5 w-5 shrink-0 text-[var(--velora-state-danger)]" />
  ),
  warning: (
    <AlertTriangle className="h-5 w-5 shrink-0 text-[var(--velora-state-warning)]" />
  ),
  info: (
    <Info className="h-5 w-5 shrink-0 text-[var(--velora-state-info)]" />
  ),
};

// ─── Toast Item ───────────────────────────────────────────────────────────────

function ToastItem({
  id,
  variant = "default",
  title,
  description,
  action,
  duration = 4000,
}: ToastData) {
  const shouldReduceMotion = useReducedMotion();
  const store = React.useContext(ToastStoreContext);
  const icon = iconMap[variant];

  return (
    <ToastPrimitive.Root
      duration={duration}
      onOpenChange={(open) => {
        if (!open) store?.remove(id);
      }}
      asChild
      defaultOpen
    >
      <motion.li
        layout
        variants={shouldReduceMotion ? {} : motionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pointer-events-auto list-none"
      >
        <div className={toastStyleVariants({ variant })}>
          {/* Icon */}
          {icon && <span aria-hidden>{icon}</span>}

          {/* Content */}
          <div className="flex flex-1 flex-col gap-0.5">
            <ToastPrimitive.Title className="text-sm font-semibold text-[var(--velora-text-primary)] leading-tight">
              {title}
            </ToastPrimitive.Title>
            {description && (
              <ToastPrimitive.Description className="text-xs text-[var(--velora-text-tertiary)] leading-relaxed">
                {description}
              </ToastPrimitive.Description>
            )}
            {action && (
              <ToastPrimitive.Action
                altText={action.label}
                onClick={action.onClick}
                className="mt-2 inline-flex h-7 items-center rounded-[var(--velora-radius-sm)] bg-[var(--velora-brand-default)] px-3 text-xs font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--velora-brand-default)]"
              >
                {action.label}
              </ToastPrimitive.Action>
            )}
          </div>

          {/* Close */}
          <ToastPrimitive.Close asChild>
            <button
              className={cn(
                "shrink-0 rounded-[var(--velora-radius-xs)] p-1",
                "text-[var(--velora-text-tertiary)] hover:text-[var(--velora-text-primary)]",
                "hover:bg-[var(--velora-bg-subtle)]",
                "transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--velora-brand-default)]"
              )}
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </ToastPrimitive.Close>
        </div>
      </motion.li>
    </ToastPrimitive.Root>
  );
}

// ─── Toast Viewport ───────────────────────────────────────────────────────────

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

// ─── Toast Provider ───────────────────────────────────────────────────────────

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  /** Maximum number of toasts visible simultaneously */
  limit?: number;
}

export function ToastProvider({
  children,
  position = "bottom-right",
  limit = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const add = React.useCallback(
    (toast: Omit<ToastData, "id">): string => {
      const id = `toast-${++toastCount}`;
      setToasts((prev) => {
        const next = [{ ...toast, id }, ...prev];
        return next.slice(0, limit);
      });
      return id;
    },
    [limit]
  );

  const remove = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const removeAll = React.useCallback(() => setToasts([]), []);

  const store = React.useMemo(
    () => ({ toasts, add, remove, removeAll }),
    [toasts, add, remove, removeAll]
  );

  return (
    <ToastStoreContext.Provider value={store}>
      <ToastPrimitive.Provider>
        {children}
        <ToastPrimitive.Viewport asChild>
          <motion.ul
            className={cn(
              "fixed z-[1500] flex flex-col gap-2 pointer-events-none",
              "w-full max-w-sm",
              positionClasses[position]
            )}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {toasts.map((toast) => (
                <ToastItem key={toast.id} {...toast} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Provider>
    </ToastStoreContext.Provider>
  );
}

// ─── useToast Hook ────────────────────────────────────────────────────────────

export function useToast() {
  const store = React.useContext(ToastStoreContext);
  if (!store) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }

  return {
    toast: store.add,
    dismiss: store.remove,
    dismissAll: store.removeAll,
    /** Shorthand helpers */
    success: (title: string, opts?: Partial<Omit<ToastData, "id" | "variant" | "title">>) =>
      store.add({ ...opts, title, variant: "success" }),
    error: (title: string, opts?: Partial<Omit<ToastData, "id" | "variant" | "title">>) =>
      store.add({ ...opts, title, variant: "error" }),
    warning: (title: string, opts?: Partial<Omit<ToastData, "id" | "variant" | "title">>) =>
      store.add({ ...opts, title, variant: "warning" }),
    info: (title: string, opts?: Partial<Omit<ToastData, "id" | "variant" | "title">>) =>
      store.add({ ...opts, title, variant: "info" }),
  };
}
