import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { LoginRequestDto } from "../../interfaces/login.interface";

export interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// 🔹 AsyncThunk para login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequestDto, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      console.log(response);
      return response.data; // { user, token }
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response?.data?.message || "Error en login");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
