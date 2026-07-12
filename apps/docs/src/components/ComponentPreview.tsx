"use client";

import * as React from "react";
import { cn, Button } from "@velora/core";
import { Eye, Code2, Check, Copy } from "lucide-react";

interface ComponentPreviewProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
  className?: string;
  previewClassName?: string;
  center?: boolean;
  background?: "default" | "subtle" | "grid" | "none";
}

export function ComponentPreview({
  title,
  description,
  children,
  code,
  className,
  previewClassName,
  center = true,
  background = "default",
}: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bgClasses = {
    default: "bg-[var(--velora-bg-subtle)]",
    subtle: "bg-[var(--velora-surface-base)]",
    grid: [
      "bg-[var(--velora-bg-subtle)]",
      "[background-image:linear-gradient(var(--velora-border-muted)_1px,transparent_1px),linear-gradient(90deg,var(--velora-border-muted)_1px,transparent_1px)]",
      "[background-size:24px_24px]",
    ].join(" "),
    none: "",
  };

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-[var(--velora-radius-xl)]",
        "border border-[var(--velora-border-base)]",
        className
      )}
    >
      {/* Header */}
      {(title || description || code) && (
        <div className="flex items-center justify-between border-b border-[var(--velora-border-muted)] px-4 py-2">
          <div className="flex items-center gap-1">
            {code && (
              <>
                <button
                  onClick={() => setTab("preview")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    tab === "preview"
                      ? "bg-[var(--velora-bg-subtle)] text-[var(--velora-text-primary)]"
                      : "text-[var(--velora-text-tertiary)] hover:text-[var(--velora-text-secondary)]"
                  )}
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden />
                  Preview
                </button>
                <button
                  onClick={() => setTab("code")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    tab === "code"
                      ? "bg-[var(--velora-bg-subtle)] text-[var(--velora-text-primary)]"
                      : "text-[var(--velora-text-tertiary)] hover:text-[var(--velora-text-secondary)]"
                  )}
                >
                  <Code2 className="h-3.5 w-3.5" aria-hidden />
                  Code
                </button>
              </>
            )}
          </div>
          {title && (
            <span className="text-xs font-medium text-[var(--velora-text-tertiary)]">
              {title}
            </span>
          )}
          {code && tab === "code" && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={copy}
              aria-label={copied ? "Copied!" : "Copy code"}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-[var(--velora-state-success)]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          )}
        </div>
      )}

      {/* Preview */}
      {tab === "preview" && (
        <div
          className={cn(
            "min-h-32 p-8",
            bgClasses[background],
            center && "flex items-center justify-center",
            previewClassName
          )}
        >
          {children}
        </div>
      )}

      {/* Code */}
      {tab === "code" && code && (
        <div className="relative">
          <pre className="overflow-auto rounded-none border-none p-5 text-sm">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

// ─── Props table ──────────────────────────────────────────────────────────────

interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropRow[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="my-6 overflow-auto rounded-[var(--velora-radius-xl)] border border-[var(--velora-border-base)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--velora-border-base)]">
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--velora-text-tertiary)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={cn(
                "border-b border-[var(--velora-border-muted)] last:border-0",
                i % 2 === 0 ? "" : "bg-[var(--velora-bg-subtle)]/50"
              )}
            >
              <td className="px-4 py-3 font-mono">
                <span className="text-[var(--velora-text-brand)]">
                  {prop.name}
                </span>
                {prop.required && (
                  <span className="ml-1 text-[var(--velora-state-danger)]">*</span>
                )}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-[var(--velora-text-secondary)]">
                {prop.type}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-[var(--velora-text-tertiary)]">
                {prop.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-[var(--velora-text-secondary)]">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
