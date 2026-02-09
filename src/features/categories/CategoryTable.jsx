/**
 * @file CategoryTable.jsx
 * @description Table configuration for food categories (Mock).
 */

import Table from "../../shared/components/Table";
import StatusBadge from "../../shared/components/StatusBadge";

export default function CategoryTable({ data }) {
  const columns = [
    { key: "name", label: "Category Name" },
    { key: "description", label: "Description" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge status={row.status === "active" ? "open" : "resolved"} />
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return <Table columns={columns} data={data} />;
}
