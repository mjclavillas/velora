"use client";

import { useState } from "react";
import { useKeyboard, Badge } from "@velora/core";

export function UseKeyboardDemo() {
  const [lastKey, setLastKey] = useState<string | null>(null);

  useKeyboard({
    "ctrl+s": () => setLastKey("Ctrl+S (Save)"),
    "ctrl+k": () => setLastKey("Ctrl+K (Search)"),
    Escape: () => setLastKey("Escape (Close)"),
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm text-[var(--velora-text-secondary)]">Last pressed:</span>
        {lastKey ? (
          <Badge variant="info">{lastKey}</Badge>
        ) : (
          <Badge variant="secondary">None yet</Badge>
        )}
      </div>
      <div className="flex gap-2">
        <kbd className="rounded border border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)] px-2 py-1 text-xs font-mono">Ctrl+S</kbd>
        <kbd className="rounded border border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)] px-2 py-1 text-xs font-mono">Ctrl+K</kbd>
        <kbd className="rounded border border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)] px-2 py-1 text-xs font-mono">Esc</kbd>
      </div>
      <p className="text-xs text-[var(--velora-text-tertiary)]">
        Press a shortcut key above to see it detected.
      </p>
    </div>
  );
}
