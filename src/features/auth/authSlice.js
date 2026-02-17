 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminRegisterApi, adminLoginApi, adminLogoutApi, adminProfileApi } from "./auth.api.js";

// ------------------
// Async Thunks
// ------------------

// Admin Register
export const adminRegister = createAsyncThunk(
  "admin/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await adminRegisterApi(data);
      const accessToken = res.headers["x-access-token"];
      const refreshToken = res.headers["x-refresh-token"];

      if (accessToken) sessionStorage.setItem("accessToken", accessToken);
      if (refreshToken) sessionStorage.setItem("refreshToken", refreshToken);

      return { user: res.data.user, accessToken, refreshToken };
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
      const res = await adminLoginApi(credentials);
      const accessToken = res.headers["x-access-token"];
      const refreshToken = res.headers["x-refresh-token"];

      if (accessToken) sessionStorage.setItem("accessToken", accessToken);
      if (refreshToken) sessionStorage.setItem("refreshToken", refreshToken);

      return { user: res.data.user, accessToken, refreshToken };
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
      await adminLogoutApi();
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

// Fetch Admin Profile
export const fetchAdminProfile = createAsyncThunk(
  "admin/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminProfileApi();
      return res.data.admin || res.data.user;
    } catch (err) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
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
    accessToken: sessionStorage.getItem("accessToken") || null,
    refreshToken: sessionStorage.getItem("refreshToken") || null,
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
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
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
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(adminLogout.fulfilled, (state) => {
        state.admin = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      // Fetch Profile
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.admin = action.payload;
      });
  },
});

export default adminSlice.reducer;
