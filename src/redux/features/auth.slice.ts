
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { ForgotUsernameRequestDto, LoginRequestDto, LoginResponseDto, SelectAreaDto } from "../../interfaces/login.interface";
import { localStorageService } from "../../services/localstorage";
import { selectBranchService, selectDepartmentService, selectPositionService, selectProfileService } from "../../services/sessions";
import type { PositionDto, SelectPositionDto } from "../../interfaces/position.interface";
import type { SelectProfileDto } from "../../interfaces/profile.interface";
import type { SelectBranchDto } from "../../interfaces/branch.interface";
import { authService, recoveryUsernameService } from "../../services/auth";
import type { AreaDto } from "../../interfaces/area.interface";
import { getAreasService, getPositionsService } from "../../services/catalogs";


export interface AuthState {
  user: LoginResponseDto | null;
  token: string | null;
  error: string | null;
  areas: AreaDto[] | null;
  positions: PositionDto[] | null;
}

const initialState: AuthState = {
  user: {
    token: localStorageService.getToken() ?? ''
  },
  areas:[],
  positions:[],
  token: localStorageService.getToken() ?? '',
  error: null,
};

// 🔹 AsyncThunk para login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequestDto, { rejectWithValue }) => {
    try {
      const response = await authService(credentials);
      return response.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const selectProfile = createAsyncThunk(
  "auth/selectProfile",
  async (selectProfileDto: SelectProfileDto, { rejectWithValue }) => {
    try {
      const response = await selectProfileService(selectProfileDto);
      return response.data; 
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
      return response.data; 
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
      return response.data; 
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
      return response.data; 
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
      return response.data; 
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
      return response.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error al seleccionar area");
    }
  }
);

export const recoveryUsername = createAsyncThunk(
  "auth/recoveryUsername",
  async (data: ForgotUsernameRequestDto, { rejectWithValue }) => {
    try {
      const response = await recoveryUsernameService(data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err);
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
    setTempPassword(state, action: PayloadAction<string>) {
      if(state.user){
        state.user.tempPassword = action.payload;
      }
    },
    clearTempPassword(state) {
      if(state.user){
        state.user.tempPassword = undefined;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
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
        console.log(action.payload);
        state.token = action.payload.data.token;
        localStorageService.setToken(action.payload.data.token);
      })
      .addCase(getAreas.fulfilled, (state, action) => {
        state.areas = action.payload.data;
      })
      .addCase(getPositions.fulfilled, (state, action) => {
        state.positions = action.payload.data;
      })
  },
});

export const { logout, setTempPassword, clearTempPassword } = authSlice.actions;
export default authSlice.reducer;
