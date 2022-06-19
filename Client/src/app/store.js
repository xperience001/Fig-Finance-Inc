import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import eventReducer from "../features/event/eventSlice";
import categoryReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    category: categoryReducer,
  },
});
