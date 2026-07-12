/**
 * @velora/motion
 *
 * Animation utilities, variants, and React components built on Framer Motion.
 * Use when you need animations beyond the core library's built-in variants.
 */

"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useInView,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";

// ─── Re-export core framer-motion API ────────────────────────────────────────

export {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useInView,
};

// ─── Spring presets ───────────────────────────────────────────────────────────

export const springs = {
  snappy: { type: "spring", stiffness: 500, damping: 35 },
  smooth: { type: "spring", stiffness: 300, damping: 35 },
  bouncy: { type: "spring", stiffness: 400, damping: 20 },
  gentle: { type: "spring", stiffness: 200, damping: 30, mass: 0.8 },
  stiff: { type: "spring", stiffness: 600, damping: 40 },
  wobbly: { type: "spring", stiffness: 180, damping: 12 },
} as const;

// ─── Tween presets ────────────────────────────────────────────────────────────

export const tweens = {
  fast: { duration: 0.1, ease: [0, 0, 0.2, 1] },
  normal: { duration: 0.2, ease: [0, 0, 0.2, 1] },
  slow: { duration: 0.35, ease: [0, 0, 0.2, 1] },
  linear: { duration: 0.2, ease: "linear" },
} as const;

// ─── Variant presets ──────────────────────────────────────────────────────────

export const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: tweens.normal },
    exit: { opacity: 0, transition: tweens.fast },
  } satisfies Variants,

  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1, transition: springs.smooth },
    exit: { opacity: 0, scale: 0.97, transition: tweens.fast },
  } satisfies Variants,

  slideUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: springs.smooth },
    exit: { opacity: 0, y: 8, transition: tweens.fast },
  } satisfies Variants,

  slideDown: {
    hidden: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0, transition: springs.smooth },
    exit: { opacity: 0, y: -8, transition: tweens.fast },
  } satisfies Variants,

  slideLeft: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0, transition: springs.smooth },
    exit: { opacity: 0, x: 12, transition: tweens.fast },
  } satisfies Variants,

  slideRight: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: springs.smooth },
    exit: { opacity: 0, x: -12, transition: tweens.fast },
  } satisfies Variants,

  stagger: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  } satisfies Variants,

  staggerItem: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: springs.smooth },
  } satisfies Variants,

  popIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: springs.bouncy },
    exit: { opacity: 0, scale: 0.8, transition: tweens.fast },
  } satisfies Variants,

  blur: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)", transition: tweens.slow },
    exit: { opacity: 0, filter: "blur(4px)", transition: tweens.fast },
  } satisfies Variants,
} as const;

// ─── Animated components ──────────────────────────────────────────────────────

export interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
}

/**
 * Fade in with optional slide direction.
 * Automatically respects prefers-reduced-motion.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.4,
  direction = "up",
  distance = 16,
  once = true,
  className,
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-40px" });

  const directionMap: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, ...directionMap[direction] };

  const animate = isInView
    ? { opacity: 1, x: 0, y: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: [0, 0, 0.2, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger children ─────────────────────────────────────────────────────────

export interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  once?: boolean;
}

export function Stagger({
  children,
  staggerDelay = 0.08,
  initialDelay = 0,
  className,
  once = true,
}: StaggerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={
        shouldReduceMotion
          ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
          : variants.staggerItem
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────

export interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedNumber({
  value,
  duration = 1.2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      if (ref.current) {
        ref.current.textContent =
          prefix + value.toFixed(decimals) + suffix;
      }
      return;
    }

    const controls = { value: 0 };
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;

      if (ref.current) {
        ref.current.textContent =
          prefix + current.toFixed(decimals) + suffix;
      }

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration, decimals, prefix, suffix, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

// ─── Magnetic button effect ───────────────────────────────────────────────────

export interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Parallax ────────────────────────────────────────────────────────────────

export interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    (shouldReduceMotion ? [0, 0] : [`${-speed * 100}px`, `${speed * 100}px`]) as (number | string)[]
  );

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// ─── Typewriter ───────────────────────────────────────────────────────────────

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  className?: string;
  cursorClassName?: string;
}

export function Typewriter({
  text,
  speed = 60,
  deleteSpeed = 30,
  pauseDuration = 2000,
  loop = true,
  className,
  cursorClassName,
}: TypewriterProps) {
  const texts = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed] = React.useState("");
  const [textIdx, setTextIdx] = React.useState(0);
  const [phase, setPhase] = React.useState<"typing" | "pausing" | "deleting">("typing");
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(texts[0] ?? "");
      return;
    }

    const currentText = texts[textIdx] ?? "";

    if (phase === "typing") {
      if (displayed.length < currentText.length) {
        const t = setTimeout(
          () => setDisplayed(currentText.slice(0, displayed.length + 1)),
          speed
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), pauseDuration);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      if (!loop && textIdx === texts.length - 1) return undefined;
      setPhase("deleting");
      return undefined;
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          deleteSpeed
        );
        return () => clearTimeout(t);
      } else {
        setTextIdx((i) => (i + 1) % texts.length);
        setPhase("typing");
      }
    }

    return undefined;
  }, [displayed, phase, textIdx, texts, speed, deleteSpeed, pauseDuration, loop, shouldReduceMotion]);

  return (
    <span className={className}>
      {displayed}
      <motion.span
        className={cursorClassName ?? "inline-block w-0.5 h-[1em] bg-current ml-0.5 align-text-bottom"}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        aria-hidden
      />
    </span>
  );
}

// ─── Morph text ───────────────────────────────────────────────────────────────

export interface MorphTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export function MorphText({ texts, interval = 3000, className }: MorphTextProps) {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % texts.length), interval);
    return () => clearInterval(t);
  }, [texts.length, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
        transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
        className={className}
      >
        {texts[idx]}
      </motion.span>
    </AnimatePresence>
  );
}

// ─── Reveal on scroll ─────────────────────────────────────────────────────────

export interface RevealProps extends HTMLMotionProps<"div"> {
  variant?: keyof typeof variants;
  delay?: number;
  once?: boolean;
  margin?: string;
}

export function Reveal({
  children,
  variant: variantKey = "slideUp",
  delay = 0,
  once = true,
  margin = "-60px",
  className,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });
  const shouldReduceMotion = useReducedMotion();

  const v = shouldReduceMotion ? variants.fade : variants[variantKey];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={v}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
