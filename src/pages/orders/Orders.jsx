  import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../features/orders/ordersSlice";
import OrdersTable from "../../features/orders/OrdersTable";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500 font-medium">Error: {error}</p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">
          Orders
        </h1>

        {/* Scroll hint (mobile only) */}
        <div className="flex items-center text-gray-500 text-sm sm:hidden">
          <span className="mr-2">Scroll</span>
          <span className="animate-pulse text-lg">➡️</span>
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="bg-white rounded-lg shadow border overflow-x-auto">
        <div className="min-w-[900px]">
          <OrdersTable data={orders} />
        </div>
      </div>
    </div>
  );
}