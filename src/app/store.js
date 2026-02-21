 import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/auth/authSlice";
import ordersReducer from "../features/orders/ordersSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer, // ✅ now defined
     orders: ordersReducer,
  },
});

export default store;
