"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarCollapseButton,
  Button,
  Avatar,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Progress,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@velora/core";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Search,
  Sun,
  Moon,
  LogOut,
  Bell,
  ChevronDown,
  TrendingUp,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

const statCards = [
  { title: "Revenue", value: "$48,291", change: "+12.5%", positive: true, icon: DollarSign, progress: 72 },
  { title: "Orders", value: "1,429", change: "+8.3%", positive: true, icon: ShoppingCart, progress: 58 },
  { title: "Customers", value: "3,241", change: "+3.1%", positive: true, icon: Users, progress: 45 },
  { title: "Conv. rate", value: "4.6%", change: "-0.4%", positive: false, icon: BarChart3, progress: 46 },
];

const orders = [
  { id: "ORD-001", customer: "Alice Johnson", status: "paid", amount: "249.99" },
  { id: "ORD-002", customer: "Bob Smith", status: "pending", amount: "89.00" },
  { id: "ORD-003", customer: "Carol White", status: "paid", amount: "1,299.00" },
  { id: "ORD-004", customer: "Dave Brown", status: "failed", amount: "49.99" },
];

const statusVariant: Record<string, "success" | "warning" | "danger" | "secondary"> = {
  paid: "success",
  pending: "warning",
  failed: "danger",
};

export function DashboardPreview() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-[var(--velora-border-base)]" style={{ height: 420 }}>
      <SidebarProvider defaultCollapsed>
        <div className="flex h-full bg-[var(--velora-bg-base)]">
          <Sidebar variant="default" className="!w-48">
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg,#8060ff,#1ac8ed)" }}>
                  V
                </div>
                <span className="text-xs font-semibold text-[var(--velora-text-primary)]">Velora</span>
              </div>
              <SidebarCollapseButton />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarItem icon={<LayoutDashboard className="h-3.5 w-3.5" />} label="Dashboard" active />
                <SidebarItem icon={<ShoppingCart className="h-3.5 w-3.5" />} label="Orders" badge="12" />
                <SidebarItem icon={<Users className="h-3.5 w-3.5" />} label="Customers" />
                <SidebarItem icon={<BarChart3 className="h-3.5 w-3.5" />} label="Analytics" />
              </SidebarGroup>
              <SidebarGroup label="Account">
                <SidebarItem icon={<CreditCard className="h-3.5 w-3.5" />} label="Billing" />
                <SidebarItem icon={<Settings className="h-3.5 w-3.5" />} label="Settings" />
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarItem icon={<Avatar name="Jane Doe" size="xs" />} label="Jane" />
            </SidebarFooter>
          </Sidebar>

          <div className="flex flex-1 flex-col overflow-hidden">
            <header className="flex h-10 shrink-0 items-center justify-between border-b border-[var(--velora-border-muted)] px-4">
              <Button variant="outline" size="sm" leadingIcon={<Search className="h-3 w-3" />} className="!h-7 !text-xs">
                Search...
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm">
                  <Sun className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <Bell className="h-3.5 w-3.5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="!h-7 !gap-1.5 !text-xs">
                      <Avatar name="Jane Doe" size="xs" />
                      Jane
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuLabel className="text-xs">Jane Doe</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem icon={<Settings className="h-3.5 w-3.5" />} className="text-xs">Settings</DropdownMenuItem>
                    <DropdownMenuItem icon={<LogOut className="h-3.5 w-3.5" />} destructive className="text-xs">Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto p-3">
              <div className="mb-3 grid grid-cols-2 gap-2 xl:grid-cols-4">
                {statCards.map((s) => (
                  <Card key={s.title} variant="default" padding="sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--velora-text-tertiary)]">{s.title}</p>
                        <p className="mt-0.5 text-base font-bold text-[var(--velora-text-primary)]">{s.value}</p>
                        <span className={`text-[10px] font-medium ${s.positive ? "text-[var(--velora-state-success)]" : "text-[var(--velora-state-danger)]"}`}>
                          {s.positive ? <TrendingUp className="inline h-2.5 w-2.5" /> : null} {s.change}
                        </span>
                      </div>
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--velora-brand-subtle)]">
                        <s.icon className="h-3.5 w-3.5 text-[var(--velora-brand-default)]" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={s.progress} size="xs" variant="gradient" />
                    </div>
                  </Card>
                ))}
              </div>

              <Card variant="default">
                <CardHeader className="!p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm">Recent orders</CardTitle>
                      <CardDescription className="text-[10px]">Showing 4 of 1,429</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="!p-0">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-[var(--velora-border-muted)]">
                        <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase text-[var(--velora-text-tertiary)]">Order</th>
                        <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase text-[var(--velora-text-tertiary)]">Customer</th>
                        <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase text-[var(--velora-text-tertiary)]">Status</th>
                        <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase text-[var(--velora-text-tertiary)]">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-b border-[var(--velora-border-muted)] last:border-0">
                          <td className="px-3 py-2 font-mono text-[var(--velora-text-brand)]">{o.id}</td>
                          <td className="px-3 py-2 text-[var(--velora-text-primary)]">{o.customer}</td>
                          <td className="px-3 py-2"><Badge variant={statusVariant[o.status]} size="sm">{o.status}</Badge></td>
                          <td className="px-3 py-2 text-right font-semibold tabular-nums">${o.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
