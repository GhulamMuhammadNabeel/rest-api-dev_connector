import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer"; // ✅ Fix Import

const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ No need for combineReducers
  },
  devTools: process.env.NODE_ENV !== "production", // ✅ Auto Redux DevTools
});

export default store;
