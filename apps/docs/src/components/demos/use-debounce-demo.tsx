"use client";

import { useState } from "react";
import { useDebounce, Input } from "@velora/core";

export function UseDebounceDemo() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  return (
    <div className="space-y-3">
      <Input
        label="Search"
        placeholder="Type something..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="rounded-lg border border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)] p-3 text-sm">
        <span className="text-[var(--velora-text-secondary)]">Instant: </span>
        <code className="text-[var(--velora-text-brand)]">{query || "(empty)"}</code>
        <span className="mx-2 text-[var(--velora-text-tertiary)]">|</span>
        <span className="text-[var(--velora-text-secondary)]">Debounced (500ms): </span>
        <code className="text-[var(--velora-text-brand)]">{debouncedQuery || "(empty)"}</code>
      </div>
    </div>
  );
}
