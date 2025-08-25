/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  _id: string;
  restuarant: string | null;
  name: string;
  email: string;
  role: string;
  image: string | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

// ---------------- LOGIN ----------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      });

      const { user, accessToken } = res.data.data;

      Cookies.set("accessToken", accessToken, { expires: 1 });
      Cookies.set("user", JSON.stringify(user));

      return { user, accessToken };
    } catch (error: any) {
      const  message = error?.response?.data?.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ---------------- REGISTER ----------------
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      phone,
      restaurantName,
      businessName,
      businessEmail,
      restaurantAddress,
      password,
      referralCode,
    }: {
      phone: string;
      restaurantName: string;
      businessName: string;
      businessEmail: string;
      restaurantAddress: string;
      password: string;
      referralCode?: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(
        `${baseURL}/auth/register-restuarant-owner`,
        {
          phone,
          restaurantName,
          businessName,
          businessEmail,
          restaurantAddress,
          password,
          referralCode,
        }
      );

      Cookies.set("userEmail", res?.data?.data?.userEmail);
      return res.data?.data;
    } catch (error: any) {
      const  message = error?.response?.data?.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ---------------- RESEND CODE ----------------
export const resendCode = createAsyncThunk(
  "auth/resendCode",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/auth/resend-otp?email=${email}`
      );
      return response.data.message;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to resend code";
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Logout
    logout: (state: AuthState) => {
      Cookies.remove("accessToken");
      Cookies.remove("user");
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
    },

    // ✅ Load current user from cookies (for persistence)
    loadUser: (state: AuthState) => {
      const token = Cookies.get("accessToken");
      const user = Cookies.get("user");

      if (token && user) {
        state.accessToken = token;
        state.user = JSON.parse(user);
      } else {
        state.accessToken = null;
        state.user = null;
      }
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ user: User; accessToken: string }>
        ) => {
          state.loading = false;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.accessToken = null;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Resend code
      .addCase(resendCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
