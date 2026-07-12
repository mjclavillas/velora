import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection } from "@/components/DocsPage";
import { ComponentPreview } from "@/components/ComponentPreview";
import { DashboardPreview } from "@/components/demos/dashboard-preview";
import { AuthPreview } from "@/components/demos/auth-preview";

export const metadata: Metadata = {
  title: "Examples — Velora UI",
  description: "Full-page example layouts built with Velora UI components.",
};

const dashboardCode = `"use client";

import {
  SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarItem, SidebarCollapseButton,
  Button, Avatar, Badge, Card, CardHeader, CardTitle, CardDescription,
  CardContent, DataTable, type TableColumn, Progress,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, SimpleTooltip, useToast, useTheme,
} from "@velora/core";
import {
  LayoutDashboard, Users, BarChart3, Settings, CreditCard, Bell,
  Search, Plus, Sun, Moon, LogOut, ChevronDown,
  TrendingUp, TrendingDown, DollarSign, ShoppingCart,
} from "lucide-react";

interface Order {
  id: string;
  customer: string;
  email: string;
  status: "paid" | "pending" | "failed" | "refunded";
  amount: number;
  date: string;
}

const orders: Order[] = [
  { id: "ORD-001", customer: "Alice Johnson", email: "alice@example.com", status: "paid", amount: 249.99, date: "2024-09-01" },
  { id: "ORD-002", customer: "Bob Smith", email: "bob@example.com", status: "pending", amount: 89.00, date: "2024-09-02" },
  { id: "ORD-003", customer: "Carol White", email: "carol@example.com", status: "paid", amount: 1299.00, date: "2024-09-02" },
  { id: "ORD-004", customer: "Dave Brown", email: "dave@example.com", status: "failed", amount: 49.99, date: "2024-09-03" },
  { id: "ORD-005", customer: "Eve Davis", email: "eve@example.com", status: "refunded", amount: 199.00, date: "2024-09-03" },
  { id: "ORD-006", customer: "Frank Miller", email: "frank@example.com", status: "paid", amount: 599.00, date: "2024-09-04" },
];

const statusVariant: Record<Order["status"], "success" | "warning" | "danger" | "secondary"> = {
  paid: "success", pending: "warning", failed: "danger", refunded: "secondary",
};

const columns: TableColumn<Order>[] = [
  {
    key: "id", header: "Order", width: 100,
    cell: (row) => <span className="font-mono text-xs text-[var(--velora-text-brand)]">{row.id}</span>,
  },
  {
    key: "customer", header: "Customer", sortable: true,
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Avatar name={row.customer} size="xs" />
        <div>
          <div className="font-medium text-[var(--velora-text-primary)]">{row.customer}</div>
          <div className="text-xs text-[var(--velora-text-tertiary)]">{row.email}</div>
        </div>
      </div>
    ),
  },
  {
    key: "status", header: "Status", width: 100,
    cell: (row) => <Badge variant={statusVariant[row.status]} size="sm">{row.status}</Badge>,
  },
  {
    key: "amount", header: "Amount", sortable: true, align: "right", width: 100,
    cell: (row) => <span className="font-semibold tabular-nums">\${row.amount.toFixed(2)}</span>,
  },
  {
    key: "date", header: "Date", sortable: true, width: 120,
    cell: (row) => <span className="text-[var(--velora-text-tertiary)]">{row.date}</span>,
  },
];

export function DashboardExample() {
  const { toast, success } = useToast();
  const { theme, setTheme } = useTheme();
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  return (
    <SidebarProvider defaultCollapsed={false}>
      <div className="flex h-dvh bg-[var(--velora-bg-base)]">
        <Sidebar variant="default">
          <SidebarHeader>
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg,#8060ff,#1ac8ed)" }}>V</div>
              <span className="text-sm font-semibold text-[var(--velora-text-primary)]">Velora</span>
            </div>
            <SidebarCollapseButton />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active />
              <SidebarItem icon={<ShoppingCart />} label="Orders" badge="12" />
              <SidebarItem icon={<Users />} label="Customers" />
              <SidebarItem icon={<BarChart3 />} label="Analytics" />
            </SidebarGroup>
            <SidebarGroup label="Account">
              <SidebarItem icon={<CreditCard />} label="Billing" />
              <SidebarItem icon={<Settings />} label="Settings" />
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem icon={<Avatar name="Jane Doe" size="xs" />} label="Jane Doe" />
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--velora-border-muted)] px-6">
            <Button variant="outline" size="sm" leadingIcon={<Search />}>Search...</Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun /> : <Moon />}
              </Button>
              <Button variant="ghost" size="icon"><Bell /></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Avatar name="Jane Doe" size="xs" /> Jane <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Jane Doe</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem icon={<Settings />}>Settings</DropdownMenuItem>
                  <DropdownMenuItem icon={<LogOut />} destructive>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Card variant="default" padding="md">
                <p className="text-xs font-medium uppercase text-[var(--velora-text-tertiary)]">Revenue</p>
                <p className="mt-1 text-2xl font-bold">$48,291</p>
                <Progress value={72} size="xs" variant="gradient" />
              </Card>
              <Card variant="default" padding="md">
                <p className="text-xs font-medium uppercase text-[var(--velora-text-tertiary)]">Orders</p>
                <p className="mt-1 text-2xl font-bold">1,429</p>
                <Progress value={58} size="xs" variant="gradient" />
              </Card>
              <Card variant="default" padding="md">
                <p className="text-xs font-medium uppercase text-[var(--velora-text-tertiary)]">Customers</p>
                <p className="mt-1 text-2xl font-bold">3,241</p>
                <Progress value={45} size="xs" variant="gradient" />
              </Card>
              <Card variant="default" padding="md">
                <p className="text-xs font-medium uppercase text-[var(--velora-text-tertiary)]">Conv. rate</p>
                <p className="mt-1 text-2xl font-bold">4.6%</p>
                <Progress value={46} size="xs" variant="gradient" />
              </Card>
            </div>

            <Card variant="default">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent orders</CardTitle>
                    <CardDescription>Showing 6 of 1,429 orders</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <DataTable data={orders} columns={columns} selectable hoverable variant="minimal" />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}`;

