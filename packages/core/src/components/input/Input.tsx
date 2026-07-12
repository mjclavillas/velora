/**
 * Velora Input
 *
 * A fully accessible text input with leading/trailing addons,
 * validation states, floating labels, and character count support.
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const inputWrapperVariants = cva(
  [
    "relative flex w-full items-center gap-2",
    "rounded-[var(--velora-radius-input)]",
    "border bg-[var(--velora-surface-base)]",
    "transition-all duration-150",
    "has-[:focus]:ring-2 has-[:focus]:ring-[var(--velora-brand-default)]/20",
    "has-[:focus]:border-[var(--velora-border-brand)]",
    "has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      state: {
        default:
          "border-[var(--velora-border-base)] hover:border-[var(--velora-border-strong)]",
        error:
          "border-[var(--velora-border-danger)] has-[:focus]:border-[var(--velora-border-danger)] has-[:focus]:ring-[var(--velora-state-danger)]/20",
        success:
          "border-[var(--velora-border-success)] has-[:focus]:border-[var(--velora-border-success)] has-[:focus]:ring-[var(--velora-state-success)]/20",
        warning:
          "border-[var(--velora-border-warning)] has-[:focus]:border-[var(--velora-border-warning)] has-[:focus]:ring-[var(--velora-state-warning)]/20",
      },
      size: {
        sm: "h-8 px-2.5",
        md: "h-10 px-3",
        lg: "h-11 px-3.5",
        xl: "h-12 px-4",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  }
);

const inputBaseClasses = [
  "flex-1 min-w-0 bg-transparent outline-none",
  "text-[var(--velora-text-primary)] placeholder:text-[var(--velora-text-tertiary)]",
  "text-sm font-normal",
  "disabled:cursor-not-allowed",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium",
].join(" ");

// ─── Types ───────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputWrapperVariants> {
  /** Validation / visual state */
  state?: "default" | "error" | "success" | "warning";
  /** Element or string rendered before the input */
  leadingAddon?: React.ReactNode;
  /** Element or string rendered after the input */
  trailingAddon?: React.ReactNode;
  /** Icon rendered inside the input (before text) */
  leadingIcon?: React.ReactNode;
  /** Icon rendered inside the input (after text) */
  trailingIcon?: React.ReactNode;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error message — overrides helperText, sets state to error */
  errorMessage?: string;
  /** Label displayed above the input */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Max characters; shows counter when provided */
  maxLength?: number;
  /** Show character counter */
  showCount?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      state: stateProp,
      size,
      type = "text",
      leadingAddon,
      trailingAddon,
      leadingIcon,
      trailingIcon,
      helperText,
      errorMessage,
      label,
      required,
      maxLength,
      showCount,
      id: idProp,
      value,
      defaultValue,
      onChange,
      autoComplete,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? ""
    );
    const [showPassword, setShowPassword] = React.useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const charCount = String(currentValue).length;

    const resolvedState = errorMessage ? "error" : stateProp;
    const resolvedType =
      type === "password" ? (showPassword ? "text" : "password") : type;

    const id = idProp ?? React.useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const resolvedAutoComplete = autoComplete === "off" ? "no" : autoComplete;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const stateIconMap: Record<string, React.ReactNode> = {
      error: (
        <AlertCircle
          className="h-4 w-4 shrink-0 text-[var(--velora-state-danger)]"
          aria-hidden
        />
      ),
      success: (
        <CheckCircle2
          className="h-4 w-4 shrink-0 text-[var(--velora-state-success)]"
          aria-hidden
        />
      ),
    };

    const resolvedTrailingIcon =
      type === "password"
        ? null // Password toggle is rendered separately
        : (resolvedState && stateIconMap[resolvedState]) ?? trailingIcon;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--velora-text-primary)]"
          >
            {label}
            {required && (
              <span
                className="ml-1 text-[var(--velora-state-danger)]"
                aria-hidden
              >
                *
              </span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div className="flex items-center gap-0">
          {/* Leading addon (e.g., "https://") */}
          {leadingAddon && (
            <div className="flex h-full items-center rounded-l-[var(--velora-radius-input)] border border-r-0 border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)] px-3 text-sm text-[var(--velora-text-tertiary)] shrink-0">
              {leadingAddon}
            </div>
          )}

          <div
            className={cn(
              inputWrapperVariants({ state: resolvedState, size }),
              leadingAddon && "rounded-l-none",
              trailingAddon && "rounded-r-none",
              className
            )}
          >
            {/* Leading icon */}
            {leadingIcon && (
              <span
                className="shrink-0 text-[var(--velora-text-tertiary)]"
                aria-hidden
              >
                {leadingIcon}
              </span>
            )}

            {/* Input element */}
            <input
              ref={ref}
              id={id}
              type={resolvedType}
              className={inputBaseClasses}
              autoComplete={resolvedAutoComplete}
              value={isControlled ? value : undefined}
              defaultValue={isControlled ? undefined : defaultValue}
              maxLength={maxLength}
              required={required}
              aria-invalid={resolvedState === "error"}
              aria-describedby={
                [
                  errorMessage ? errorId : null,
                  helperText ? helperId : null,
                ]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
              onChange={handleChange}
              {...props}
            />

            {/* Password toggle */}
            {type === "password" && (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="shrink-0 text-[var(--velora-text-tertiary)] hover:text-[var(--velora-text-primary)] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Trailing state icon or custom icon */}
            {resolvedTrailingIcon && (
              <span className="shrink-0">{resolvedTrailingIcon}</span>
            )}

            {/* Character count */}
            {showCount && maxLength && (
              <span
                className={cn(
                  "shrink-0 text-xs tabular-nums",
                  charCount >= maxLength
                    ? "text-[var(--velora-state-danger)]"
                    : "text-[var(--velora-text-tertiary)]"
                )}
                aria-live="polite"
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>

          {/* Trailing addon */}
          {trailingAddon && (
            <div className="flex h-full items-center rounded-r-[var(--velora-radius-input)] border border-l-0 border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)] px-3 text-sm text-[var(--velora-text-tertiary)] shrink-0">
              {trailingAddon}
            </div>
          )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1 text-xs text-[var(--velora-state-danger)]"
          >
            <AlertCircle className="h-3 w-3 shrink-0" aria-hidden />
            {errorMessage}
          </p>
        )}

        {/* Helper text */}
        {helperText && !errorMessage && (
          <p
            id={helperId}
            className="text-xs text-[var(--velora-text-tertiary)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputWrapperVariants };
