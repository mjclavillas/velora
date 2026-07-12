import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Card — Velora UI",
  description: "Flexible card container with 5 variants, interactive mode, and composable sub-components.",
};

export default function CardPage() {
  return (
    <>
      <DocsPageHeader
        title="Card"
        description="Flexible card container with 5 variants: default, raised, premium, outlined, and glass. Compose with CardHeader, CardTitle, CardDescription, CardContent, and CardFooter."
        badges={["CVA"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          code={`<Card variant="default" className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Project Update</CardTitle>
    <CardDescription>Q4 performance review and roadmap.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your project has been onboarding 12 new contributors this quarter.</p>
  </CardContent>
  <CardFooter>
    <Button variant="default" size="sm">View details</Button>
  </CardFooter>
</Card>`}
        >
          <Card variant="default" className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Project Update</CardTitle>
              <CardDescription>Q4 performance review and roadmap.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--velora-text-secondary)]">
                Your project has been onboarding 12 new contributors this quarter.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="default" size="sm">View details</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Variants">
        <ComponentPreview
          title="All 5 variants"
          code={`<Card variant="default" padding="lg">Default Card</Card>
<Card variant="raised" padding="lg">Raised Card</Card>
<Card variant="premium" padding="lg">Premium Card</Card>
<Card variant="outlined" padding="lg">Outlined Card</Card>
<Card variant="glass" padding="lg">Glass Card</Card>`}
          previewClassName="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Card variant="default" padding="lg">
            <p className="text-sm font-medium text-[var(--velora-text-secondary)]">Default</p>
          </Card>
          <Card variant="raised" padding="lg">
            <p className="text-sm font-medium text-[var(--velora-text-secondary)]">Raised</p>
          </Card>
          <Card variant="premium" padding="lg">
            <p className="text-sm font-medium text-[var(--velora-text-secondary)]">Premium</p>
          </Card>
          <Card variant="outlined" padding="lg">
            <p className="text-sm font-medium text-[var(--velora-text-secondary)]">Outlined</p>
          </Card>
          <Card variant="glass" padding="lg">
            <p className="text-sm font-medium text-[var(--velora-text-secondary)]">Glass</p>
          </Card>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Interactive">
        <DocCodeBlock
          title="Clickable card"
          code={`"use client";
import { Card, CardContent } from "@velora/core";

export function ClickableCard() {
  return (
    <Card interactive onClick={() => console.log("clicked!")}>
      <CardContent>
        <p>Click this card</p>
      </CardContent>
    </Card>
  );
}`}
        />
        <div className="mt-3 text-sm text-[var(--velora-text-secondary)]">
          The <code className="text-[var(--velora-text-brand)]">interactive</code> prop adds hover, focus, and cursor-pointer styles for clickable cards.
        </div>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"default" | "raised" | "premium" | "outlined" | "glass"',
              default: '"default"',
              description: "Visual variant of the card.",
            },
            {
              name: "interactive",
              type: "boolean",
              default: "false",
              description: "Enables hover and focus styles with cursor-pointer for clickable cards.",
            },
            {
              name: "padding",
              type: '"none" | "sm" | "md" | "lg"',
              default: '"md"',
              description: "Internal padding applied to the card body.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes applied to the card root.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Button", href: "/docs/components/button" }}
        next={{ title: "Checkbox", href: "/docs/components/checkbox" }}
      />
    </>
  );
}
