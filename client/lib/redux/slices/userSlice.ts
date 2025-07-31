import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import api from "@/utils/api";
import { ApiError } from "@/utils/types";
import { getAuthToken, isLoggedIn, setAuthToken } from "@/utils/AuthUtil";

// Define a type for the user
interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Async Thunk for Login
export const login = createAsyncThunk<
  { token: string },
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await api.post("/users/login", { email, password });
    console.log("Login response:", response.data);
    return response.data; // Return the token on success
  } catch (error) {
    const err = error as ApiError;
    const message =
      err.response?.data?.message ||
      err.message ||
      "An unexpected error occurred during login";
    return rejectWithValue(message); // Return the error message on failure
  }
});

// Async Thunk for Register
export const register = createAsyncThunk<
  { user: User },
  { name: string; email: string; password: string },
  { rejectValue: string }
>("user/register", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const response = await api.post("/users/register", {
      name,
      email,
      password,
    });
    return response.data; // Return the user data on success
  } catch (error) {
    const err = error as ApiError;
    const message =
      err.response?.data?.message || err.message || "Registration failed";
    return rejectWithValue(message); // Return the error message on failure
  }
});

//get user
export const getCurrentUser = createAsyncThunk<
  { user: User },
  void,
  { rejectValue: string }
>("users/me", async (_, { rejectWithValue }) => {
  try {
    if (!isLoggedIn()) {
      return rejectWithValue("No authentication token found");
    }
    console.log("token", getAuthToken());
    setAuthToken(getAuthToken());
    const response = await api.get("/users/me");
    console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    // Clear invalid token
    localStorage.removeItem("user-token");
    setAuthToken(null);

    const err = error as ApiError;
    const message =
      err.response?.data?.message || err.message || "Failed to fetch user";
    return rejectWithValue(message);
  }
});

// Define the initial state with correct types
const initialState = {
  userinfo: null as User | null,
  isAuthenticated: false,
  loading: false,
  error: null as string | null,
  token: null as string | null,
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      // state.userinfo = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log("Login pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("user-token", action.payload.token);
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Login rejected:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(register.pending, (state) => {
        console.log("Register pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("Register fulfilled:", action.payload);
        state.userinfo = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        console.log("Register rejected:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get Current User Pending
      .addCase(getCurrentUser.pending, (state) => {
        console.log("Fetching user...");
        state.loading = true; // Set loading to true when the request is pending
        state.error = null; // Reset any previous errors
      })
      // Get Current User Fulfilled
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log("action.payload.user..", action.payload.user);
        state.userinfo = action.payload.user; // Store the fetched user info
        state.isAuthenticated = true;
        state.loading = false; // Stop loading when user info is fetched
      })
      // Get Current User Rejected
      .addCase(getCurrentUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.userinfo = null; // Clear user info if fetch fails
        state.loading = false; // Stop loading on failure
      });
  },
});

// Export the actions from the slice
export const { logout } = userSlice.actions;

// Export the reducer as the default export
export default userSlice.reducer;
