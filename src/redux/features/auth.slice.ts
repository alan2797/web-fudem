
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { LoginRequestDto, LoginResponseDto, SelectAreaDto } from "../../interfaces/login.interface";
import { localStorageService } from "../../services/localstorage";
import { getAreasService, getPositionsService, selectBranchService, selectDepartmentService, selectPositionService, selectProfileService } from "../../services/sessions";
import type { SelectPositionDto } from "../../interfaces/position.interface";
import type { SelectProfileDto } from "../../interfaces/profile.interface";
import type { SelectBranchDto } from "../../interfaces/branch.interface";


export interface AuthState {
  user: LoginResponseDto | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    requiresAreaSelection: false,
    requiresBranchSelection: false,
    requiresPositionSelection: false,
    requiresProfileSelection: false,
    success: false,
    requiresPasswordChange: false,
    token: localStorageService.getToken() ?? ''
  },
  token: localStorageService.getToken() ?? '',
  error: null,
};

// 🔹 AsyncThunk para login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequestDto, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response?.data?.message || "Error en login");
    }
  }
);

export const selectProfile = createAsyncThunk(
  "auth/selectProfile",
  async (selectProfileDto: SelectProfileDto, { rejectWithValue }) => {
    try {
      const response = await selectProfileService(selectProfileDto);
      return response.data; // puede retornar user actualizado
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error al seleccionar perfil");
    }
  }
);

export const selectBranch = createAsyncThunk(
  "auth/selectBranch",
  async (selectBranchDto: SelectBranchDto, { rejectWithValue }) => {
    try {
      const response = await selectBranchService(selectBranchDto);
      return response.data; // puede retornar user actualizado
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error al seleccionar sucursal");
    }
  }
);

export const getAreas = createAsyncThunk(
  "auth/getAreas",
  async (branchId: number, { rejectWithValue }) => {
    try {
      const response = await getAreasService(branchId);
      return response.data; // puede retornar user actualizado
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error al seleccionar areas");
    }
  }
);

export const getPositions = createAsyncThunk(
  "auth/getPositions",
  async (areaId: number, { rejectWithValue }) => {
    try {
      const response = await getPositionsService(areaId);
      return response.data; // puede retornar user actualizado
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error al seleccionar areas");
    }
  }
);

export const selectArea = createAsyncThunk(
  "auth/selectArea",
  async (selectAreaDto: SelectAreaDto, { rejectWithValue }) => {
    try {
      const response = await selectDepartmentService(selectAreaDto);
      return response.data; // puede retornar user actualizado
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error al seleccionar area");
    }
  }
);

export const selectPosition = createAsyncThunk(
  "auth/selectPosition",
  async (selectPositionDto: SelectPositionDto, { rejectWithValue }) => {
    try {
      const response = await selectPositionService(selectPositionDto);
      return response.data; // puede retornar user actualizado
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error al seleccionar area");
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
        state.user = action.payload.data;
        state.token = action.payload.data.token;
        localStorageService.setToken(action.payload.data.token);
      })
      .addCase(selectProfile.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
        localStorageService.setToken(action.payload.data.token);
      })
      .addCase(selectBranch.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
        localStorageService.setToken(action.payload.data.token);
      })
      .addCase(selectArea.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
        localStorageService.setToken(action.payload.data.token);
      })
      .addCase(selectPosition.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
        localStorageService.setToken(action.payload.data.token);
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
