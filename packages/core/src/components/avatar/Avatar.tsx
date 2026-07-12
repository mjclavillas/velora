/**
 * Velora Avatar
 *
 * Composable avatar with Radix primitives, status indicators,
 * intelligent initials generation, and group stacking.
 */

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const avatarVariants = cva(
  "relative flex shrink-0 select-none",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
        "2xl": "h-20 w-20 text-xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-[var(--velora-radius-md)]",
        rounded: "rounded-[var(--velora-radius-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

// ─── Types ───────────────────────────────────────────────────────────────────

export type AvatarStatus = "online" | "offline" | "busy" | "away" | "none";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Full name — initials are auto-generated */
  name?: string;
  /** Fallback icon/content when image fails and name not provided */
  fallbackIcon?: React.ReactNode;
  /** Online status indicator */
  status?: AvatarStatus;
  /** Custom fallback background */
  fallbackClassName?: string;
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "?";
  if (parts.length === 1 && parts[0]) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase();
}

/** Deterministic color from name string */
function getAvatarColor(name: string): string {
  const colors = [
    "from-violet-500 to-purple-600",
    "from-cyan-400 to-blue-500",
    "from-emerald-400 to-teal-500",
    "from-rose-400 to-pink-500",
    "from-amber-400 to-orange-500",
    "from-indigo-400 to-violet-500",
    "from-sky-400 to-cyan-500",
    "from-fuchsia-400 to-purple-500",
  ];
  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index] ?? colors[0]!;
}

const statusColorMap: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  offline: "bg-slate-400",
  busy: "bg-rose-500",
  away: "bg-amber-400",
  none: "hidden",
};

// ─── Avatar ──────────────────────────────────────────────────────────────────

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      size,
      shape,
      src,
      alt,
      name,
      fallbackIcon,
      status = "none",
      fallbackClassName,
      ...props
    },
    ref
  ) => {
    const initials = name ? getInitials(name) : null;
    const gradientColor = name ? getAvatarColor(name) : "from-violet-500 to-cyan-500";
    const statusColor = statusColorMap[status];

    const statusSizeMap: Record<NonNullable<VariantProps<typeof avatarVariants>["size"]>, string> = {
      xs: "h-1.5 w-1.5 -bottom-px -right-px ring-[1.5px]",
      sm: "h-2 w-2 -bottom-0.5 -right-0.5 ring-2",
      md: "h-2.5 w-2.5 -bottom-0.5 -right-0.5 ring-2",
      lg: "h-3 w-3 bottom-0 right-0 ring-2",
      xl: "h-3.5 w-3.5 bottom-0 right-0 ring-2",
      "2xl": "h-4 w-4 bottom-0 right-0 ring-[3px]",
    };

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ size, shape }), className)}
        {...props}
      >
        <div className="h-full w-full overflow-hidden rounded-[inherit]">
          <AvatarPrimitive.Image
            src={src}
            alt={alt ?? name ?? "Avatar"}
            className="h-full w-full object-cover"
          />
          <AvatarPrimitive.Fallback
            className={cn(
              "flex h-full w-full items-center justify-center font-semibold text-white",
              `bg-gradient-to-br ${gradientColor}`,
              fallbackClassName
            )}
            delayMs={src ? 300 : 0}
          >
            {fallbackIcon ?? initials ?? "?"}
          </AvatarPrimitive.Fallback>
        </div>

        {/* Status indicator */}
        {status !== "none" && (
          <span
            className={cn(
              "absolute rounded-full ring-[var(--velora-bg-base)]",
              statusColor,
              statusSizeMap[size ?? "md"]
            )}
            aria-label={`Status: ${status}`}
            role="img"
          />
        )}
      </AvatarPrimitive.Root>
    );
  }
);
Avatar.displayName = "Avatar";

// ─── Avatar Group ─────────────────────────────────────────────────────────────

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum visible avatars before +N overflow */
  max?: number;
  /** Size passed to child avatars */
  size?: VariantProps<typeof avatarVariants>["size"];
  /** Overlap amount in pixels */
  overlap?: number;
}

function AvatarGroup({
  children,
  max = 4,
  size = "md",
  overlap = 8,
  className,
  ...props
}: AvatarGroupProps) {
  const avatarChildren = React.Children.toArray(children);
  const visibleAvatars = avatarChildren.slice(0, max);
  const overflowCount = avatarChildren.length - max;

  const overlapMap: Record<NonNullable<typeof size>, string> = {
    xs: "-ml-1.5",
    sm: "-ml-2",
    md: "-ml-2.5",
    lg: "-ml-3",
    xl: "-ml-4",
    "2xl": "-ml-5",
  };

  return (
    <div
      className={cn("flex items-center", className)}
      role="group"
      {...props}
    >
      {visibleAvatars.map((child, i) => (
        <div
          key={i}
          className={cn(
            "ring-2 ring-[var(--velora-bg-base)] rounded-full",
            i > 0 ? overlapMap[size ?? "md"] : ""
          )}
          style={{ zIndex: visibleAvatars.length - i }}
        >
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                size,
              })
            : child}
        </div>
      ))}

      {overflowCount > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full",
            "bg-[var(--velora-bg-muted)] ring-2 ring-[var(--velora-bg-base)]",
            "font-medium text-[var(--velora-text-secondary)]",
            overlapMap[size ?? "md"],
            avatarVariants({ size })
          )}
          aria-label={`${overflowCount} more`}
        >
          <span className="text-[0.7em]">+{overflowCount}</span>
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarGroup, avatarVariants };
