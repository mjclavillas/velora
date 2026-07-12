"use client";

import { useCopyToClipboard, Button } from "@velora/core";
import { Check, Copy } from "lucide-react";

export function UseCopyToClipboardDemo() {
  const [copied, copy] = useCopyToClipboard(2000);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Button
          variant={copied ? "success" : "outline"}
          size="sm"
          onClick={() => copy("Hello from Velora UI!")}
          leadingIcon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        >
          {copied ? "Copied!" : "Copy text"}
        </Button>
      </div>
      <p className="text-xs text-[var(--velora-text-tertiary)]">
        Click to copy. State auto-resets after 2 seconds.
      </p>
    </div>
  );
}
