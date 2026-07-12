"use client";

import { useIsMobile, useIsTablet, useIsDesktop, Badge } from "@velora/core";
import { Check, X } from "lucide-react";

export function UseMediaQueryDemo() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  const items = [
    { label: "Mobile (< 768px)", value: isMobile },
    { label: "Tablet (768–1024px)", value: isTablet },
    { label: "Desktop (> 1024px)", value: isDesktop },
  ];

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-sm">
          {item.value ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <X className="h-4 w-4 text-[var(--velora-text-tertiary)]" />
          )}
          <span className={item.value ? "text-[var(--velora-text-primary)]" : "text-[var(--velora-text-tertiary)]"}>
            {item.label}
          </span>
          {item.value && (
            <Badge variant="success" size="sm">Active</Badge>
          )}
        </div>
      ))}
      <p className="text-xs text-[var(--velora-text-tertiary)] mt-2">
        Resize your browser to see the active breakpoint change.
      </p>
    </div>
  );
}
