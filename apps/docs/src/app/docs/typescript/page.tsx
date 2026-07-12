import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Button, Badge, Separator } from "@velora/core";
import { Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "TypeScript",
  description: "Strict types, CVA variant inference, and zero-any patterns for full IntelliSense across every component.",
};

export default function TypeScriptPage() {
  return (
    <>
      <DocsPageHeader
        title="TypeScript"
        description="Every component is fully typed with strict mode, zero any, and CVA variant inference for autocompletion that works out of the box."
        badges={["Guide"]}
      />

      <DocSection title="Strict Types">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Velora is built with TypeScript strict mode. Every component exports
          its prop types alongside the component itself.
        </p>
        <DocCodeBlock
          code={`import type {
  ButtonProps,
  CardProps,
  BadgeProps,
  InputProps,
  AvatarProps,
  SwitchProps,
  CheckboxProps,
  TextareaProps,
  ProgressProps,
  DataTableProps,
  SidebarProps,
  ThemeProviderProps,
  VeloraTheme,
} from "@velora/core";`}
          title="Exported prop types"
        />
      </DocSection>

      <DocSection title="CVA Variants">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Velora uses <code>class-variance-authority</code> (CVA) to define
          component variants. The variant types are exported directly, so you can
          reuse them in your own code with full type safety.
        </p>
        <DocCodeBlock
          code={`import { Button, buttonVariants } from "@velora/core";
import type { ButtonProps } from "@velora/core";

// All variant options are inferred from the CVA definition
type Variant = ButtonProps["variant"];   // "default" | "secondary" | "outline" | ...
type Size = ButtonProps["size"];         // "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "icon" | ...`}
          title="Variant inference"
        />
      </DocSection>

      <DocSection title="Variants in Action">
        <ComponentPreview
          title="TypeScript autocompletion for variants"
          code={`<Button variant="default">Default</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="destructive">Destructive</Button>\n<Button variant="gradient">Gradient</Button>`}
          previewClassName="flex flex-wrap gap-3"
        >
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="gradient">Gradient</Button>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Extending Props">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Create wrapper components that add custom props while preserving the
          original type contract.
        </p>
        <DocCodeBlock
          code={`import { forwardRef } from "react";
import { Button, type ButtonProps } from "@velora/core";

interface IconButtonProps extends ButtonProps {
  /** Tooltip text shown on hover */
  tooltip: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ tooltip, ...props }, ref) => {
    return <Button ref={ref} aria-label={tooltip} {...props} />;
  }
);
IconButton.displayName = "IconButton";`}
          title="Extending component props"
        />
        <DocCodeBlock
          code={`import Link from "next/link";
import { Button } from "@velora/core";

// TypeScript knows the child must accept Button's props
<Button variant="gradient" asChild>
  <Link href="/dashboard">Go to dashboard</Link>
</Button>`}
          title="Polymorphic rendering"
        />
      </DocSection>

      <DocSection title="Token Types">
        <p className="mb-3 text-sm text-[var(--velora-text-secondary)]">
          Design tokens are exported as TypeScript types, so you can reference
          spacing, colors, and radii with autocompletion.
        </p>
        <DocCodeBlock
          code={`import { palette, spacing, radius } from "@velora/core";
import type { PaletteColor, Spacing, Radius } from "@velora/core";

// Typed spacing value
const gap: Spacing = "4"; // "0" | "0.5" | "1" | "1.5" | "2" | "3" | "4" | ...

// Access token values with autocompletion
const primaryColor = palette.indigo["500"];`}
          title="Token types"
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Theming", href: "/docs/theming" }}
        next={{ title: "Accordion", href: "/docs/components/accordion" }}
      />
    </>
  );
}
