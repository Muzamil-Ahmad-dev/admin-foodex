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
      const res = await axiosInstance.post("/auth/register", data); // include role:'admin'
      if (res.data.user.role !== "admin") {
        return rejectWithValue("Not an admin");
      }

      // Save token in sessionStorage
      if (res.data.token) sessionStorage.setItem("accessToken", res.data.token);

      return { user: res.data.user, token: res.data.token };
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

      // Save token in sessionStorage
      if (res.data.token) sessionStorage.setItem("accessToken", res.data.token);

      return { user: res.data.user, token: res.data.token };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Admin Logout
export const adminLogout = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout"); // clears cookies
      sessionStorage.removeItem("accessToken");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

// Fetch current admin profile (restore session)
export const fetchAdminProfile = createAsyncThunk(
  "admin/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/user/profile"); // protected route
      if (res.data.user.role !== "admin") {
        return rejectWithValue("Not an admin");
      }
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// ------------------
// Slice
// ------------------
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    accessToken: sessionStorage.getItem("accessToken") || null, // restore token if exists
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
        state.admin = action.payload.user;
        state.accessToken = action.payload.token;
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
        state.admin = action.payload.user;
        state.accessToken = action.payload.token;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(adminLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.loading = false;
        state.admin = null;
        state.accessToken = null;
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Admin Profile
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.admin = null;
        state.accessToken = null;
        sessionStorage.removeItem("accessToken");
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
