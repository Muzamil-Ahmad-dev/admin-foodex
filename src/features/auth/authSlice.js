 // src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, refreshAccessToken, setAccessToken } from "./auth.api";

// Login thunk
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await loginUser(credentials);
    setAccessToken(res.data.accessToken); // store access token in memory
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

// Register thunk
export const register = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await registerUser(data);
    setAccessToken(res.data.accessToken);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

// Logout thunk
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
  setAccessToken(null);
});

// Silent refresh thunk
export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const data = await refreshAccessToken();
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Refresh failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      })

      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      });
  },
});

export default authSlice.reducer;
