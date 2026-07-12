import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Accordion — Velora UI",
  description: "Collapsible content sections that expand and collapse to show or hide information.",
};

export default function AccordionPage() {
  return (
    <>
      <DocsPageHeader
        title="Accordion"
        description="Collapsible content sections that expand and collapse to show or hide information. Supports single or multiple open items."
        badges={["Radix Primitives", "CVA"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <ComponentPreview
          code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the other components&apos; aesthetic.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion type="single" collapsible className="w-full max-w-lg">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that match the other components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Data-driven items">
        <ComponentPreview
          title="Rendering from data"
          code={`const sections = [
  { value: "item-1", title: "Section 1", body: "Content for section 1." },
  { value: "item-2", title: "Section 2", body: "Content for section 2." },
];

<Accordion type="single" collapsible>
  {sections.map((s) => (
    <AccordionItem key={s.value} value={s.value}>
      <AccordionTrigger>{s.title}</AccordionTrigger>
      <AccordionContent>{s.body}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`}
        >
          <Accordion type="single" collapsible className="w-full max-w-lg">
            {[
              { value: "item-1", title: "Section 1", body: "Content for section 1." },
              { value: "item-2", title: "Section 2", body: "Content for section 2." },
            ].map((s) => (
              <AccordionItem key={s.value} value={s.value}>
                <AccordionTrigger>{s.title}</AccordionTrigger>
                <AccordionContent>{s.body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "type",
              type: '"single" | "multiple"',
              default: '"single"',
              description: "Whether only one or multiple accordion items can be open at a time.",
            },
            {
              name: "collapsible",
              type: "boolean",
              default: "false",
              description: "When true, the open item can be collapsed so all items are closed.",
            },
            {
              name: "defaultValue",
              type: "string[]",
              description: "The controlled value(s) of the item(s) that are open on initial render.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes applied to the root element.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "TypeScript", href: "/docs/typescript" }}
        next={{ title: "Avatar", href: "/docs/components/avatar" }}
      />
    </>
  );
}
