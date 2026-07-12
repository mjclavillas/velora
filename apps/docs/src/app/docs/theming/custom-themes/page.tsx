import type { Metadata } from "next";
import {
  DocsPageHeader,
  DocsPageNav,
  DocSection,
  DocCodeBlock,
} from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Card, CardHeader, CardTitle, CardContent, Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Custom Themes — Velora UI",
  description:
    "How to create and apply custom themes using data-velora-theme attribute selectors.",
};

export default function CustomThemesPage() {
  return (
    <>
      <DocsPageHeader
        title="Custom Themes"
        description="Create custom themes using data attribute selectors."
        badges={["Theming"]}
      />

      <DocSection title="Theme Selector">
        <DocCodeBlock
          code={`<html data-velora-theme="ocean">
  <body>...</body>
</html>`}
          title="Applying a theme"
        />
      </DocSection>

      <DocSection title="Defining a Theme">
        <DocCodeBlock
          code={`[data-velora-theme="ocean"] {
  --velora-bg-primary:    #f0f9ff;
  --velora-bg-secondary:  #e0f2fe;
  --velora-text-primary:  #0c4a6e;
  --velora-text-secondary:#0369a1;
  --velora-text-brand:    #0284c7;
  --velora-border:        #bae6fd;
  --velora-border-hover:  #7dd3fc;
}`}
          title="Theme definition"
        />
      </DocSection>

      <DocSection title="Using with useLocalStorage">
        <DocCodeBlock
          code={`import { useLocalStorage } from "@velora/core";

export function ThemeProvider({ children }) {
  const [theme] = useLocalStorage("velora-theme", "light");

  return (
    <html data-velora-theme={theme}>
      <body>{children}</body>
    </html>
  );
}`}
          title="Persistent theme with hook"
        />
      </DocSection>

      <DocSection title="Theme Preview">
        <ComponentPreview
          title="How themes affect components"
          code={`<Card>\n  <CardHeader>\n    <CardTitle>Themed Card</CardTitle>\n  </CardHeader>\n  <CardContent>\n    <p>This card uses the current theme's CSS variables.</p>\n  </CardContent>\n</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Themed Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--velora-text-secondary)]">
                This card automatically adapts to the active theme via CSS variables.
              </p>
            </CardContent>
          </Card>
        </ComponentPreview>
      </DocSection>

      <Separator className="my-8" />

      <DocsPageNav
        prev={{ title: "CSS Variables", href: "/docs/theming/css-variables" }}
        next={{ title: "Tailwind Plugin", href: "/docs/theming/tailwind-plugin" }}
      />
    </>
  );
}
