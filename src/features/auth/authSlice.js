 /**
 * @file authSlice.js
 * @description
 * This Redux slice handles **admin authentication** for the Foodify application.
 * It manages the complete lifecycle of admin registration, login, logout, and profile fetching.
 * 
 * Features include:
 * - Async thunks for registration, login, logout, and fetching admin profile
 * - Automatic token storage and removal in sessionStorage
 * - Centralized loading and error state management
 * - Redux Toolkit `createSlice` with extraReducers for async thunk lifecycle handling
 * 
 * @module Redux/adminSlice
 * @author 
 * Muzamil Ahmad
 *
 * @dependencies
 * - @reduxjs/toolkit (createSlice, createAsyncThunk)
 * - auth.api.js for backend API calls: adminRegisterApi, adminLoginApi, adminLogoutApi, adminProfileApi
 */

/* Redux Toolkit Imports */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminRegisterApi, adminLoginApi, adminLogoutApi, adminProfileApi } from "./auth.api.js";

// ------------------
// Async Thunks
// ------------------

/**
 * Async thunk for admin registration
 * @param {Object} data - Registration payload (name, email, password, role)
 * @returns {Promise<Object>} Returns user data and tokens on success
 */
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

/**
 * Async thunk for admin login
 * @param {Object} credentials - Login payload (email, password)
 * @returns {Promise<Object>} Returns user data and tokens on success
 */
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

/**
 * Async thunk for admin logout
 * Clears sessionStorage and resets state
 */
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

/**
 * Async thunk to fetch the current admin profile
 * @returns {Promise<Object>} Returns admin profile on success
 */
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
// Slice Definition
// ------------------

/**
 * Admin slice state structure
 * @typedef {Object} AdminState
 * @property {Object|null} admin - Currently logged-in admin user
 * @property {string|null} accessToken - JWT access token
 * @property {string|null} refreshToken - JWT refresh token
 * @property {boolean} loading - Loading state for async actions
 * @property {string|null} error - Error message from async actions
 */

/** Initial state */
const initialState = {
  admin: null,
  accessToken: sessionStorage.getItem("accessToken") || null,
  refreshToken: sessionStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
};

/**
 * Redux slice for admin authentication
 */
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Admin Register
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

      // Admin Login
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

      // Admin Logout
      .addCase(adminLogout.fulfilled, (state) => {
        state.admin = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      // Fetch Admin Profile
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.admin = action.payload;
      });
  },
});

export default adminSlice.reducer;