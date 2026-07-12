/**
 * Velora Textarea
 *
 * Auto-resizing textarea with character count,
 * validation states, and consistent styling with Input.
 */

"use client";

import * as React from "react";
import { cn } from "../../utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: "default" | "error" | "success" | "warning";
  label?: string;
  helperText?: string;
  errorMessage?: string;
  showCount?: boolean;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
}

const stateClasses = {
  default:
    "border-[var(--velora-border-base)] hover:border-[var(--velora-border-strong)] focus:border-[var(--velora-border-brand)] focus:ring-[var(--velora-brand-default)]/20",
  error:
    "border-[var(--velora-border-danger)] focus:border-[var(--velora-border-danger)] focus:ring-[var(--velora-state-danger)]/20",
  success:
    "border-[var(--velora-border-success)] focus:border-[var(--velora-border-success)] focus:ring-[var(--velora-state-success)]/20",
  warning:
    "border-[var(--velora-border-warning)] focus:border-[var(--velora-border-warning)] focus:ring-[var(--velora-state-warning)]/20",
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      state: stateProp,
      label,
      helperText,
      errorMessage,
      showCount,
      maxLength,
      autoResize = false,
      minRows = 3,
      maxRows = 12,
      value,
      defaultValue,
      onChange,
      id: idProp,
      required,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? ""
    );
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const charCount = String(currentValue).length;

    const resolvedState = errorMessage ? "error" : stateProp ?? "default";
    const id = idProp ?? React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);

      if (autoResize && textareaRef.current) {
        const el = textareaRef.current;
        el.style.height = "auto";
        const lineHeight = parseInt(getComputedStyle(el).lineHeight);
        const minH = lineHeight * minRows;
        const maxH = lineHeight * maxRows;
        el.style.height = `${Math.min(Math.max(el.scrollHeight, minH), maxH)}px`;
      }
    };

    const composeRef = (node: HTMLTextAreaElement | null) => {
      (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--velora-text-primary)]"
          >
            {label}
            {required && (
              <span className="ml-1 text-[var(--velora-state-danger)]" aria-hidden>
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={composeRef}
            id={id}
            rows={minRows}
            value={isControlled ? (value as string) : undefined}
            defaultValue={isControlled ? undefined : (defaultValue as string)}
            maxLength={maxLength}
            required={required}
            aria-invalid={resolvedState === "error"}
            onChange={handleChange}
            className={cn(
              "w-full resize-none rounded-[var(--velora-radius-input)]",
              "border bg-[var(--velora-surface-base)]",
              "px-3 py-2.5 text-sm",
              "text-[var(--velora-text-primary)]",
              "placeholder:text-[var(--velora-text-tertiary)]",
              "transition-all duration-150",
              "focus:outline-none focus:ring-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "scrollbar-thin",
              stateClasses[resolvedState],
              showCount && "pb-8",
              className
            )}
            {...props}
          />

          {showCount && maxLength && (
            <span
              className={cn(
                "absolute bottom-2.5 right-3 text-xs tabular-nums pointer-events-none",
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

        {errorMessage && (
          <p role="alert" className="text-xs text-[var(--velora-state-danger)]">
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p className="text-xs text-[var(--velora-text-tertiary)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
