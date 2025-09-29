import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { LoginRequestDto, LoginResponseDto } from "../../interfaces/login.interface";

export interface AuthState {
  user: LoginResponseDto | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    requiresAreaSelection: true,
    requiresBranchSelection: true,
    requiresPositionSelection: true,
    requiresProfileSelection: true,
    success: true,
    requiresPasswordChange: true,
    token: "asdasd"
  },
  token: null,
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
        console.log(action.payload);
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
