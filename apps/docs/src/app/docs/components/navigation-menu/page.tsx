import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "NavigationMenu — Velora UI",
  description:
    "Accessible navigation menu with dropdown support, keyboard navigation, and responsive layout.",
};

const basicCode = `import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@velora/core";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem href="/" label="Home" />
    <NavigationMenuItem href="/docs" label="Documentation">
      <NavigationMenuItem href="/docs/getting-started" label="Getting Started" />
      <NavigationMenuItem href="/docs/components" label="Components" />
      <NavigationMenuItem href="/docs/theming" label="Theming" />
    </NavigationMenuItem>
    <NavigationMenuItem href="/blog" label="Blog" />
  </NavigationMenuList>
</NavigationMenu>`;

const responsiveCode = `import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@velora/core";

// The navigation menu is fully responsive.
// On mobile it collapses into a hamburger menu automatically.

<NavigationMenu responsive>
  <NavigationMenuList>
    <NavigationMenuItem href="/" label="Home" />
    <NavigationMenuItem href="/products" label="Products" />
    <NavigationMenuItem href="/pricing" label="Pricing" />
    <NavigationMenuItem href="/about" label="About" />
    <NavigationMenuItem href="/contact" label="Contact" />
  </NavigationMenuList>
</NavigationMenu>`;

export default function NavigationMenuPage() {
  return (
    <>
      <DocsPageHeader
        title="NavigationMenu"
        description="Accessible navigation menu with dropdown sub-menus, keyboard navigation, and responsive mobile layout. Built on Radix UI."
        badges={["Radix Navigation", "Responsive"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock
          code={`import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@velora/core";`}
        />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          title="Basic navigation with nested dropdown items"
          code={basicCode}
        />
      </DocSection>

      <DocSection title="Responsive">
        <DocCodeBlock
          title="Responsive navigation with mobile collapse"
          code={responsiveCode}
        />
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "NavigationMenu",
              type: "Component",
              description: "Root container for the navigation menu. Manages context and positioning.",
            },
            {
              name: "NavigationMenuList",
              type: "Component",
              description: "Horizontal list wrapper for navigation items.",
            },
            {
              name: "NavigationMenuItem",
              type: "Component",
              description: "Individual navigation link or dropdown trigger.",
            },
            {
              name: "href",
              type: "string",
              description: "URL the navigation item links to.",
            },
            {
              name: "label",
              type: "string",
              required: true,
              description: "Visible text label for the navigation item.",
            },
            {
              name: "responsive",
              type: "boolean",
              default: "false",
              description: "Enables responsive behavior with mobile hamburger menu.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Input", href: "/docs/components/input" }}
        next={{ title: "Popover", href: "/docs/components/popover" }}
      />
    </>
  );
}
