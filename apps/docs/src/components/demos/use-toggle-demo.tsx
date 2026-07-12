"use client";

import { useToggle, Button, Badge } from "@velora/core";

export function UseToggleDemo() {
  const [isOpen, toggleOpen, setOpen] = useToggle(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={toggleOpen}>
          Toggle
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
          Force Open
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
          Force Close
        </Button>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[var(--velora-text-secondary)]">State:</span>
        <Badge variant={isOpen ? "success" : "secondary"}>
          {isOpen ? "Open" : "Closed"}
        </Badge>
      </div>
    </div>
  );
}
