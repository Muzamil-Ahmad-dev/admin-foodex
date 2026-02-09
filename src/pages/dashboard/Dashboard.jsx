 "use client";

import React from "react";

const DashboardPage = () => {
  // Sample dashboard data (replace with API data if needed)
  const stats = [
    { title: "Total Products", value: 24 },
    { title: "Total Users", value: 128 },
    { title: "Orders Today", value: 15 },
    { title: "Pending Requests", value: 3 },
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 bg-[#3B2A1E]/80 rounded-xl shadow-md flex flex-col items-start"
          >
            <h2 className="text-lg font-semibold">{stat.title}</h2>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
