 import React from "react";

export default function OrdersSummary({ orders = [] }) {
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.totalAmount || 0),
    0
  );

  const cardRevenue = orders
    .filter((o) => o.paymentMethod === "CARD" && o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const codOrders = orders.filter(
    (o) => o.paymentMethod === "COD"
  ).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {/* Total Orders */}
      <div className="bg-white shadow rounded p-4">
        <p className="text-gray-500 text-sm">Total Orders</p>
        <p className="text-2xl font-bold">{totalOrders}</p>
      </div>

      {/* Revenue */}
      <div className="bg-white shadow rounded p-4">
        <p className="text-gray-500 text-sm">Total Revenue</p>
        <p className="text-2xl font-bold text-green-600">
          ₹{totalRevenue}
        </p>
      </div>

      {/* Card Revenue */}
      <div className="bg-white shadow rounded p-4">
        <p className="text-gray-500 text-sm">Card Payments</p>
        <p className="text-2xl font-bold text-blue-600">
          ₹{cardRevenue}
        </p>
      </div>

      {/* COD Orders */}
      <div className="bg-white shadow rounded p-4">
        <p className="text-gray-500 text-sm">COD Orders</p>
        <p className="text-2xl font-bold text-orange-600">
          {codOrders}
        </p>
      </div>
    </div>
  );
}