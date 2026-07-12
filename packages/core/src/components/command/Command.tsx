/**
 * Velora Command
 *
 * ⌘K command palette with fuzzy search, groups, keyboard navigation,
 * and dialog integration. Built on cmdk.
 *
 * Note: requires `cmdk` package — add to dependencies.
 * npm install cmdk
 */

"use client";

import * as React from "react";
import { Search, Loader2 } from "lucide-react";
import { cn } from "../../utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  group?: string;
  onSelect: () => void;
  keywords?: string[];
  disabled?: boolean;
}

export interface CommandProps {
  items: CommandItem[];
  placeholder?: string;
  emptyText?: string;
  loading?: boolean;
  className?: string;
  onClose?: () => void;
}

// ─── Simple Command implementation (no cmdk dependency) ───────────────────────

function Command({
  items,
  placeholder = "Search commands…",
  emptyText = "No results found.",
  loading = false,
  className,
  onClose,
}: CommandProps) {
  const [query, setQuery] = React.useState("");
  const [activeIdx, setActiveIdx] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = React.useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }, [items, query]);

  const groups = React.useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of filtered) {
      const g = item.group ?? "";
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(item);
    }
    return map;
  }, [filtered]);

  const flatFiltered = filtered;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, flatFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const active = flatFiltered[activeIdx];
      if (active && !active.disabled) {
        active.onSelect();
        onClose?.();
      }
    } else if (e.key === "Escape") {
      onClose?.();
    }
  };

  let globalIdx = 0;

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden",
        "rounded-[var(--velora-radius-xl)]",
        "border border-[var(--velora-border-base)]",
        "bg-[var(--velora-surface-overlay)]",
        "shadow-[var(--velora-shadow-2xl)]",
        className
      )}
      onKeyDown={handleKeyDown}
    >
      {/* Search input */}
      <div className="flex items-center gap-3 border-b border-[var(--velora-border-muted)] px-4 py-3">
        {loading ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[var(--velora-text-tertiary)]" />
        ) : (
          <Search className="h-4 w-4 shrink-0 text-[var(--velora-text-tertiary)]" />
        )}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIdx(0);
          }}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent text-sm text-[var(--velora-text-primary)]",
            "placeholder:text-[var(--velora-text-tertiary)]",
            "outline-none border-none"
          )}
          aria-label="Search commands"
          role="combobox"
          aria-expanded="true"
          aria-autocomplete="list"
        />
        <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)] px-1.5 text-[10px] text-[var(--velora-text-tertiary)] font-mono">
          ESC
        </kbd>
      </div>

      {/* Results */}
      <div
        className="max-h-80 overflow-y-auto p-2 scrollbar-thin"
        role="listbox"
        aria-label="Command results"
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <p className="text-sm text-[var(--velora-text-tertiary)]">
              {emptyText}
            </p>
          </div>
        ) : (
          Array.from(groups.entries()).map(([group, groupItems]) => (
            <div key={group} className="mb-2 last:mb-0">
              {group && (
                <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--velora-text-tertiary)]">
                  {group}
                </p>
              )}
              {groupItems.map((item) => {
                const idx = globalIdx++;
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={item.id}
                    role="option"
                    aria-selected={isActive}
                    disabled={item.disabled}
                    onClick={() => {
                      if (!item.disabled) {
                        item.onSelect();
                        onClose?.();
                      }
                    }}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[var(--velora-radius-md)] px-2 py-2 text-left",
                      "transition-colors duration-100",
                      isActive
                        ? "bg-[var(--velora-brand-subtle)] text-[var(--velora-text-brand)]"
                        : "text-[var(--velora-text-primary)] hover:bg-[var(--velora-bg-subtle)]",
                      item.disabled && "opacity-40 cursor-not-allowed"
                    )}
                  >
                    {item.icon && (
                      <span
                        className={cn(
                          "shrink-0 [&>svg]:h-4 [&>svg]:w-4",
                          isActive
                            ? "text-[var(--velora-brand-default)]"
                            : "text-[var(--velora-text-tertiary)]"
                        )}
                        aria-hidden
                      >
                        {item.icon}
                      </span>
                    )}
                    <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                      <span className="text-sm font-medium truncate">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="text-xs text-[var(--velora-text-tertiary)] truncate">
                          {item.description}
                        </span>
                      )}
                    </div>
                    {item.shortcut && (
                      <div className="flex shrink-0 items-center gap-0.5">
                        {item.shortcut.map((key, i) => (
                          <kbd
                            key={i}
                            className="inline-flex h-5 items-center rounded border border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)] px-1.5 text-[10px] font-mono text-[var(--velora-text-tertiary)]"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[var(--velora-border-muted)] px-4 py-2">
        <div className="flex items-center gap-3 text-[10px] text-[var(--velora-text-tertiary)]">
          <span className="flex items-center gap-1">
            <kbd className="font-mono">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="font-mono">↵</kbd> select
          </span>
        </div>
        <span className="text-[10px] text-[var(--velora-text-tertiary)]">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

// ─── useCommandPalette hook ───────────────────────────────────────────────────

export function useCommandPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return { open, setOpen };
}

export { Command };
