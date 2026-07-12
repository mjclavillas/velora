"use client";

import * as React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Avatar,
  AvatarGroup,
  Input,
  Switch,
  Checkbox,
  Progress,
  CircularProgress,
  Skeleton,
  SkeletonCard,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Separator,
  useToast,
  ToastProvider,
  ThemeProvider,
  ThemeScript,
  useTheme,
  type VeloraTheme,
} from "@velora/core";
import {
  Sun,
  Moon,
  Sparkles,
  Zap,
  Shield,
  Check,
  X,
  Bell,
  Settings,
  User,
  CreditCard,
  LogOut,
  ChevronDown,
} from "lucide-react";

const THEMES: VeloraTheme[] = [
  "dark",
  "light",
  "amoled",
  "glass",
  "luxury",
  "cyberpunk",
  "neo-brutalism",
  "high-contrast",
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-wrap gap-2">
      {THEMES.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={[
            "rounded-full border px-3 py-1 text-xs font-medium transition-all",
            theme === t
              ? "border-[var(--velora-brand-default)] bg-[var(--velora-brand-subtle)] text-[var(--velora-text-brand)]"
              : "border-[var(--velora-border-base)] text-[var(--velora-text-tertiary)] hover:border-[var(--velora-border-strong)] hover:text-[var(--velora-text-primary)]",
          ].join(" ")}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function PlaygroundContent() {
  const { success, error, info, warning } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(65);
  const [switchOn, setSwitchOn] = React.useState(true);
  const [checked, setChecked] = React.useState(true);
  const [selectVal, setSelectVal] = React.useState("");

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      success("Done!", { description: "Operation completed successfully." });
    }, 2000);
  };

  return (
    <div className="min-h-dvh bg-[var(--velora-bg-base)] p-8 font-[var(--velora-font-sans)]">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--velora-text-primary)]">
              Velora UI Playground
            </h1>
            <p className="text-sm text-[var(--velora-text-tertiary)]">
              Interactive component explorer — try all themes live
            </p>
          </div>
          <Badge variant="gradient" icon={<Sparkles className="h-3 w-3" />}>
            v0.1.0
          </Badge>
        </div>

        {/* Theme switcher */}
        <Card variant="default" padding="md">
          <h2 className="mb-3 text-sm font-semibold text-[var(--velora-text-secondary)]">
            Theme
          </h2>
          <ThemeSwitcher />
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Buttons */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>14 variants across 6 sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="gradient">Gradient</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="destructive">Danger</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="soft">Soft</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">XS</Button>
                <Button size="sm">SM</Button>
                <Button size="md">MD</Button>
                <Button size="lg">LG</Button>
                <Button loading={loading} onClick={handleLoading}>
                  {loading ? "Loading…" : "Try loading"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Badges & Avatars */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Badges & Avatars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" dot>Default</Badge>
                <Badge variant="success" pulseDot>Live</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="solid">New</Badge>
                <Badge variant="outline" dismissable onDismiss={() => {}}>
                  Dismissable
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <Avatar name="John Doe" size="sm" status="online" />
                <Avatar name="Kate Lee" size="md" status="busy" />
                <Avatar name="Max R" size="lg" status="away" />
                <AvatarGroup max={3} size="md">
                  <Avatar name="Alice" />
                  <Avatar name="Bob" />
                  <Avatar name="Carol" />
                  <Avatar name="Dave" />
                  <Avatar name="Eve" />
                </AvatarGroup>
              </div>
            </CardContent>
          </Card>

          {/* Form controls */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Form Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
              />
              <Input
                label="Password (error)"
                type="password"
                errorMessage="Password must be at least 8 characters"
                defaultValue="short"
              />
              <Select value={selectVal} onValueChange={setSelectVal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select framework…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="remix">Remix</SelectItem>
                  <SelectItem value="vite">Vite + React</SelectItem>
                  <SelectItem value="gatsby">Gatsby</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-6">
                <Switch
                  checked={switchOn}
                  onCheckedChange={setSwitchOn}
                  label="Notifications"
                />
                <Checkbox
                  checked={checked}
                  onCheckedChange={(v) => setChecked(v as boolean)}
                  label="Subscribe"
                />
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} label="Storage used" showLabel variant="gradient" size="lg" />
              <Progress value={72} variant="success" size="md" />
              <Progress value={45} variant="warning" size="sm" />
              <Progress indeterminate variant="default" size="xs" />
              <div className="flex gap-4">
                <CircularProgress value={progress} size={56} showLabel />
                <CircularProgress value={88} size={56} variant="success" showLabel />
                <CircularProgress value={30} size={56} variant="danger" showLabel />
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(+e.target.value)}
                className="w-full accent-[var(--velora-brand-default)]"
              />
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="account">
                <TabsList variant="pills">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="team" badge="3">Team</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <p className="text-sm text-[var(--velora-text-tertiary)]">
                    Manage your account settings and preferences.
                  </p>
                </TabsContent>
                <TabsContent value="billing">
                  <p className="text-sm text-[var(--velora-text-tertiary)]">
                    View invoices and manage your subscription.
                  </p>
                </TabsContent>
                <TabsContent value="team">
                  <p className="text-sm text-[var(--velora-text-tertiary)]">
                    Invite members and manage permissions.
                  </p>
                </TabsContent>
              </Tabs>
              <Tabs defaultValue="overview">
                <TabsList variant="underline">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Toast */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Toast Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => success("Saved!", { description: "Your changes have been saved." })}
                  leadingIcon={<Check className="h-3.5 w-3.5" />}
                >
                  Success
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => error("Error!", { description: "Something went wrong." })}
                  leadingIcon={<X className="h-3.5 w-3.5" />}
                >
                  Error
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => warning("Warning", { description: "Disk space low." })}
                >
                  Warning
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => info("Update available", {
                    description: "Version 2.1 is ready.",
                    action: { label: "Install", onClick: () => {} },
                  })}
                >
                  Info + action
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Skeleton */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Skeleton</CardTitle>
            </CardHeader>
            <CardContent>
              <SkeletonCard showAvatar lines={3} />
            </CardContent>
          </Card>

          {/* Accordion */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Accordion</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible variant="cards">
                <AccordionItem value="1">
                  <AccordionTrigger icon={<Zap className="h-4 w-4" />}>
                    Performance
                  </AccordionTrigger>
                  <AccordionContent>
                    Tree-shakeable, zero runtime, optimized bundle with minimal
                    Tailwind CSS output.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2">
                  <AccordionTrigger icon={<Shield className="h-4 w-4" />}>
                    Accessibility
                  </AccordionTrigger>
                  <AccordionContent>
                    Full WCAG 2.1 AA compliance with Radix UI primitives,
                    keyboard navigation, and ARIA support.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="3">
                  <AccordionTrigger icon={<Sparkles className="h-4 w-4" />}>
                    Theming
                  </AccordionTrigger>
                  <AccordionContent>
                    8 built-in themes via CSS custom properties with
                    zero-FOUC SSR support and smooth transitions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <>
      <ThemeScript defaultTheme="dark" />
      <ThemeProvider defaultTheme="dark">
        <ToastProvider position="bottom-right">
          <PlaygroundContent />
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}
