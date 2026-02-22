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
      {/* 🔥 GRADIENT TITLE */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
        Orders Dashboard
      </h1>

      {/* 🔍 SEARCH (by order key only) */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by order key..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-80 p-3 rounded-lg bg-[#3B2A1E]/80 text-white placeholder-gray-300 border border-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* 📊 SUMMARY CARD */}
      <div className="bg-[#3B2A1E]/80 rounded-xl shadow-md p-4 mb-6">
        <OrdersSummary orders={orders} />
      </div>

      {/* ⚠️ STATES */}
      {loading && <p className="text-amber-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* 📋 TABLE CARD */}
      <div className="bg-[#3B2A1E]/80 rounded-xl shadow-md p-4">
        <OrdersTable data={orders} />
      </div>

      {/* 📄 PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded-lg bg-amber-600 text-black font-semibold disabled:opacity-40 hover:bg-amber-500 transition"
        >
          Prev
        </button>

        <span className="font-medium text-amber-300">
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg bg-amber-600 text-black font-semibold disabled:opacity-40 hover:bg-amber-500 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}