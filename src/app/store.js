 import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer, // ✅ now defined
  },
});

export default store;
