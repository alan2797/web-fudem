import type { AreaDto } from "../../interfaces/area.interface";
import type { BranchDto } from "../../interfaces/branch.interface";
import type { DepartmentDto } from "../../interfaces/department.interface";
import type { MunicipalitieDto } from "../../interfaces/municipalitie.interface";
import type { PositionDto } from "../../interfaces/position.interface";
import type { CountryDto } from "../../interfaces/country.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBranchesService, getCountriesService } from "../../services/catalogs";


interface CatalogsState {
    countries: CountryDto[];
    branches: BranchDto[];
    areas: AreaDto[];
    positions: PositionDto[];
    departments: DepartmentDto[];
    municipalities: MunicipalitieDto[];
}

const initialState: CatalogsState = {
    countries: [],
    branches: [],
    areas: [],
    positions: [],
    departments: [],
    municipalities: [],
};

export const getCountries = createAsyncThunk(
    "catalogs/getCountries",
    async (_, { rejectWithValue }) => {
      try {
        const response = await getCountriesService();
        return response.data; 
      } catch (err: any) {
        console.log(err);
        return rejectWithValue(err);
      }
    }
);

export const getBranches = createAsyncThunk(
    "catalogs/getBranches",
    async (_, { rejectWithValue }) => {
      try {
        const response = await getBranchesService();
        return response.data; 
      } catch (err: any) {
        console.log(err);
        return rejectWithValue(err);
      }
    }
);

const catalogsSlice = createSlice({
    name: "catalogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCountries.fulfilled, (state, action) => {
            state.countries = action.payload.data;
        });
        builder.addCase(getBranches.fulfilled, (state, action) => {
          state.branches = action.payload.data;
      });
    },
  });
  
  export const {} = catalogsSlice.actions;
  export default catalogsSlice.reducer;