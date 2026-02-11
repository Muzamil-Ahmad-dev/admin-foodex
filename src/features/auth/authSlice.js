 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin, adminLogin, logout as apiLogout } from "../auth/auth.api";

const initialState = {
  user: null,
  admin: null,
  loading: false,
  error: null,
};

// User login thunk
export const userLoginThunk = createAsyncThunk(
  "auth/userLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await userLogin(email, password);
      if (data.user.role !== "user") throw new Error("Access denied: Not a user");
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

// Admin login thunk
export const adminLoginThunk = createAsyncThunk(
  "auth/adminLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await adminLogin(email, password);
      if (data.user.role !== "admin") throw new Error("Access denied: Not an admin");
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message || "Admin login failed");
    }
  }
);

// Logout thunk
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await apiLogout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // User login
      .addCase(userLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Admin login
      .addCase(adminLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(adminLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.admin = null;
        state.error = null;
        state.loading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
