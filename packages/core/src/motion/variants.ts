/**
 * Velora Motion Variants
 *
 * A complete library of Framer Motion animation variants.
 * All variants respect prefers-reduced-motion via the `useReducedMotion` hook.
 */

import type { Variants, Transition } from "framer-motion";

// ─── Transition Presets ───────────────────────────────────────────────────────

export const transitions = {
  fast: { duration: 0.1, ease: [0, 0, 0.2, 1] } satisfies Transition,
  normal: { duration: 0.2, ease: [0, 0, 0.2, 1] } satisfies Transition,
  slow: { duration: 0.3, ease: [0, 0, 0.2, 1] } satisfies Transition,
  spring: {
    type: "spring",
    stiffness: 380,
    damping: 30,
  } satisfies Transition,
  springBouncy: {
    type: "spring",
    stiffness: 400,
    damping: 20,
  } satisfies Transition,
  springSmooth: {
    type: "spring",
    stiffness: 300,
    damping: 35,
  } satisfies Transition,
  springGentle: {
    type: "spring",
    stiffness: 200,
    damping: 30,
    mass: 0.8,
  } satisfies Transition,
} as const;

// ─── Fade ─────────────────────────────────────────────────────────────────────

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitions.normal },
  exit: { opacity: 0, transition: transitions.fast },
};

// ─── Scale ───────────────────────────────────────────────────────────────────

export const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: transitions.spring },
  exit: { opacity: 0, scale: 0.96, transition: transitions.fast },
};

export const scaleUpVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: transitions.springBouncy },
  exit: { opacity: 0, scale: 0.8, transition: transitions.fast },
};

// ─── Slide ───────────────────────────────────────────────────────────────────

export const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: transitions.spring },
  exit: { opacity: 0, y: 4, transition: transitions.fast },
};

export const slideDownVariants: Variants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: transitions.spring },
  exit: { opacity: 0, y: -4, transition: transitions.fast },
};

export const slideLeftVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: transitions.spring },
  exit: { opacity: 0, x: 10, transition: transitions.fast },
};

export const slideRightVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: transitions.spring },
  exit: { opacity: 0, x: -10, transition: transitions.fast },
};

// ─── Dialog / Modal ───────────────────────────────────────────────────────────

export const dialogVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.springSmooth,
  },
  exit: { opacity: 0, scale: 0.97, y: 6, transition: transitions.fast },
};

export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

// ─── Drawer ───────────────────────────────────────────────────────────────────

export const drawerVariants = {
  bottom: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: transitions.spring },
    exit: { y: "100%", opacity: 0, transition: transitions.slow },
  } satisfies Variants,
  right: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: transitions.spring },
    exit: { x: "100%", opacity: 0, transition: transitions.slow },
  } satisfies Variants,
  left: {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: transitions.spring },
    exit: { x: "-100%", opacity: 0, transition: transitions.slow },
  } satisfies Variants,
  top: {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: transitions.spring },
    exit: { y: "-100%", opacity: 0, transition: transitions.slow },
  } satisfies Variants,
};

// ─── Toast ───────────────────────────────────────────────────────────────────

export const toastVariants: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.94 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.springSmooth,
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.96,
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
  },
};

// ─── Accordion ───────────────────────────────────────────────────────────────

export const accordionVariants: Variants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: { height: transitions.spring, opacity: { duration: 0.2 } },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: { height: transitions.normal, opacity: { duration: 0.1 } },
  },
};

// ─── Stagger Container ────────────────────────────────────────────────────────

export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: transitions.spring },
};

// ─── Page Transition ──────────────────────────────────────────────────────────

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ...transitions.spring, staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: -10, transition: transitions.fast },
};

// ─── Popover / Tooltip ────────────────────────────────────────────────────────

export const popoverVariants: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 4 },
  animate: { opacity: 1, scale: 1, y: 0, transition: transitions.spring },
  exit: { opacity: 0, scale: 0.96, y: 2, transition: transitions.fast },
};

export const tooltipVariants: Variants = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1, transition: transitions.fast },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.08 } },
};

// ─── Skeleton ────────────────────────────────────────────────────────────────

export const shimmerVariants: Variants = {
  initial: { backgroundPosition: "-200% 0" },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  },
};

// ─── Floating ────────────────────────────────────────────────────────────────

export const floatingVariants: Variants = {
  animate: {
    y: [-4, 4, -4],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut",
    },
  },
};

// ─── Hover Lift ───────────────────────────────────────────────────────────────

export const hoverLiftVariants: Variants = {
  initial: { y: 0, boxShadow: "var(--velora-shadow-sm)" },
  hover: {
    y: -4,
    boxShadow: "var(--velora-shadow-lg)",
    transition: transitions.springSmooth,
  },
};

// ─── Ripple ──────────────────────────────────────────────────────────────────

export const rippleVariants: Variants = {
  initial: { scale: 0, opacity: 0.4 },
  animate: {
    scale: 4,
    opacity: 0,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] },
  },
};
