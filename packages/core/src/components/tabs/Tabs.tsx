/**
 * Velora Tabs
 *
 * Animated tabs with sliding indicator, multiple variants,
 * and full keyboard navigation via Radix UI.
 */

"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";
import { transitions } from "../../motion/variants";

// ─── Variants ─────────────────────────────────────────────────────────────────

const tabsListVariants = cva("relative flex items-center", {
  variants: {
    variant: {
      /** Pill-style with background track */
      pills:
        "gap-1 rounded-[var(--velora-radius-lg)] bg-[var(--velora-bg-muted)] p-1",
      /** Underline indicator */
      underline:
        "gap-4 border-b border-[var(--velora-border-base)] pb-0",
      /** Solid bordered */
      bordered:
        "gap-0 rounded-[var(--velora-radius-lg)] border border-[var(--velora-border-base)] overflow-hidden p-0",
      /** Ghost — minimal */
      ghost: "gap-2",
    },
  },
  defaultVariants: { variant: "pills" },
});

const tabsTriggerVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "whitespace-nowrap text-sm font-medium",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--velora-brand-default)]",
    "focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--velora-bg-base)]",
    "disabled:pointer-events-none disabled:opacity-40",
  ].join(" "),
  {
    variants: {
      variant: {
        pills:
          "rounded-[var(--velora-radius-md)] px-3 py-1.5 text-[var(--velora-text-tertiary)] data-[state=active]:text-[var(--velora-text-primary)] z-10",
        underline:
          "px-1 pb-3 pt-0 text-[var(--velora-text-tertiary)] data-[state=active]:text-[var(--velora-text-primary)] hover:text-[var(--velora-text-secondary)]",
        bordered:
          "flex-1 px-4 py-2.5 text-[var(--velora-text-tertiary)] data-[state=active]:text-[var(--velora-text-primary)] border-r border-[var(--velora-border-base)] last:border-r-0 hover:bg-[var(--velora-bg-subtle)]",
        ghost:
          "rounded-[var(--velora-radius-md)] px-3 py-1.5 text-[var(--velora-text-tertiary)] data-[state=active]:text-[var(--velora-text-primary)] hover:bg-[var(--velora-bg-subtle)] z-10",
      },
    },
    defaultVariants: { variant: "pills" },
  }
);

// ─── Context ─────────────────────────────────────────────────────────────────

const TabsVariantContext = React.createContext<
  VariantProps<typeof tabsListVariants>["variant"]
>("pills");

// ─── Root ─────────────────────────────────────────────────────────────────────

const Tabs = TabsPrimitive.Root;

// ─── List ─────────────────────────────────────────────────────────────────────

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "pills", children, ...props }, ref) => {
  const [indicatorStyle, setIndicatorStyle] = React.useState<{
    left: number;
    width: number;
    top?: number;
    height?: number;
  } | null>(null);

  const listRef = React.useRef<HTMLDivElement>(null);

  const updateIndicator = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const activeTab = list.querySelector<HTMLElement>(
      "[role=tab][data-state=active]"
    );
    if (!activeTab) return;
    const listRect = list.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    if (variant === "underline") {
      setIndicatorStyle({
        left: tabRect.left - listRect.left,
        width: tabRect.width,
        top: tabRect.height,
        height: 2,
      });
    } else {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [variant]);

  React.useEffect(() => {
    updateIndicator();
    const observer = new MutationObserver(updateIndicator);
    if (listRef.current) {
      observer.observe(listRef.current, {
        attributes: true,
        subtree: true,
        attributeFilter: ["data-state"],
      });
    }
    window.addEventListener("resize", updateIndicator);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  const showPillIndicator = variant === "pills" || variant === "ghost";
  const showUnderlineIndicator = variant === "underline";

  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.List
        ref={(node) => {
          (listRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      >
        {/* Sliding background indicator for pill/ghost variants */}
        {showPillIndicator && indicatorStyle && (
          <motion.div
            className={cn(
              "absolute rounded-[var(--velora-radius-md)] pointer-events-none",
              variant === "pills"
                ? "bg-[var(--velora-surface-base)] shadow-[var(--velora-shadow-xs)]"
                : "bg-[var(--velora-bg-subtle)]"
            )}
            layoutId="tabs-pill-indicator"
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              height: "calc(100% - 8px)",
              top: 4,
            }}
            transition={transitions.spring}
          />
        )}

        {/* Underline indicator */}
        {showUnderlineIndicator && indicatorStyle && (
          <motion.div
            className="absolute bottom-0 h-0.5 bg-[var(--velora-brand-default)] rounded-full pointer-events-none"
            layoutId="tabs-underline-indicator"
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={transitions.spring}
          />
        )}

        {children}
      </TabsPrimitive.List>
    </TabsVariantContext.Provider>
  );
});
TabsList.displayName = "TabsList";

// ─── Trigger ──────────────────────────────────────────────────────────────────

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    icon?: React.ReactNode;
    badge?: React.ReactNode;
  }
>(({ className, icon, badge, children, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    >
      {icon && <span aria-hidden className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      {children}
      {badge && (
        <span className="rounded-full bg-[var(--velora-brand-subtle)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--velora-text-brand)] leading-none">
          {badge}
        </span>
      )}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = "TabsTrigger";

// ─── Content ─────────────────────────────────────────────────────────────────

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--velora-brand-default)] rounded-[var(--velora-radius-md)]",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
