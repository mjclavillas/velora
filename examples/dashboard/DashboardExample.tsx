/**
 * Velora UI — Example: Dashboard Layout
 *
 * A production-ready dashboard shell demonstrating:
 * - Collapsible sidebar with navigation
 * - Header with command palette trigger
 * - Theme switching
 * - DataTable with sorting/selection
 * - Toast notifications
 * - Stats cards with animated numbers
 */

"use client";

import * as React from "react";
import {
  // Layout
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarCollapseButton,
  // Components
  Button,
  Avatar,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  DataTable,
  type TableColumn,
  Progress,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  SimpleTooltip,
  useToast,
  // Hooks
  useTheme,
} from "@velora/core";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Bell,
  Search,
  Plus,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

// ─── Sample data ──────────────────────────────────────────────────────────────

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
  paid: "success",
  pending: "warning",
  failed: "danger",
  refunded: "secondary",
};

const columns: TableColumn<Order>[] = [
  {
    key: "id",
    header: "Order",
    cell: (row) => (
      <span className="font-mono text-xs text-[var(--velora-text-brand)]">
        {row.id}
      </span>
    ),
    width: 100,
  },
  {
    key: "customer",
    header: "Customer",
    sortable: true,
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Avatar name={row.customer} size="xs" />
        <div>
          <div className="font-medium text-[var(--velora-text-primary)]">
            {row.customer}
          </div>
          <div className="text-xs text-[var(--velora-text-tertiary)]">
            {row.email}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => (
      <Badge variant={statusVariant[row.status]} size="sm">
        {row.status}
      </Badge>
    ),
    width: 100,
  },
  {
    key: "amount",
    header: "Amount",
    sortable: true,
    align: "right",
    cell: (row) => (
      <span className="font-semibold tabular-nums">
        ${row.amount.toFixed(2)}
      </span>
    ),
    width: 100,
  },
  {
    key: "date",
    header: "Date",
    sortable: true,
    cell: (row) => (
      <span className="text-[var(--velora-text-tertiary)]">{row.date}</span>
    ),
    width: 120,
  },
];

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  progress,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  progress?: number;
}) {
  return (
    <Card variant="default" padding="md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--velora-text-tertiary)]">
            {title}
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-[var(--velora-text-primary)]">
            {value}
          </p>
          <div
            className={`mt-1 flex items-center gap-1 text-xs font-medium ${
              positive
                ? "text-[var(--velora-state-success)]"
                : "text-[var(--velora-state-danger)]"
            }`}
          >
            {positive ? (
              <TrendingUp className="h-3 w-3" aria-hidden />
            ) : (
              <TrendingDown className="h-3 w-3" aria-hidden />
            )}
            {change}
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--velora-brand-subtle)]">
          <Icon className="h-5 w-5 text-[var(--velora-brand-default)]" aria-hidden />
        </div>
      </div>
      {progress !== undefined && (
        <div className="mt-3">
          <Progress value={progress} size="xs" variant="gradient" />
        </div>
      )}
    </Card>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function DashboardExample() {
  const { toast, success } = useToast();
  const { theme, setTheme } = useTheme();
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = React.useState<string>("date");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleRowSelect = (id: string, selected: boolean) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      selected ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedRows(selected ? new Set(orders.map((o) => o.id)) : new Set());
  };

  return (
    <SidebarProvider defaultCollapsed={false}>
      <div className="flex h-dvh bg-[var(--velora-bg-base)]">
        {/* Sidebar */}
        <Sidebar variant="default">
          <SidebarHeader>
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg,#8060ff,#1ac8ed)" }}
                aria-hidden
              >
                V
              </div>
              <span className="text-sm font-semibold text-[var(--velora-text-primary)]">
                Velora
              </span>
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
            <SidebarItem
              icon={<Avatar name="Jane Doe" size="xs" />}
              label="Jane Doe"
            />
          </SidebarFooter>
        </Sidebar>

        {/* Main */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--velora-border-muted)] bg-[var(--velora-bg-base)]/80 px-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                leadingIcon={<Search className="h-3.5 w-3.5" />}
                className="w-44 justify-start text-[var(--velora-text-tertiary)]"
              >
                Search…
                <kbd className="ml-auto text-[10px] font-mono opacity-60">⌘K</kbd>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <SimpleTooltip content={theme === "dark" ? "Light mode" : "Dark mode"}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </SimpleTooltip>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar name="Jane Doe" size="xs" />
                    <span className="text-sm">Jane</span>
                    <ChevronDown className="h-3.5 w-3.5 text-[var(--velora-text-tertiary)]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Jane Doe</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem icon={<Settings className="h-4 w-4" />}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    icon={<LogOut className="h-4 w-4" />}
                    destructive
                    onClick={() => toast({ title: "Signed out", variant: "default" })}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-[var(--velora-text-primary)]">
                  Dashboard
                </h1>
                <p className="text-sm text-[var(--velora-text-tertiary)]">
                  Welcome back, Jane. Here{"'"}s what{"'"}s happening.
                </p>
              </div>
              <Button
                variant="gradient"
                size="sm"
                leadingIcon={<Plus className="h-4 w-4" />}
                onClick={() =>
                  success("Order created!", { description: "New order ORD-007 has been created." })
                }
              >
                New order
              </Button>
            </div>

            {/* Stats */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard title="Revenue" value="$48,291" change="+12.5% vs last month" positive icon={DollarSign} progress={72} />
              <StatCard title="Orders" value="1,429" change="+8.3% this week" positive icon={ShoppingCart} progress={58} />
              <StatCard title="Customers" value="3,241" change="+3.1% this month" positive icon={Users} progress={45} />
              <StatCard title="Conv. rate" value="4.6%" change="-0.4% vs target" positive={false} icon={BarChart3} progress={46} />
            </div>

            {/* Orders table */}
            <Card variant="default">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent orders</CardTitle>
                    <CardDescription>
                      {selectedRows.size > 0
                        ? `${selectedRows.size} selected`
                        : "Showing 6 of 1,429 orders"}
                    </CardDescription>
                  </div>
                  {selectedRows.size > 0 && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Export</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <DataTable
                  data={orders}
                  columns={columns}
                  selectable
                  selectedRows={selectedRows}
                  onRowSelect={handleRowSelect}
                  onSelectAll={handleSelectAll}
                  sortKey={sortKey}
                  sortDirection={sortDir}
                  onSort={handleSort}
                  hoverable
                  variant="minimal"
                />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
