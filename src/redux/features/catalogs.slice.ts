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
    async () => {
      try {
        const response = await getCountriesService();
        return response.data; 
      } catch (err: any) {
        return err;
      }
    }
);

export const getBranches = createAsyncThunk(
    "catalogs/getBranches",
    async () => {
      try {
        const response = await getBranchesService();
        return response.data; 
      } catch (err: any) {
        throw err;
      }
    }
);

export const getInitialUserCatalogs = createAsyncThunk(
    "catalogs/getInitialUserCatalogs",
    async () => {
      try {
        const [countriesRes, branchesRes] = await Promise.all([
          getCountriesService(),
          getBranchesService(),
        ]);
        console.log(countriesRes);
        console.log(branchesRes);
        return {
          countries: countriesRes.data as CountryDto[],
          branches: branchesRes.data as BranchDto[],
        };
      } catch (err: any) {
        throw err;
      }
    }
);
  

const catalogsSlice = createSlice({
    name: "catalogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInitialUserCatalogs.fulfilled, (state, action) => {
            state.countries = action.payload.countries;
            state.branches = action.payload.branches;
        });
    },
  });
  
  export const {} = catalogsSlice.actions;
  export default catalogsSlice.reducer;