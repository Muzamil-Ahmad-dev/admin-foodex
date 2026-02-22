 import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../features/orders/ordersSlice";
import OrdersTable from "../../features/orders/OrdersTable";
import OrdersSummary from "../../features/orders/OrdersSummary";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading, error, total } = useSelector(
    (state) => state.orders
  );

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  useEffect(() => {
    dispatch(fetchOrders({ page, limit, search }));
  }, [dispatch, page, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">Orders Dashboard</h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by phone or order key..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4 p-2 border rounded w-full sm:w-80"
      />

      <OrdersSummary orders={orders} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <OrdersTable data={orders} />

      {/* 📄 PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-medium">
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}