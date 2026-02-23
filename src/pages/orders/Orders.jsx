 
 import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../features/orders/ordersSlice";
import OrdersTable from "../../features/orders/OrdersTable";
import OrdersSummary from "../../features/orders/OrdersSummary";

/**
 * OrdersPage Component
 *
 * Renders the Orders Dashboard including:
 * - Gradient header
 * - Search input for filtering orders by key
 * - Orders summary card
 * - Orders table
 * - Pagination controls
 *
 * Integrates with Redux to fetch orders data.
 *
 * @component
 * @example
 * return <OrdersPage />
 */
export default function OrdersPage() {
  const dispatch = useDispatch();

  /**
   * Redux state selectors
   * @typedef {Object} OrdersState
   * @property {Array<Object>} orders - List of fetched orders
   * @property {boolean} loading - Loading state for API request
   * @property {string|null} error - Error message if request fails
   * @property {number} total - Total number of orders
   */
  const { orders, loading, error, total } = useSelector(
    (state) => state.orders
  );

  /**
   * Local state for pagination and search
   * @type {[number, Function]}
   */
  const [page, setPage] = useState(1);

  /**
   * Local state for search input value
   * @type {[string, Function]}
   */
  const [search, setSearch] = useState("");

  /**
   * Number of orders per page
   * @type {number}
   */
  const limit = 10;

  /**
   * Fetch orders whenever page, limit, or search changes
   */
  useEffect(() => {
    dispatch(fetchOrders({ page, limit, search }));
  }, [dispatch, page, search]);

  /**
   * Compute total number of pages for pagination
   * @type {number}
   */
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4 sm:p-6">
      {/* GRADIENT TITLE */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
        Orders Dashboard
      </h1>

      {/* SEARCH (by order key only) */}
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

      {/* SUMMARY CARD */}
      <div className="bg-[#3B2A1E]/80 rounded-xl shadow-md p-4 mb-6">
        <OrdersSummary orders={orders} />
      </div>

      {/* STATES */}
      {loading && <p className="text-amber-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* TABLE CARD */}
      <div className="bg-[#3B2A1E]/80 rounded-xl shadow-md p-4">
        <OrdersTable data={orders} />
      </div>

      {/* PAGINATION */}
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