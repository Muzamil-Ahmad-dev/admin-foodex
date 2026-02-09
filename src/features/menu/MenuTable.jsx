/**
 * @file MenuTable.jsx
 * @description Table configuration for menu items (Mock).
 */

import Table from "../../shared/components/Table";
import StatusBadge from "../../shared/components/StatusBadge";

export default function MenuTable({ data }) {
  const columns = [
    { key: "name", label: "Item Name" },
    { key: "category", label: "Category" },
    {
      key: "price",
      label: "Price",
      render: (row) => `₹${row.price}`,
    },
    {
      key: "availability",
      label: "Availability",
      render: (row) => (
        <StatusBadge
          status={row.availability === "available" ? "open" : "resolved"}
        />
      ),
    },
    {
      key: "createdAt",
      label: "Added On",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return <Table columns={columns} data={data} />;
}
