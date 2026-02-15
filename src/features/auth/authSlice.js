 // src/features/auth/authSlice.admin.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./auth.api.js";

// ------------------
// Admin Thunks
// ------------------

// Admin Register
export const adminRegister = createAsyncThunk(
  "admin/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", data); // role: 'admin' sent in data
      if (res.data.user.role !== "admin") {
        return rejectWithValue("Not an admin");
      }
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// Admin Login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      if (res.data.user.role !== "admin") {
        return rejectWithValue("Not an admin");
      }
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Admin Logout
export const adminLogout = createAsyncThunk("admin/logout", async () => {
  await axiosInstance.post("/auth/logout"); // clears cookies
});

// ------------------
// Slice
// ------------------
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null, // stores admin user
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(adminRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(adminRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(adminLogout.fulfilled, (state) => {
        state.admin = null;
      });
  },
});

export default adminSlice.reducer;
