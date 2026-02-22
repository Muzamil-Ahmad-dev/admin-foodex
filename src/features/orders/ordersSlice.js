 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

/* ================= FETCH ORDERS ================= */
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

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    updating: false,
    deleting: false,
  },
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