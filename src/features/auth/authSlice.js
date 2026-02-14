 // src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} from "./auth.api";

// =======================
// Thunks
// =======================

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await loginUser(credentials);
      return res.data.user; // store only user, token is in httpOnly cookie
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerUser(data);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser(); // backend clears cookies
});

// Refresh Access Token silently
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await refreshAccessToken(); // backend returns user info
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Refresh failed");
    }
  }
);

// Fetch current user (for page load / sidebar)
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCurrentUser(); // GET /auth/user/profile
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
  }
);

// =======================
// Slice
// =======================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,    // { id, name, email, role }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // -------- LOGIN --------
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- REGISTER --------
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- LOGOUT --------
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      // -------- REFRESH TOKEN --------
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // -------- FETCH CURRENT USER --------
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
