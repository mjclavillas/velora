"use client";

import { useRef } from "react";
import { useClickOutside } from "@velora/core";

export function UseClickOutsideDemo() {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    alert("Clicked outside!");
  });

  return (
    <div className="space-y-3">
      <div
        ref={ref}
        className="rounded-lg border-2 border-dashed border-[var(--velora-border-base)] bg-[var(--velora-bg-subtle)] p-6 text-center"
      >
        <p className="text-sm font-medium text-[var(--velora-text-primary)]">
          Click inside this box — nothing happens
        </p>
        <p className="text-xs text-[var(--velora-text-tertiary)] mt-1">
          Click anywhere outside to trigger the callback
        </p>
      </div>
    </div>
  );
}
