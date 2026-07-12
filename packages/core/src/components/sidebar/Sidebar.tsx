/**
 * Velora Sidebar
 *
 * Collapsible sidebar navigation with rail mode, nested items,
 * groups, and smooth animations. Mobile-responsive with overlay.
 */

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "../../utils";
import { transitions } from "../../motion/variants";

// ─── Context ─────────────────────────────────────────────────────────────────

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("Sidebar components must be within <SidebarProvider>");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

function SidebarProvider({ children, defaultCollapsed = false }: SidebarProviderProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onDragEnter" | "onDragLeave" | "onDragOver" | "onDrop" | "onAnimationStart" | "onAnimationEnd"> {
  collapsible?: boolean;
  variant?: "default" | "floating" | "inset";
  side?: "left" | "right";
}

function Sidebar({
  className,
  collapsible = true,
  variant = "default",
  side = "left",
  children,
  ...props
}: SidebarProps) {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();

  const sidebarContent = (
    <motion.nav
      animate={{ width: collapsed ? 64 : 240 }}
      transition={transitions.spring}
      className={cn(
        "hidden md:flex flex-col h-full",
        "bg-[var(--velora-surface-base)]",
        "border-r border-[var(--velora-border-base)]",
        "overflow-hidden shrink-0",
        variant === "floating" && [
          "m-3 rounded-[var(--velora-radius-xl)]",
          "border border-[var(--velora-border-base)]",
          "shadow-[var(--velora-shadow-lg)]",
          "h-[calc(100%-1.5rem)]",
        ],
        className
      )}
      aria-label="Sidebar navigation"
      {...props}
    >
      {children}
    </motion.nav>
  );

  const mobileSidebar = (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1100] bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>
      {/* Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ x: side === "left" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "left" ? "-100%" : "100%" }}
            transition={transitions.spring}
            className={cn(
              "fixed top-0 bottom-0 z-[1200] w-64 flex flex-col md:hidden",
              "bg-[var(--velora-surface-base)]",
              side === "left" ? "left-0 border-r" : "right-0 border-l",
              "border-[var(--velora-border-base)]",
              "shadow-[var(--velora-shadow-2xl)]"
            )}
            aria-label="Mobile navigation"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className={cn(
                "absolute top-4 p-1.5 rounded-[var(--velora-radius-md)]",
                side === "left" ? "right-4" : "left-4",
                "text-[var(--velora-text-tertiary)] hover:text-[var(--velora-text-primary)]",
                "hover:bg-[var(--velora-bg-subtle)] transition-colors"
              )}
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {sidebarContent}
      {mobileSidebar}
    </>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = useSidebar();
  return (
    <div
      className={cn(
        "flex items-center px-4 py-4 shrink-0 min-h-[60px]",
        collapsed ? "justify-center" : "justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Content ─────────────────────────────────────────────────────────────────

function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col flex-1 overflow-y-auto overflow-x-hidden py-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-3 py-3 border-t border-[var(--velora-border-muted)] shrink-0", className)}
      {...props}
    />
  );
}

// ─── Group ───────────────────────────────────────────────────────────────────

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

function SidebarGroup({ className, label, children, ...props }: SidebarGroupProps) {
  const { collapsed } = useSidebar();
  return (
    <div className={cn("px-3 py-1", className)} {...props}>
      {label && !collapsed && (
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--velora-text-tertiary)]">
          {label}
        </p>
      )}
      {label && collapsed && (
        <div className="my-2 border-t border-[var(--velora-border-muted)]" />
      )}
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

export interface SidebarItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: React.ReactNode;
  href?: string;
  as?: React.ElementType;
  disabled?: boolean;
}

function SidebarItem({
  className,
  icon,
  label,
  active,
  badge,
  href,
  as: Component = "button",
  disabled,
  ...props
}: SidebarItemProps) {
  const { collapsed } = useSidebar();
  const componentProps = href ? { href } : { type: "button" as const };

  return (
    <Component
      {...componentProps}
      className={cn(
        "group relative flex items-center gap-3 w-full",
        "rounded-[var(--velora-radius-md)] transition-all duration-150",
        "text-sm font-medium outline-none",
        "focus-visible:ring-2 focus-visible:ring-[var(--velora-brand-default)]",
        collapsed ? "justify-center px-0 py-2.5 h-10" : "px-3 py-2.5",
        active
          ? "bg-[var(--velora-brand-subtle)] text-[var(--velora-text-brand)]"
          : "text-[var(--velora-text-secondary)] hover:bg-[var(--velora-bg-subtle)] hover:text-[var(--velora-text-primary)]",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0 [&>svg]:h-4 [&>svg]:w-4",
            active
              ? "text-[var(--velora-brand-default)]"
              : "text-[var(--velora-text-tertiary)] group-hover:text-[var(--velora-text-primary)]"
          )}
          aria-hidden
        >
          {icon}
        </span>
      )}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge && (
            <span className="ml-auto shrink-0 rounded-full bg-[var(--velora-brand-subtle)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--velora-text-brand)]">
              {badge}
            </span>
          )}
        </>
      )}
      {/* Active indicator */}
      {active && (
        <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-[var(--velora-brand-default)]" />
      )}
    </Component>
  );
}

// ─── Collapse Toggle ─────────────────────────────────────────────────────────

function SidebarCollapseButton({ className }: { className?: string }) {
  const { collapsed, setCollapsed } = useSidebar();
  return (
    <button
      onClick={() => setCollapsed(!collapsed)}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-full shrink-0",
        "border border-[var(--velora-border-base)]",
        "bg-[var(--velora-surface-base)]",
        "text-[var(--velora-text-tertiary)] hover:text-[var(--velora-text-primary)]",
        "shadow-[var(--velora-shadow-xs)]",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--velora-brand-default)]",
        className
      )}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {collapsed ? (
        <ChevronRight className="h-3.5 w-3.5" />
      ) : (
        <ChevronLeft className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

// ─── Mobile Trigger ───────────────────────────────────────────────────────────

function SidebarMobileTrigger({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setMobileOpen } = useSidebar();
  return (
    <button
      onClick={() => setMobileOpen(true)}
      className={cn("md:hidden", className)}
      aria-label="Open navigation"
      {...props}
    >
      {children}
    </button>
  );
}

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarCollapseButton,
  SidebarMobileTrigger,
  useSidebar,
};
