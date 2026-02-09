/**
 * @file OrdersTable.jsx
 * @description Table configuration for customer orders (Mock).
 */

import Table from "../../shared/components/Table";
import StatusBadge from "../../shared/components/StatusBadge";

export default function OrdersTable({ data }) {
  const columns = [
    { key: "orderId", label: "Order ID" },
    { key: "customer", label: "Customer" },
    {
      key: "items",
      label: "Items",
      render: (row) => `${row.items} items`,
    },
    {
      key: "total",
      label: "Total",
      render: (row) => `₹${row.total}`,
    },
    {
      key: "payment",
      label: "Payment",
      render: (row) => (
        <StatusBadge
          status={row.payment === "paid" ? "resolved" : "open"}
        />
      ),
    },
    {
      key: "status",
      label: "Order Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return <Table columns={columns} data={data} />;
}
