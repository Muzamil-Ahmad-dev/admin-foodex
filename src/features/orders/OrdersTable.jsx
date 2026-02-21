 import React from "react";
import StatusBadge from "../../shared/components/StatusBadge";
import { useDispatch } from "react-redux";
import { updateOrder, deleteOrder } from "../../features/orders/ordersSlice";
import * as XLSX from "xlsx";

export default function OrdersTable({ data }) {
  const dispatch = useDispatch();

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

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((order) => ({
        OrderID: `#${order._id.slice(-6).toUpperCase()}`,
        Items: order.items.map((i) => `${i.menuItem?.name || "N/A"} x ${i.quantity}`).join(", "),
        Total: order.totalAmount,
        PaymentStatus: order.paymentStatus || "Pending",
        OrderStatus: order.status || "Pending",
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
      <button
        onClick={handleDownloadExcel}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download Excel
      </button>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Items</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Payment</th>
            <th className="border px-4 py-2">Order Status</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id} className="border">
              <td className="border px-4 py-2">{`#${row._id.slice(-6).toUpperCase()}`}</td>
              <td className="border px-4 py-2">
                {row.items.map((i) => `${i.menuItem?.name || "N/A"} x ${i.quantity}`).join(", ")}
              </td>
              <td className="border px-4 py-2">₹{row.totalAmount}</td>
              <td className="border px-4 py-2">
                <select
                  value={row.paymentStatus || "Pending"}
                  onChange={(e) => handlePaymentChange(row._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <select
                  value={row.status || "Pending"}
                  onChange={(e) => handleStatusChange(row._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="border px-4 py-2">{row.deliveryAddress}</td>
              <td className="border px-4 py-2">{row.contactNumber}</td>
              <td className="border px-4 py-2">{new Date(row.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(row._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
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