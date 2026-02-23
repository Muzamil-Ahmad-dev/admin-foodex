 /**
 * @file ordersSlice.js
 * @description
 * Redux slice for **admin order management** in Foodify.
 * Handles fetching, updating, and deleting orders via async thunks.
 * 
 * Features:
 * - fetchOrders: Fetch all orders for admin
 * - updateOrder: Update order status and payment status
 * - deleteOrder: Delete an order
 * 
 * @module Redux/orders
 * @dependencies
 * - Redux Toolkit: createSlice, createAsyncThunk
 * - Axios for HTTP requests
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/** Base API URL */
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

/* ================= FETCH ORDERS ================= */

/**
 * Async thunk to fetch all orders for admin
 * @async
 * @function fetchOrders
 * @returns {Promise<Array<Object>>} List of orders
 */
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/orders?admin=true`);
      return res.data.orders;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

/* ================= UPDATE ORDER ================= */

/**
 * Async thunk to update an order
 * @async
 * @function updateOrder
 * @param {Object} payload
 * @param {string} payload.id - Order ID
 * @param {string} payload.status - New order status
 * @param {string} payload.paymentStatus - New payment status
 * @returns {Promise<Object>} Updated order object
 */
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, status, paymentStatus }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/orders/${id}`, {
        status,
        paymentStatus,
      });
      return res.data.order;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Order update failed"
      );
    }
  }
);

/* ================= DELETE ORDER ================= */

/**
 * Async thunk to delete an order
 * @async
 * @function deleteOrder
 * @param {string} id - Order ID
 * @returns {Promise<string>} Deleted order ID
 */
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/orders/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Delete failed"
      );
    }
  }
);

/* ================= SLICE ================= */

/** Orders slice initial state */
const initialState = {
  orders: [],
  loading: false,
  error: null,
  updating: false,
  deleting: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ================= FETCH ================= */
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= UPDATE ================= */
      .addCase(updateOrder.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.orders.findIndex(
          (o) => o._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      /* ================= DELETE ================= */
      .addCase(deleteOrder.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.deleting = false;
        state.orders = state.orders.filter(
          (o) => o._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;