// hooks/useApiCatalogs.ts
import { useCallback } from "react";
import { handleRequestThunk } from "../../../../utils/handle-request-thunk";
import type { ApiResponse, FieldConfig } from "../../../../interfaces/components.interface";
import { 
  getBranches, 
} from "../../../../redux/features/catalogs.slice";
import type { BranchDto } from "../../../../interfaces/branch.interface";
import type { AreaDto } from "../../../../interfaces/area.interface";
import { getAreas, getPositions } from "../../../../redux/features/auth.slice";
import type { PositionDto } from "../../../../interfaces/position.interface";

export const useApiCatalogs = () => {
  const loadAndUpdateBranches = useCallback(async (
    dispatch: any, 
    setConfigFormSchema: React.Dispatch<React.SetStateAction<FieldConfig<any>[]>>
  ): Promise<void> => {
    const result: ApiResponse<BranchDto[]> | null = await handleRequestThunk(
      dispatch,
      () => dispatch(getBranches()).unwrap(),
      { showSpinner: false }
    );

    if (result?.success) {
      setConfigFormSchema(prevConfig => 
        prevConfig.map(field => 
          field.key === 'branchId' 
            ? { 
                ...field, 
                options: result.data.map(({ id, name }) => ({ 
                  value: id, 
                  label: name 
                }))
              }
            : field
        )
      );
    }
  }, []);

  const loadAndUpdateAreas = useCallback(async (
    dispatch: any, 
    branchId: number,
    setConfigFormSchema: React.Dispatch<React.SetStateAction<FieldConfig<any>[]>>,
    form: any // Pasamos el form para poder setear valores
  ): Promise<AreaDto[] | null> => {
    // Limpiar áreas y posiciones siempre
    setConfigFormSchema(prevConfig => 
      prevConfig.map(field => 
        field.key === 'areaId' ? { ...field, options: [] } : 
        field.key === 'positionId' ? { ...field, options: [] } : 
        field
      )
    );

    form.setValue("areaId", null as any);
    form.setValue("positionId", null as any);

    if (!branchId) {
      return null;
    }

    const result: ApiResponse<AreaDto[]> | null = await handleRequestThunk(
      dispatch,
      () => dispatch(getAreas(branchId)).unwrap(),
      { showSpinner: false }
    );

    if (result?.success) {
      setConfigFormSchema(prevConfig => 
        prevConfig.map(field => 
          field.key === 'areaId' 
            ? { 
                ...field, 
                options: result.data.map(({ id, name }) => ({ 
                  value: id, 
                  label: name 
                }))
              }
            : field
        )
      );

      // Si hay solo una área, autoseleccionarla
      if (result.data.length === 1) {
        const singleArea = result.data[0];
        form.setValue("areaId", singleArea.id as any);
        
        // Retornar las áreas para que el useEffect de positions pueda usarlas
        return result.data;
      }
    }

    return result?.success ? result.data : null;
  }, []);

  const loadAndUpdatePositions = useCallback(async (
    dispatch: any, 
    areaId: number,
    setConfigFormSchema: React.Dispatch<React.SetStateAction<FieldConfig<any>[]>>,
    form: any // Pasamos el form para poder setear valores
  ): Promise<void> => {
    // Limpiar posiciones siempre
    setConfigFormSchema(prevConfig => 
      prevConfig.map(field => 
        field.key === 'positionId' ? { ...field, options: [] } : field
      )
    );

    form.setValue("positionId", null as any);

    if (!areaId) {
      return;
    }

    const result: ApiResponse<PositionDto[]> | null = await handleRequestThunk(
      dispatch,
      () => dispatch(getPositions(areaId)).unwrap(),
      { showSpinner: false }
    );

    if (result?.success) {
      setConfigFormSchema(prevConfig => 
        prevConfig.map(field => 
          field.key === 'positionId' 
            ? { 
                ...field, 
                options: result.data.map(({ id, name }) => ({ 
                  value: id, 
                  label: name 
                }))
              }
            : field
        )
      );

      // Si hay solo una posición, autoseleccionarla
      if (result.data.length === 1) {
        const singlePosition = result.data[0];
        form.setValue("positionId", singlePosition.id as any);
      }
    }
  }, []);

  return { 
    loadAndUpdateBranches, 
    loadAndUpdateAreas, 
    loadAndUpdatePositions 
  };
};