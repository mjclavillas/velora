import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "Quick Start",
  description: "Build your first Velora UI page in minutes.",
};

export default function QuickStartPage() {
  return (
    <>
      <DocsPageHeader
        title="Quick Start"
        description="Build a themed page with Velora UI in 3 steps."
      />

      <DocSection title="Install">
        <DocCodeBlock code={`npm install @velora/core @velora/motion`} title="Terminal" />
      </DocSection>

      <DocSection title="Wrap Your App">
        <DocCodeBlock
          code={`// app/layout.tsx
import { ThemeProvider, ThemeScript } from "@velora/core";
import "@velora/core/styles";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeScript defaultTheme="dark" />
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}
          title="app/layout.tsx"
        />
      </DocSection>

      <DocSection title="Use Components">
        <ComponentPreview
          code={`<Card variant="raised">\n  <CardHeader>\n    <div className="flex items-center justify-between">\n      <CardTitle>Welcome</CardTitle>\n      <Badge variant="success">Active</Badge>\n    </div>\n  </CardHeader>\n  <CardContent>\n    <Button variant="gradient" size="lg">Get started</Button>\n  </CardContent>\n</Card>`}
          previewClassName="flex justify-center"
        >
          <Card variant="raised" className="w-full max-w-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Welcome</CardTitle>
                <Badge variant="success">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="gradient" size="lg">Get started</Button>
            </CardContent>
          </Card>
        </ComponentPreview>
      </DocSection>

      <DocsPageNav
        prev={{ title: "Installation", href: "/docs/installation" }}
        next={{ title: "Theming", href: "/docs/theming" }}
      />
    </>
  );
}
