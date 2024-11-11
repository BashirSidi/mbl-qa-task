import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import itemReducer from "./slices/itemSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer,
  },
});

export default store;
