import Link from "next/link";
import { Button, Badge, Card, CardContent } from "@velora/core";
import { Reveal, Stagger, StaggerItem, MorphText, AnimatedNumber } from "@velora/motion";
import {
  Sparkles,
  Zap,
  Shield,
  Palette,
  Code2,
  Layers,
  ArrowRight,
  Github,
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "8 Built-in Themes",
    description:
      "Dark, Light, AMOLED, Glass, Luxury, Cyberpunk, Neo Brutalism, and High Contrast — all via CSS custom properties with zero-FOUC SSR support.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Zap,
    title: "Framer Motion First",
    description:
      "Every interaction has purpose. Spring physics, layout animations, stagger effects, and reduced-motion support built into every component.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Shield,
    title: "WCAG 2.1 AA",
    description:
      "Radix UI primitives, ARIA labels, keyboard navigation, focus management, and screen reader support throughout. Accessibility is not an afterthought.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Code2,
    title: "TypeScript Native",
    description:
      "Strict types, CVA variant inference, exhaustive prop documentation, and zero any usage. Your IDE becomes a design system explorer.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Layers,
    title: "Composable Architecture",
    description:
      "asChild pattern, compound components, slot-based composition, and render prop support. Build anything without fighting the library.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: Sparkles,
    title: "40+ Components",
    description:
      "Button to DataTable, Sidebar to Command Palette — every component you need for a production SaaS, designed to the same premium standard.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const stats = [
  { label: "Components", value: 40, suffix: "+" },
  { label: "Theme variants", value: 8 },
  { label: "Bundle size", value: 0, suffix: "kB gzip*" },
  { label: "TypeScript coverage", value: 100, suffix: "%" },
];

const morphWords = [
  "accessible",
  "animated",
  "composable",
  "theme-ready",
  "TypeScript-first",
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        {/* Background mesh */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            backgroundImage: `
              radial-gradient(at 40% 20%, rgba(128,96,255,0.3) 0px, transparent 50%),
              radial-gradient(at 80% 10%, rgba(26,200,237,0.2) 0px, transparent 50%),
              radial-gradient(at 0% 80%, rgba(128,96,255,0.15) 0px, transparent 50%)
            `,
          }}
        />

        <Reveal variant="slideUp" delay={0.1}>
          <div className="mb-6 flex justify-center">
            <Badge
              variant="gradient"
              size="md"
              icon={<Sparkles className="h-3 w-3" />}
            >
              v0.1.0 Public Preview
            </Badge>
          </div>
        </Reveal>

        <Reveal variant="slideUp" delay={0.2}>
          <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
            <span className="gradient-text-brand">React UI</span>
            <br />
            that{"'"}s{" "}
            <MorphText
              texts={morphWords}
              className="gradient-text-brand"
            />
          </h1>
        </Reveal>

        <Reveal variant="slideUp" delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--velora-text-tertiary)]">
            40+ components. 8 themes. Spring animations. WCAG 2.1 AA. Built
            with Radix UI, Framer Motion, and CVA — designed to ship premium
            products faster.
          </p>
        </Reveal>

        <Reveal variant="slideUp" delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button variant="gradient" size="xl" asChild>
              <Link href="/docs/getting-started">
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a
                href="https://github.com/velora-ui/velora"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal variant="slideUp" delay={0.5}>
          <div className="mt-8">
            <pre className="inline-block rounded-[var(--velora-radius-lg)] border border-[var(--velora-border-base)] bg-[var(--velora-surface-base)] px-5 py-3 text-left text-sm text-[var(--velora-text-secondary)]">
              <span className="text-[var(--velora-text-tertiary)]">$</span>{" "}
              <span className="text-violet-400">npm</span> install @velora/core
            </pre>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--velora-border-base)] bg-[var(--velora-surface-base)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} variant="slideUp" delay={i * 0.1}>
                <div className="flex flex-col items-center gap-1 text-center">
                  <div className="text-4xl font-bold text-[var(--velora-text-primary)]">
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix ?? ""}
                      duration={1.5}
                    />
                  </div>
                  <div className="text-sm text-[var(--velora-text-tertiary)]">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="slideUp">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-[var(--velora-text-primary)]">
                Everything you need
              </h2>
              <p className="mx-auto max-w-lg text-[var(--velora-text-tertiary)]">
                No more compromises between design quality and developer
                experience. Velora gives you both.
              </p>
            </div>
          </Reveal>

          <Stagger>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <Card
                    variant="default"
                    interactive
                    padding="lg"
                    className="group h-full"
                  >
                    <div
                      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${feature.bg}`}
                    >
                      <feature.icon
                        className={`h-5 w-5 ${feature.color}`}
                        aria-hidden
                      />
                    </div>
                    <h3 className="mb-2 font-semibold text-[var(--velora-text-primary)]">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--velora-text-tertiary)]">
                      {feature.description}
                    </p>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      {/* Quick start code */}
      <section className="border-t border-[var(--velora-border-base)] py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal variant="slideUp">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-[var(--velora-text-primary)]">
                Start in seconds
              </h2>
              <p className="text-[var(--velora-text-tertiary)]">
                Install, wrap with ThemeProvider, and build.
              </p>
            </div>
          </Reveal>

          <Reveal variant="scaleIn" delay={0.1}>
            <Card variant="raised" padding="none">
              <div className="flex items-center gap-2 border-b border-[var(--velora-border-muted)] px-5 py-3">
                <div className="h-3 w-3 rounded-full bg-rose-500/60" />
                <div className="h-3 w-3 rounded-full bg-amber-500/60" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-xs text-[var(--velora-text-tertiary)]">
                  app/page.tsx
                </span>
              </div>
              <CardContent className="overflow-auto p-0">
                <pre className="p-5 text-sm leading-relaxed">
                  <code>{`import {
  Button, Card, CardHeader, CardTitle,
  CardContent, CardFooter, Badge,
  Input, useToast,
} from "@velora/core";

export function ProfileCard() {
  const { success } = useToast();

  return (
    <Card variant="raised">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Profile</CardTitle>
          <Badge variant="success" pulseDot>Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Input
          label="Display name"
          placeholder="John Doe"
          helperText="Shown publicly on your profile"
        />
      </CardContent>
      <CardFooter>
        <Button
          variant="gradient"
          onClick={() => success("Saved!", {
            description: "Profile updated successfully."
          })}
        >
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}`}</code>
                </pre>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <Reveal variant="scaleIn">
          <Card
            variant="premium"
            padding="xl"
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-[var(--velora-text-primary)]">
              Ready to build something beautiful?
            </h2>
            <p className="mb-8 text-[var(--velora-text-tertiary)]">
              Start with the quick-start guide, or explore the full component
              reference.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="gradient" size="lg" asChild>
                <Link href="/docs/getting-started">
                  Read the docs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/components">Browse components</Link>
              </Button>
            </div>
          </Card>
        </Reveal>
      </section>
    </main>
  );
}
