 "use client";

import React, { useState, useEffect } from "react";
import Table from "../../shared/components/Table";
import StatusBadge from "../../shared/components/StatusBadge";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  // Sample user data (could come from API)
  const data = [
    [1, "John Doe", "john@example.com", "Admin", <StatusBadge status="active" />],
    [2, "Jane Smith", "jane@example.com", "User", <StatusBadge status="pending" />],
    [3, "Alice Johnson", "alice@example.com", "User", <StatusBadge status="inactive" />],
    [4, "Bob Brown", "bob@example.com", "Moderator", <StatusBadge status="active" />],
  ];

  // Simulate fetching data
  useEffect(() => {
    // In real app, fetch from API
    setUsers(data);
  }, []);

  const columns = ["ID", "Name", "Email", "Role", "Status"];

  return (
    <div className="relative">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
        Users Management
      </h1>

      {/* Users Table */}
      <div className="overflow-x-auto">
        {users.length > 0 ? (
          <Table columns={columns} data={users} />
        ) : (
          <div className="text-gray-400 text-center py-10">
            No users available.
          </div>
        )}
      </div>
    </div>
  );
}
