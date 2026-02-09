/**
 * @file ContactTable.jsx
 * @description Table for admin contact/support queries.
 */

import Table from "../../shared/components/Table";
import StatusBadge from "../../shared/components/StatusBadge";

export default function ContactTable({ data, onView }) {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "message", label: "Message" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const actions = [
    ({ row }) => (
      <button
        onClick={() => onView(row)}
        className="text-sm px-3 py-1 rounded bg-orange-500 text-white hover:bg-orange-600"
      >
        View
      </button>
    ),
  ];

  return <Table columns={columns} data={data} actions={actions} />;
}
