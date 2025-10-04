import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import StepDepartment from "./components/step-departament.component";
import StepBranch from "./components/step-branch.component";
import StepPosition from "./components/step-position.component";
import { Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { handleRequestThunk } from "../../utils/handle-request-thunk";
import { getAreas, getPositions, selectArea, selectBranch, selectPosition } from "../../redux/features/auth.slice";
import type { AreaDto, SelectAreaResponse } from "../../interfaces/area.interface";
import type { LoginResponseDto } from "../../interfaces/login.interface";
import type {
  BranchDto,
  SelectBranchResponse,
} from "../../interfaces/branch.interface";
import type { PositionDto, SelectPositionResponse } from "../../interfaces/position.interface";
import type { ApiResponse } from "../../interfaces/components.interface";

interface StepItem {
  type: "department" | "branch" | "position";
  component: JSX.Element;
}

interface LoginStepNormalProps {
  user: LoginResponseDto | null;
  areas: AreaDto[];
  positions: PositionDto[]
}
const LoginStepAdmin: React.FC<LoginStepNormalProps> = ({ user, areas, positions }) => {
  const [step, setStep] = useState<number>(0);
  const [department, setDepartment] = useState<AreaDto | null>(null);
  const [position, setPosition] = useState<PositionDto | null>(null);
  const [branch, setBranch] = useState<BranchDto | null>(null);
  const [departmentList, setDepartmentList] = useState<AreaDto[] | null>(
    null
  );
  const [positionList, setPositionList] = useState<PositionDto[] | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleNext = async () => {
    if (!steps[step]) return;

    const currentStepType = steps[step].type;

    try {
      switch (currentStepType) {
        case "branch":
          if (!branch) return;
          const branchResult: ApiResponse<SelectBranchResponse> | null = await handleRequestThunk(
            dispatch,
            () => dispatch(selectBranch({branchId: branch.id})).unwrap(),
            {
              showSpinner: true,
              successMessage: "Sucursal seleccionado",
              errorMessage: "Error al seleccionar Sucursal",
            }
          );
          if ((branchResult && !branchResult.success) || !branchResult) return;

          console.log(branchResult);

          // 🔹 CARGAR ÁREAS INMEDIATAMENTE después de seleccionar perfil
          const departmentResultList: ApiResponse<AreaDto[]> | null = await handleRequestThunk(
            dispatch,
            () => dispatch(getAreas(branch.id)).unwrap(),
            {
              showSpinner: false, 
              showMessageApi: true
            }
          );
          if(!departmentResultList || !departmentResultList?.success) return;
          setDepartmentList(departmentResultList?.data ?? []);
          break;

        case "department":
          if (!department) break;
          const departamentResult: ApiResponse<SelectAreaResponse> | null= await handleRequestThunk(
            dispatch,
            () =>
              dispatch(
                selectArea({ areaId: department.id, branchId: branch?.id ?? 0 })
              ).unwrap(),
            {
              showSpinner: true,
              successMessage: "Area seleccionado",
              errorMessage: "Error al seleccionar Area",
            }
          );
          console.log(departamentResult);

          if ((departamentResult && !departamentResult.success) || !departamentResult) return;

          // Si tiene areaId definido, ir directo a home
          if (departamentResult.data.area.positionId != null) {
            handleFinish();
            return;
          }

          // 🔹 CARGAR ÁREAS INMEDIATAMENTE después de seleccionar perfil
          const positionResultList: ApiResponse<PositionDto[]> | null = await handleRequestThunk(
            dispatch,
            () =>
              dispatch(
                getPositions(department.id ?? 0)
              ).unwrap(),
            {
              showSpinner: false, // Ya mostró spinner en selectProfile
              successMessage: "Puestos cargadas",
              errorMessage: "Error al cargar Puestos",
            }
          );

          if(!positionResultList || !positionResultList?.success) return;
          setPositionList(positionResultList?.data ?? []);

          break;

        case "position":
          if (!position) break;
          
          const positionResult: ApiResponse<SelectPositionResponse> | null = await handleRequestThunk(
            dispatch,
            () => dispatch(selectPosition({areaId: department?.id ?? 0, positionId: position.id ?? 0})).unwrap(),
              {
                  showSpinner: true,
                  successMessage: "Position seleccionado",
                  errorMessage: "Error al seleccionar Position",
              }
            );
          console.log(positionResult);
          if((positionResult && !positionResult.success) || !positionResult) return;
          
          if(positionResult){
            handleFinish();
            return;
          }
          break;
      }

      if (step === steps.length - 1) {
        handleFinish();
      } else {
        setStep(step + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFinish = () => {
    navigate("/home");
  };

  const steps: StepItem[] = [
    {
      type: "branch",
      component: (
        <StepBranch
          key="branch"
          branch={branch}
          setBranch={setBranch}
          onNext={handleNext}
          branchList={user?.availableBranches ?? []}
        />
      ),
    },
    {
      type: "department",
      component: (
        <StepDepartment
          key="department"
          department={department}
          setDepartment={setDepartment}
          onNext={handleNext}
          onBack={handleBack}
          departamentList={departmentList ?? areas}
        />
      ),
    },
    {
      type: "position",
      component: (
        <StepPosition
          key="position"
          position={position}
          setPosition={setPosition}
          onBack={handleBack}
          handleNext={handleNext}
          positionList={positionList ?? positions}
        />
      ),
    },
  ];

  return (
    <Layout className="bg-primary-antd" style={{ minHeight: "100vh" }}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={24}>{steps[step]?.component}</Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginStepAdmin;
