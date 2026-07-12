/**
 * Velora Table
 *
 * A production-grade data table with sorting, selection,
 * sticky headers, striped rows, and responsive overflow handling.
 */

import * as React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const tableVariants = cva("w-full caption-bottom text-sm", {
  variants: {
    variant: {
      default: "",
      bordered: "border border-[var(--velora-border-base)] rounded-[var(--velora-radius-xl)] overflow-hidden",
      minimal: "",
    },
    size: {
      sm: "[&_th]:py-2 [&_th]:px-3 [&_td]:py-2 [&_td]:px-3 text-xs",
      md: "[&_th]:py-3 [&_th]:px-4 [&_td]:py-3 [&_td]:px-4",
      lg: "[&_th]:py-4 [&_th]:px-5 [&_td]:py-4 [&_td]:px-5",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

// ─── Types ───────────────────────────────────────────────────────────────────

export type SortDirection = "asc" | "desc" | false;

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: React.ReactNode;
  cell: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
  className?: string;
  headerClassName?: string;
  sticky?: boolean;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

interface TableRootProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  striped?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
}

const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>(
  ({ className, variant, size, striped, hoverable, stickyHeader, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          tableVariants({ variant, size }),
          striped && "[&_tbody_tr:nth-child(even)]:bg-[var(--velora-bg-subtle)]",
          hoverable && "[&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-[var(--velora-bg-subtle)]",
          className
        )}
        {...props}
      />
    </div>
  )
);
TableRoot.displayName = "Table";

// ─── Header ──────────────────────────────────────────────────────────────────

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-b [&_tr]:border-[var(--velora-border-base)]", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

// ─── Body ─────────────────────────────────────────────────────────────────────

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "[&_tr:last-child]:border-0",
      "[&_tr]:border-b [&_tr]:border-[var(--velora-border-muted)]",
      className
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// ─── Footer ──────────────────────────────────────────────────────────────────

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-[var(--velora-border-base)]",
      "bg-[var(--velora-bg-subtle)] font-medium",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// ─── Row ─────────────────────────────────────────────────────────────────────

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => (
  <tr
    ref={ref}
    data-state={selected ? "selected" : undefined}
    className={cn(
      "transition-colors duration-100",
      selected && "bg-[var(--velora-brand-muted)]",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

// ─── Head ─────────────────────────────────────────────────────────────────────

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
  align?: "left" | "center" | "right";
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, onSort, align = "left", children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "text-xs font-semibold uppercase tracking-wider",
        "text-[var(--velora-text-tertiary)]",
        "whitespace-nowrap",
        align === "center" && "text-center",
        align === "right" && "text-right",
        sortable && "cursor-pointer select-none hover:text-[var(--velora-text-primary)] transition-colors",
        className
      )}
      onClick={sortable ? onSort : undefined}
      aria-sort={
        sortDirection === "asc"
          ? "ascending"
          : sortDirection === "desc"
          ? "descending"
          : sortable
          ? "none"
          : undefined
      }
      {...props}
    >
      <div
        className={cn(
          "flex items-center gap-1.5",
          align === "center" && "justify-center",
          align === "right" && "justify-end"
        )}
      >
        {children}
        {sortable && (
          <span className="shrink-0 text-[var(--velora-text-tertiary)]">
            {sortDirection === "asc" ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : sortDirection === "desc" ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
            )}
          </span>
        )}
      </div>
    </th>
  )
);
TableHead.displayName = "TableHead";

// ─── Cell ─────────────────────────────────────────────────────────────────────

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    align?: "left" | "center" | "right";
  }
>(({ className, align = "left", ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "text-sm text-[var(--velora-text-primary)]",
      "align-middle",
      align === "center" && "text-center",
      align === "right" && "text-right",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// ─── Caption ─────────────────────────────────────────────────────────────────

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-[var(--velora-text-tertiary)]", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

// ─── Empty State ─────────────────────────────────────────────────────────────

interface TableEmptyProps {
  columns: number;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

function TableEmpty({ columns, icon, title = "No results", description }: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={columns} className="py-12 text-center">
        <div className="flex flex-col items-center gap-2">
          {icon && (
            <span className="text-[var(--velora-text-tertiary)] [&>svg]:h-8 [&>svg]:w-8">
              {icon}
            </span>
          )}
          <p className="text-sm font-medium text-[var(--velora-text-secondary)]">{title}</p>
          {description && (
            <p className="text-xs text-[var(--velora-text-tertiary)]">{description}</p>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Compound Data Table ─────────────────────────────────────────────────────

export interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: TableColumn<T>[];
  keyField?: string;
  selectable?: boolean;
  selectedRows?: Set<string>;
  onRowSelect?: (key: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
  emptyState?: React.ReactNode;
  loading?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  variant?: "default" | "bordered" | "minimal";
  size?: "sm" | "md" | "lg";
  caption?: string;
  className?: string;
}

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  keyField = "id",
  selectable,
  selectedRows,
  onRowSelect,
  onSelectAll,
  sortKey,
  sortDirection,
  onSort,
  emptyState,
  loading,
  striped,
  hoverable = true,
  variant = "bordered",
  size = "md",
  caption,
  className,
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && selectedRows?.size === data.length;
  const someSelected = (selectedRows?.size ?? 0) > 0 && !allSelected;

  return (
    <TableRoot
      variant={variant}
      size={size}
      striped={striped}
      hoverable={hoverable}
      className={className}
    >
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {selectable && (
            <TableHead className="w-10">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={(e) => onSelectAll?.(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--velora-border-strong)] accent-[var(--velora-brand-default)]"
                aria-label="Select all rows"
              />
            </TableHead>
          )}
          {columns.map((col) => (
            <TableHead
              key={col.key}
              sortable={col.sortable}
              sortDirection={sortKey === col.key ? sortDirection : false}
              onSort={() => col.sortable && onSort?.(col.key)}
              align={col.align}
              className={col.headerClassName}
              style={{ width: col.width }}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              {selectable && <TableCell><div className="h-4 w-4 animate-pulse rounded bg-[var(--velora-bg-muted)]" /></TableCell>}
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <div
                    className="h-4 animate-pulse rounded bg-[var(--velora-bg-muted)]"
                    style={{ width: `${60 + Math.random() * 30}%` }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : data.length === 0 ? (
          emptyState ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)}>
                {emptyState}
              </td>
            </tr>
          ) : (
            <TableEmpty
              columns={columns.length + (selectable ? 1 : 0)}
              title="No data available"
            />
          )
        ) : (
          data.map((row, rowIndex) => {
            const key = String(row[keyField] ?? rowIndex);
            const isSelected = selectedRows?.has(key) ?? false;
            return (
              <TableRow key={key} selected={isSelected}>
                {selectable && (
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => onRowSelect?.(key, e.target.checked)}
                      className="h-4 w-4 rounded border-[var(--velora-border-strong)] accent-[var(--velora-brand-default)]"
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align={col.align}
                    className={col.className}
                  >
                    {col.cell(row, rowIndex)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </TableRoot>
  );
}

export {
  TableRoot as Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEmpty,
  DataTable,
};
