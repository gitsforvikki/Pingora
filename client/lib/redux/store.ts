// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/post/postReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});

// Export the types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
