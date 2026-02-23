 /**
 * @file Dashboard.jsx
 * @description
 * Admin Dashboard component for the Foodify application.
 * 
 * Features:
 * - Displays key stats cards for the admin
 * - Shows recent orders in a table
 * - Shows recent support/contact queries in a table
 * 
 * Dependencies:
 * - Redux for admin state (useSelector)
 * - Table and StatusBadge shared components
 * - getAdminDashboard API for fetching dashboard data
 * 
 * @module Components/Dashboard
 */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../shared/components/Table.jsx";
import StatusBadge from "../../shared/components/StatusBadge.jsx";
import { getAdminDashboard } from "./auth.api.js";

/**
 * Dashboard Component
 * @component
 * @returns {JSX.Element} Admin dashboard UI
 */
export default function Dashboard() {
  /** @type {Object|null} admin - Currently logged-in admin info from Redux */
  const admin = useSelector((state) => state.auth.admin);

  /** @type {string|null} token - Admin auth token from Redux */
  const token = useSelector((state) => state.auth.token);

  /** @type {[Array<Object>, Function]} stats - Key dashboard statistics */
  const [stats, setStats] = useState([]);

  /** @type {[Array<Object>, Function]} recentOrders - List of recent orders */
  const [recentOrders, setRecentOrders] = useState([]);

  /** @type {[Array<Object>, Function]} recentContacts - List of recent support queries */
  const [recentContacts, setRecentContacts] = useState([]);

  /** Fetch dashboard data when token is available */
  useEffect(() => {
    const fetchDashboard = async () => {
      if (!token) return;
      try {
        const data = await getAdminDashboard(token);
        setStats(data.stats || []);
        setRecentOrders(data.recentOrders || []);
        setRecentContacts(data.recentContacts || []);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
      }
    };
    fetchDashboard();
  }, [token]);

  /** Table column definitions for recent orders */
  const orderColumns = [
    { key: "orderId", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "total", label: "Total" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  /** Table column definitions for recent contacts/support queries */
  const contactColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Welcome, {admin?.name || "Admin"}!</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow flex flex-col">
            <span className="text-gray-500 text-sm">{stat.label}</span>
            <span className="text-3xl font-bold mt-2">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <Table columns={orderColumns} data={recentOrders} />
      </div>

      {/* Recent Support Queries */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Support Queries</h2>
        <Table columns={contactColumns} data={recentContacts} />
      </div>
    </div>
  );
}