 import React from "react";
import { useDispatch } from "react-redux";
import { updateOrder, deleteOrder } from "../../features/orders/ordersSlice";
import * as XLSX from "xlsx";

export default function OrdersTable({ data = [] }) {
  const dispatch = useDispatch();

  /* ================= STATUS UPDATE ================= */
  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrder({ id, status: newStatus }));
  };

  const handlePaymentChange = (id, newPaymentStatus) => {
    dispatch(updateOrder({ id, paymentStatus: newPaymentStatus }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id));
    }
  };

  /* ================= EXCEL DOWNLOAD ================= */
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((order) => ({
        OrderID: `#${order._id.slice(-6).toUpperCase()}`,
        Items: order.items
          .map((i) => `${i.menuItem?.name || "N/A"} x ${i.quantity}`)
          .join(", "),
        Total: order.totalAmount,
        PaymentMethod: order.paymentMethod,
        PaymentStatus: order.paymentStatus || "Pending",
        OrderStatus: order.status || "Pending",
        StripeIntent: order.stripePaymentIntentId || "-",
        Address: order.deliveryAddress,
        Contact: order.contactNumber,
        Date: new Date(order.createdAt).toLocaleString(),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  return (
    <div>
      {/* Download Button */}
      <button
        onClick={handleDownloadExcel}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Download Excel
      </button>

      <table className="w-full table-auto border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Order ID</th>
            <th className="border px-3 py-2">Items</th>
            <th className="border px-3 py-2">Total</th>
            <th className="border px-3 py-2">Payment Method</th>
            <th className="border px-3 py-2">Payment Status</th>
            <th className="border px-3 py-2">Order Status</th>
            <th className="border px-3 py-2">Stripe ID</th>
            <th className="border px-3 py-2">Address</th>
            <th className="border px-3 py-2">Contact</th>
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="11" className="text-center py-6 text-gray-500">
                No orders found
              </td>
            </tr>
          )}

          {data.map((row) => (
            <tr key={row._id} className="border hover:bg-gray-50">
              <td className="border px-3 py-2 font-semibold">
                #{row._id.slice(-6).toUpperCase()}
              </td>

              <td className="border px-3 py-2">
                {row.items
                  .map(
                    (i) => `${i.menuItem?.name || "N/A"} x ${i.quantity}`
                  )
                  .join(", ")}
              </td>

              <td className="border px-3 py-2 font-medium">
                ₹{row.totalAmount}
              </td>

              {/* Payment Method */}
              <td className="border px-3 py-2">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    row.paymentMethod === "CARD"
                      ? "bg-green-600"
                      : "bg-orange-500"
                  }`}
                >
                  {row.paymentMethod}
                </span>
              </td>

              {/* Payment Status */}
              <td className="border px-3 py-2">
                <select
                  value={row.paymentStatus || "Pending"}
                  onChange={(e) =>
                    handlePaymentChange(row._id, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </td>

              {/* Order Status */}
              <td className="border px-3 py-2">
                <select
                  value={row.status || "Pending"}
                  onChange={(e) =>
                    handleStatusChange(row._id, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>

              {/* Stripe ID */}
              <td className="border px-3 py-2 text-xs">
                {row.stripePaymentIntentId || "-"}
              </td>

              <td className="border px-3 py-2 max-w-[200px] truncate">
                {row.deliveryAddress}
              </td>

              <td className="border px-3 py-2">{row.contactNumber}</td>

              <td className="border px-3 py-2 text-xs">
                {new Date(row.createdAt).toLocaleString()}
              </td>

              <td className="border px-3 py-2">
                <button
                  onClick={() => handleDelete(row._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}