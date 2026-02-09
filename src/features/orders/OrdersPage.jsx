/**
 * @file OrdersPage.jsx
 * @description Admin Orders page (Mock data).
 * Displays customer orders for admin management.
 *
 * @author
 * Muzamil Ahmad
 */

import { useState } from "react";
import OrdersTable from "./OrdersTable";

export default function OrdersPage() {
  const [orders] = useState([
    {
      _id: "o1",
      orderId: "#ORD1001",
      customer: "Ali Khan",
      items: 3,
      total: 540,
      payment: "paid",
      status: "open",
      createdAt: "2026-01-28",
    },
    {
      _id: "o2",
      orderId: "#ORD1002",
      customer: "Sara Ahmed",
      items: 5,
      total: 820,
      payment: "paid",
      status: "resolved",
      createdAt: "2026-01-27",
    },
    {
      _id: "o3",
      orderId: "#ORD1003",
      customer: "Rahul Verma",
      items: 2,
      total: 260,
      payment: "pending",
      status: "open",
      createdAt: "2026-01-26",
    },
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <OrdersTable data={orders} />
    </div>
  );
}
