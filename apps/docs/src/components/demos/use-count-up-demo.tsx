"use client";

import { useCountUp, Button } from "@velora/core";
import { useState } from "react";

export function UseCountUpDemo() {
  const [target, setTarget] = useState(1000);
  const count = useCountUp(target, 2000);

  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-[var(--velora-text-brand)]">
          {count.toLocaleString()}
        </span>
        <span className="text-sm text-[var(--velora-text-tertiary)]">/ {target.toLocaleString()}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setTarget(100)}>
          100
        </Button>
        <Button variant="outline" size="sm" onClick={() => setTarget(1000)}>
          1,000
        </Button>
        <Button variant="outline" size="sm" onClick={() => setTarget(10000)}>
          10,000
        </Button>
        <Button variant="outline" size="sm" onClick={() => setTarget(100000)}>
          100,000
        </Button>
      </div>
    </div>
  );
}
