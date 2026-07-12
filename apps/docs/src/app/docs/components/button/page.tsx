import type { Metadata } from "next";
import {
  Button,
  Badge,
  Separator,
} from "@velora/core";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Plus, ArrowRight, Download, Trash2, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Button",
  description: "Interactive element with 14 variants, size options, loading state, and icon composition.",
};

export default function ButtonPage() {
  return (
    <div className="prose max-w-none">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1>Button</h1>
          <p className="lead text-[var(--velora-text-tertiary)] text-lg mt-2">
            The primary interactive element. 14 visual variants, 6 sizes, loading state, icon composition, and the{" "}
            <code>asChild</code> render pattern.
          </p>
        </div>
        <div className="flex gap-2 mt-1">
          <Badge variant="secondary">Radix Slot</Badge>
          <Badge variant="secondary">CVA</Badge>
        </div>
      </div>

      <Separator className="my-8" />

      <h2>Installation</h2>
      <pre><code>{`import { Button } from "@velora/core";`}</code></pre>

      <h2>Usage</h2>
      <ComponentPreview
        code={`<Button variant="default">Save changes</Button>`}
      >
        <Button variant="default">Save changes</Button>
      </ComponentPreview>

      <h2>Variants</h2>

      <ComponentPreview
        title="All 14 variants"
        code={`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="gradient">Gradient</Button>
<Button variant="glass">Glass</Button>
<Button variant="soft">Soft</Button>
<Button variant="flat">Flat</Button>
<Button variant="luxury">Luxury</Button>
<Button variant="enterprise">Enterprise</Button>
<Button variant="minimal">Minimal</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>`}
        previewClassName="flex flex-wrap gap-3"
      >
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="gradient">Gradient</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="flat">Flat</Button>
        <Button variant="enterprise">Enterprise</Button>
        <Button variant="minimal">Minimal</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
      </ComponentPreview>

      <h2>Sizes</h2>
      <ComponentPreview
        title="Size scale"
        code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">XL</Button>
<Button size="2xl">2XL</Button>`}
        previewClassName="flex flex-wrap items-center gap-3"
      >
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">XL</Button>
        <Button size="2xl">2XL</Button>
      </ComponentPreview>

      <h2>Loading state</h2>
      <ComponentPreview
        code={`<Button loading>Saving…</Button>
<Button variant="outline" loading>Loading</Button>`}
        previewClassName="flex gap-3"
      >
        <Button loading>Saving…</Button>
        <Button variant="outline" loading>Loading</Button>
      </ComponentPreview>

      <h2>With icons</h2>
      <ComponentPreview
        code={`<Button leadingIcon={<Plus />}>New project</Button>
<Button trailingIcon={<ArrowRight />}>Continue</Button>
<Button size="icon" variant="outline" srLabel="Download"><Download /></Button>
<Button variant="destructive" leadingIcon={<Trash2 />}>Delete</Button>
<Button variant="success" leadingIcon={<Check />}>Confirm</Button>`}
        previewClassName="flex flex-wrap gap-3"
      >
        <Button leadingIcon={<Plus className="h-4 w-4" />}>New project</Button>
        <Button trailingIcon={<ArrowRight className="h-4 w-4" />}>Continue</Button>
        <Button size="icon" variant="outline" srLabel="Download">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="destructive" leadingIcon={<Trash2 className="h-4 w-4" />}>Delete</Button>
        <Button variant="success" leadingIcon={<Check className="h-4 w-4" />}>Confirm</Button>
      </ComponentPreview>

      <h2>asChild — polymorphic rendering</h2>
      <p>
        Use <code>asChild</code> to render as any element (e.g. Next.js{" "}
        <code>Link</code>) while keeping all Button styles and accessibility
        attributes.
      </p>
      <pre><code>{`import Link from "next/link";
import { Button } from "@velora/core";

// Renders as <a> with Button styles
<Button variant="gradient" asChild>
  <Link href="/dashboard">Go to dashboard</Link>
</Button>`}</code></pre>

      <h2>Disabled</h2>
      <ComponentPreview
        previewClassName="flex gap-3"
        code={`<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled</Button>`}
      >
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled</Button>
      </ComponentPreview>

      <Separator className="my-8" />

      <h2>API Reference</h2>
      <PropsTable
        props={[
          {
            name: "variant",
            type: '"default" | "secondary" | "outline" | "ghost" | "soft" | "glass" | "gradient" | "flat" | "luxury" | "enterprise" | "minimal" | "destructive" | "success" | "warning"',
            default: '"default"',
            description: "Visual variant of the button.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "icon" | "icon-sm" | "icon-lg"',
            default: '"md"',
            description: "Size preset controlling height and padding.",
          },
          {
            name: "loading",
            type: "boolean",
            default: "false",
            description: "Shows a spinner and disables interaction. Content is hidden but preserved for stable layout.",
          },
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description: "Merges props onto the immediate child element via Radix Slot.",
          },
          {
            name: "leadingIcon",
            type: "ReactNode",
            description: "Icon rendered before the label.",
          },
          {
            name: "trailingIcon",
            type: "ReactNode",
            description: "Icon rendered after the label.",
          },
          {
            name: "srLabel",
            type: "string",
            description: "Screen-reader-only label for icon-only buttons.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disables the button. Also applied automatically when loading=true.",
          },
        ]}
      />
    </div>
  );
}