const authCode = `"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button, Card, CardContent, CardFooter, Form, FormField,
  FormItem, FormLabel, FormControl, FormMessage,
  Input, Checkbox, Separator, Badge, useToast,
} from "@velora/core";
import { Github, Mail, Sparkles } from "lucide-react";

interface SignInFormData {
  email: string;
  password: string;
  remember: boolean;
}

export function SignInForm() {
  const { success, error } = useToast();
  const form = useForm<SignInFormData>({
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data: SignInFormData) => {
    await new Promise((r) => setTimeout(r, 1500));
    if (data.email === "fail@test.com") {
      error("Sign in failed", { description: "Invalid email or password." });
      form.setError("email", { message: "Invalid credentials" });
    } else {
      success("Welcome back!", { description: \`Signed in as \${data.email}\` });
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--velora-bg-base)] p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#8060ff,#1ac8ed)" }}>V</div>
          <div>
            <h1 className="text-xl font-semibold text-[var(--velora-text-primary)]">Welcome back</h1>
            <p className="text-sm text-[var(--velora-text-tertiary)]">Sign in to your Velora account</p>
          </div>
        </div>

        <Card variant="raised" padding="none">
          <CardContent className="pt-6">
            <div className="mb-4 flex flex-col gap-2">
              <Button variant="outline" className="w-full" leadingIcon={<Github />}>
                Continue with GitHub
              </Button>
              <Button variant="outline" className="w-full" leadingIcon={<Mail />}>
                Continue with Google
              </Button>
            </div>
            <Separator label="or" className="my-5" />

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
                <FormField control={form.control} name="email"
                  rules={{ required: "Email is required", pattern: { value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: "Enter a valid email" } }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel required>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="you@example.com"
                          state={fieldState.error ? "error" : "default"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField control={form.control} name="password"
                  rules={{ required: "Password is required" }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel required>Password</FormLabel>
                        <a href="/forgot-password" className="text-xs text-[var(--velora-text-brand)] hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <FormControl>
                        <Input {...field} type="password" placeholder="••••••••"
                          state={fieldState.error ? "error" : "default"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField control={form.control} name="remember"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange}
                          label="Remember me for 30 days" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" variant="gradient" className="w-full"
                  loading={form.formState.isSubmitting}>
                  Sign in
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center border-t border-[var(--velora-border-muted)] pt-4">
            <p className="text-sm text-[var(--velora-text-tertiary)]">
              Don&apos;t have an account?{" "}
              <a href="/sign-up" className="font-medium text-[var(--velora-text-brand)] hover:underline">Sign up</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}`;

export default function ExamplesPage() {
  return (
    <>
      <DocsPageHeader
        title="Examples"
        description="Full-page example layouts built with Velora UI components. Preview them live, copy the code, and adapt for your project."
        badges={["Dashboard", "Auth"]}
      />

      <DocSection title="Dashboard">
        <p className="mb-4 text-sm text-[var(--velora-text-secondary)]">
          A production-ready dashboard with collapsible sidebar, stat cards with progress bars, data table, theme toggle, and dropdown menu.
        </p>
        <ComponentPreview
          title="DashboardExample.tsx"
          code={dashboardCode}
          background="none"
          center={false}
          previewClassName="!p-0"
        >
          <DashboardPreview />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Auth Forms">
        <p className="mb-4 text-sm text-[var(--velora-text-secondary)]">
          Sign in form with React Hook Form integration, OAuth buttons, validation states, and loading feedback.
        </p>
        <ComponentPreview
          title="SignInForm.tsx"
          code={authCode}
          background="subtle"
        >
          <AuthPreview />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Source Files">
        <p className="text-sm text-[var(--velora-text-secondary)]">
          The complete, unabridged source files are available in the{" "}
          <a
            href="https://github.com/mjclavillas/velora/tree/main/examples"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--velora-text-brand)] hover:underline"
          >
            examples directory
          </a>{" "}
          on GitHub.
        </p>
      </DocSection>

      <DocsPageNav
        prev={{ title: "Variants", href: "/docs/motion/variants" }}
      />
    </>
  );
}
