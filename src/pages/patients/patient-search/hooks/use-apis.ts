import { useCallback } from "react";
import type {
  PatientSearchDto,
  PatientSearchFilterDto,
} from "../../../../interfaces/patient.interface";
import type { ApiResponse } from "../../../../interfaces/components.interface";
import { handleRequestAxios } from "../../../../utils/handle-request-axios";
import { useDispatch } from "react-redux";
import {
  activePatientSevice,
  deletePatientService,
  getAllPatientsService,
} from "../../../../services/patient";

export const useApis = () => {
  const dispatch = useDispatch();
  const getAllSearchPatientsHook = useCallback(
    async (filters: PatientSearchFilterDto) => {
      const result: ApiResponse<PatientSearchDto[]> | null =
        await handleRequestAxios(
          dispatch,
          () => getAllPatientsService(filters),
          { showSpinner: false }
        );

      return result;
    },
    [dispatch]
  );

  const activePatientHook = useCallback(
    async (id: number) => {
      const result: ApiResponse<PatientSearchDto[]> | null =
        await handleRequestAxios(dispatch, () => activePatientSevice(id), {
          showSpinner: true,
          showMessageApi: true,
        });

      return result;
    },
    [dispatch]
  );

  const deletePatientHook = useCallback(
    async (id: number) => {
      const result: ApiResponse<PatientSearchDto[]> | null =
        await handleRequestAxios(dispatch, () => deletePatientService(id), {
          showSpinner: true,
          showMessageApi: true,
        });

      return result;
    },
    [dispatch]
  );

  return { getAllSearchPatientsHook, activePatientHook, deletePatientHook };
};
