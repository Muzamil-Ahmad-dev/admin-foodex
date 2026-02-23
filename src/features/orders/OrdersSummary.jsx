 /**
 * @file OrdersSummary.jsx
 * @description
 * A summary dashboard component that displays key order metrics.
 * 
 * Metrics displayed:
 * - Total number of orders
 * - Total revenue
 * - Revenue from card payments
 * - Number of Cash-on-Delivery (COD) orders
 * 
 * @module Components/OrdersSummary
 * @param {Object} props
 * @param {Array<Object>} [props.orders=[]] - List of order objects
 * Each order object may contain:
 *   @property {number} totalAmount - Total amount of the order
 *   @property {string} paymentMethod - Payment method (e.g., "CARD", "COD")
 *   @property {string} paymentStatus - Payment status (e.g., "Paid")
 * @returns {JSX.Element} Summary cards with order metrics
 * 
 * @example
 * <OrdersSummary orders={ordersArray} />
 */
import React from "react";

export default function OrdersSummary({ orders = [] }) {
  // Total number of orders
  const totalOrders = orders.length;

  // Total revenue
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.totalAmount || 0),
    0
  );

  // Revenue from card payments (only paid)
  const cardRevenue = orders
    .filter((o) => o.paymentMethod === "CARD" && o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Count of COD orders
  const codOrders = orders.filter((o) => o.paymentMethod === "COD").length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total Orders */}
      <div className="bg-[#3B2A1E]/80 rounded-xl p-4 shadow-md flex flex-col">
        <p className="text-sm text-gray-300">Total Orders</p>
        <p className="text-2xl sm:text-3xl font-bold text-amber-400 mt-2">
          {totalOrders}
        </p>
      </div>

      {/* Total Revenue */}
      <div className="bg-[#3B2A1E]/80 rounded-xl p-4 shadow-md flex flex-col">
        <p className="text-sm text-gray-300">Total Revenue</p>
        <p className="text-2xl sm:text-3xl font-bold text-green-400 mt-2">
          ₨{totalRevenue.toLocaleString("en-PK")}
        </p>
      </div>

      {/* Card Payments */}
      <div className="bg-[#3B2A1E]/80 rounded-xl p-4 shadow-md flex flex-col">
        <p className="text-sm text-gray-300">Card Payments</p>
        <p className="text-2xl sm:text-3xl font-bold text-blue-400 mt-2">
          ₨{cardRevenue.toLocaleString("en-PK")}
        </p>
      </div>

      {/* COD Orders */}
      <div className="bg-[#3B2A1E]/80 rounded-xl p-4 shadow-md flex flex-col">
        <p className="text-sm text-gray-300">COD Orders</p>
        <p className="text-2xl sm:text-3xl font-bold text-orange-400 mt-2">
          {codOrders}
        </p>
      </div>
    </div>
  );
}