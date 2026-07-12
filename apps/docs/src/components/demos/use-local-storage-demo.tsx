"use client";

import { useLocalStorage, Button, Badge } from "@velora/core";

export function UseLocalStorageDemo() {
  const [count, setCount, removeCount] = useLocalStorage("velora-demo-count", 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => setCount(count + 1)}>
          Increment
        </Button>
        <Button variant="ghost" size="sm" onClick={removeCount}>
          Reset
        </Button>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[var(--velora-text-secondary)]">Persisted value:</span>
        <Badge variant="secondary">{count}</Badge>
      </div>
      <p className="text-xs text-[var(--velora-text-tertiary)]">
        Value persists across page reloads via localStorage.
      </p>
    </div>
  );
}
