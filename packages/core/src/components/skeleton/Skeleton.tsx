/**
 * Velora Skeleton
 *
 * Loading placeholder with shimmer animation.
 * Supports text, avatar, card, and custom shape skeletons.
 */

import * as React from "react";
import { cn } from "../../utils";

// ─── Base Skeleton ────────────────────────────────────────────────────────────

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Disable the shimmer animation */
  animated?: boolean;
}

function Skeleton({ className, animated = true, ...props }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className={cn(
        "rounded-[var(--velora-radius-md)]",
        "bg-[var(--velora-bg-muted)]",
        animated && [
          "bg-gradient-to-r",
          "from-[var(--velora-bg-muted)] via-[var(--velora-border-base)] to-[var(--velora-bg-muted)]",
          "bg-[length:200%_100%]",
          "animate-[skeleton-shimmer_1.5s_ease-in-out_infinite]",
        ],
        className
      )}
      {...props}
    />
  );
}

// ─── Text Skeleton ────────────────────────────────────────────────────────────

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of lines */
  lines?: number;
  /** Last line width percentage */
  lastLineWidth?: `${number}%`;
}

function SkeletonText({
  lines = 3,
  lastLineWidth = "60%",
  className,
  ...props
}: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={
            i === lines - 1 && lines > 1
              ? { width: lastLineWidth }
              : { width: "100%" }
          }
        />
      ))}
    </div>
  );
}

// ─── Avatar Skeleton ──────────────────────────────────────────────────────────

interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
}

const avatarSizeMap = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

function SkeletonAvatar({
  size = "md",
  shape = "circle",
  className,
  ...props
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      className={cn(
        avatarSizeMap[size],
        shape === "circle" ? "rounded-full" : "rounded-[var(--velora-radius-md)]",
        "shrink-0",
        className
      )}
      {...props}
    />
  );
}

// ─── Card Skeleton ────────────────────────────────────────────────────────────

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  showAvatar?: boolean;
  showImage?: boolean;
  lines?: number;
}

function SkeletonCard({
  showAvatar = true,
  showImage = false,
  lines = 3,
  className,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--velora-radius-card)] border border-[var(--velora-border-base)]",
        "bg-[var(--velora-surface-base)] p-5 shadow-[var(--velora-shadow-sm)]",
        "flex flex-col gap-4",
        className
      )}
      {...props}
    >
      {showImage && <Skeleton className="h-40 w-full rounded-[var(--velora-radius-lg)]" />}

      {showAvatar && (
        <div className="flex items-center gap-3">
          <SkeletonAvatar />
          <div className="flex flex-col gap-1.5 flex-1">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      )}

      <SkeletonText lines={lines} />

      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-[var(--velora-radius-button)]" />
        <Skeleton className="h-8 w-16 rounded-[var(--velora-radius-button)]" />
      </div>
    </div>
  );
}

// ─── Table Skeleton ───────────────────────────────────────────────────────────

interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
  columns?: number;
}

function SkeletonTable({
  rows = 5,
  columns = 4,
  className,
  ...props
}: SkeletonTableProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {/* Header */}
      <div className="flex gap-4 px-3 py-2">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-3.5 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="flex gap-4 rounded-[var(--velora-radius-md)] border border-[var(--velora-border-muted)] px-3 py-3"
        >
          {Array.from({ length: columns }).map((_, colIdx) => (
            <Skeleton
              key={colIdx}
              className="h-4 flex-1"
              style={{ opacity: 1 - colIdx * 0.1 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTable };
