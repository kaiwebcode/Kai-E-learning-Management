"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authReducer from "./features/auth/authSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  devTools: false, // Disable DevTools in production
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Define TypeScript types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Initialize application state with API endpoints
const initializeApp = async () => {
  try {
    await store.dispatch(
      apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
    );
    await store.dispatch(
      apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
    );
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
};

// Call the initialization function
initializeApp();
