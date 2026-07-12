import type { Metadata } from "next";
import { DocsPageHeader, DocsPageNav, DocSection, DocCodeBlock } from "@/components/DocsPage";
import { ComponentPreview, PropsTable } from "@/components/ComponentPreview";
import { Separator } from "@velora/core";

export const metadata: Metadata = {
  title: "DataTable — Velora UI",
  description:
    "Feature-rich data table with sorting, pagination, row selection, empty states, and column-level configuration.",
};

const usageCode = `import { DataTable } from "@velora/core";

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
];

const data = [
  { name: "Alice Johnson", email: "alice@example.com", status: "Active" },
  { name: "Bob Smith", email: "bob@example.com", status: "Inactive" },
  { name: "Carol White", email: "carol@example.com", status: "Active" },
];

export default function UsersPage() {
  return (
    <DataTable
      columns={columns}
      data={data}
      sortable
      pagination={{ pageSize: 10 }}
      emptyMessage="No users found."
    />
  );
}`;

const columnDefCode = `import { DataTable } from "@velora/core";
import type { ColumnDef } from "@velora/core";

interface User {
  name: string;
  email: string;
  role: "admin" | "member";
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.role === "admin" ? "default" : "secondary"}>
        {row.original.role}
      </Badge>
    ),
  },
];

<DataTable columns={columns} data={users} sortable />`;

export default function DataTablePage() {
  return (
    <>
      <DocsPageHeader
        title="DataTable"
        description="Feature-rich data table with sorting, pagination, row selection, empty states, and column-level configuration built on top of TanStack Table."
        badges={["TanStack Table", "Composition"]}
      />

      <DocSection title="Installation">
        <DocCodeBlock code={`import { DataTable } from "@velora/core";`} />
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock
          title="Basic table with columns, data, sorting, and pagination"
          code={usageCode}
        />
      </DocSection>

      <DocSection title="Column Definitions">
        <DocCodeBlock
          title="Custom cell renderers with typed column definitions"
          code={columnDefCode}
        />
      </DocSection>

      <DocSection title="API Reference">
        <PropsTable
          props={[
            {
              name: "columns",
              type: "ColumnDef<T>[]",
              required: true,
              description: "Array of column definitions controlling headers, accessors, and cell rendering.",
            },
            {
              name: "data",
              type: "T[]",
              required: true,
              description: "Row data array. Each item represents one row in the table.",
            },
            {
              name: "sortable",
              type: "boolean",
              default: "false",
              description: "Enables column-level sorting via clickable headers.",
            },
            {
              name: "pagination",
              type: "{ pageSize: number; pageSizeOptions?: number[] }",
              description: "Enables client-side pagination with configurable page size.",
            },
            {
              name: "selectable",
              type: "boolean",
              default: "false",
              description: "Enables row selection with checkboxes.",
            },
            {
              name: "emptyMessage",
              type: "string",
              default: '"No results."',
              description: "Message displayed when the data array is empty.",
            },
            {
              name: "loading",
              type: "boolean",
              default: "false",
              description: "Displays skeleton rows while data is being fetched.",
            },
            {
              name: "onRowClick",
              type: "(row: T) => void",
              description: "Callback fired when a row is clicked.",
            },
          ]}
        />
      </DocSection>

      <DocsPageNav
        prev={{ title: "Command", href: "/docs/components/command" }}
        next={{ title: "Dialog", href: "/docs/components/dialog" }}
      />
    </>
  );
}
