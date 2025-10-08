import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepProfile from "./components/step-profile.components";
import StepDepartment from "./components/step-departament.component";
import StepPosition from "./components/step-position.component";
import { Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import type { ProfileDto, SelectProfileResponse } from "../../interfaces/profile.interface";
import { handleRequestThunk } from "../../utils/handle-request-thunk";
import { getAreas, getPositions, selectArea, selectPosition, selectProfile } from "../../redux/features/auth.slice";
import type { AreaDto, SelectAreaResponse } from "../../interfaces/area.interface";
import type { LoginStepNormalProps, StepItemNormal } from "../../interfaces/login.interface";
import type { PositionDto, SelectPositionResponse } from "../../interfaces/position.interface";
import type { ApiResponse } from "../../interfaces/components.interface";

const LoginStepNormal: React.FC<LoginStepNormalProps> = ({ user }) => {
  const [step, setStep] = useState<number>(0);
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const [department, setDepartment] = useState<AreaDto | null>(null);
  const [position, setPosition] = useState<PositionDto | null>(null);
  const [departmentList, setDepartmentList] = useState<AreaDto[] | null>(null);
  const [positionList, setPositionList] = useState<PositionDto[] | null>(null);
  const [branchId, setBranchId] = useState<number | null>(null);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [positionId, setPositionId] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user && !user.requiresProfileSelection) {
      handleFinish();
    }
  }, [user]);

  const handleNext = async () => {
    if (!steps[step]) return;
    const currentStepType = steps[step].type;
  
    try {
      switch (currentStepType) {
        case "profile":
            if (!profile) break;
            
            const profileResult: ApiResponse<SelectProfileResponse> | null = await handleRequestThunk(
                dispatch,
                () => dispatch(selectProfile({profileId: profile.id})).unwrap(),
                { showSpinner: true }
            );
            if((profileResult && !profileResult.success) || !profileResult) return;
            
            console.log(profileResult);
            
            // Si tiene areaId definido, ir directo a home
            if (profileResult.data.profile.areaId != null && profileResult.data.profile.positionId != null) {
                handleFinish();
                return;
            }
            setPositionId(profileResult.data.profile.positionId);
            // Guardar branchId
            setBranchId(profileResult.data.profile.branchId);
            
            // 🔹 CARGAR ÁREAS INMEDIATAMENTE después de seleccionar perfil
            const departmentResultList: ApiResponse<AreaDto[]> | null = await handleRequestThunk(
                    dispatch,
                    () => dispatch(getAreas(profileResult.data.profile.branchId)).unwrap(),
                {
                    showSpinner: false
                }
            );
            if(!departmentResultList || !departmentResultList?.success) return;
            setDepartmentList(departmentResultList?.data ?? []);
          break;
  
        case "department":
          if (!department) break;
          const departamentResult: ApiResponse<SelectAreaResponse> | null= await handleRequestThunk(
            dispatch,
            () => dispatch(selectArea({areaId: department.id, branchId: branchId ?? 0})).unwrap(),
            {
                showSpinner: true
            }
            );
          console.log(departamentResult);
          
          if ((departamentResult && !departamentResult.success) || !departamentResult) return;

          // Si tiene ya positionId definido, ir directo a home
          if (positionId != null) {
            handleFinish();
            return;
          }

          // Guardar areaId
          setAreaId(department.id);
          console.log("llego a obtener posiciones");
           // 🔹 CARGAR ÁREAS INMEDIATAMENTE después de seleccionar perfil
           const positionResultList: ApiResponse<PositionDto[]> | null = await handleRequestThunk(
            dispatch,
            () => dispatch(getPositions(department.id)).unwrap(),
                {
                    showSpinner: false
                }
            );
            
            if(!positionResultList || !positionResultList?.success) return;
            setPositionList(positionResultList?.data ?? []);

          break;
  
        case "position":
          if (!position) break;

          const positionResult: ApiResponse<SelectPositionResponse> | null = await handleRequestThunk(
            dispatch,
            () => dispatch(selectPosition({areaId: areaId ?? 0, positionId: position.id ?? 0})).unwrap(),
              {
                  showSpinner: true
              }
            );
          console.log(positionResult);
          if((positionResult && !positionResult.success) || !positionResult) return;

          if(positionResult.success){
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

  // Construir steps dinámicamente basado en los flags del usuario
  const buildSteps = (): StepItemNormal[] => {
    const steps: StepItemNormal[] = [];
    
    steps.push({
      type: "profile",
      component: (
        <StepProfile
          key="profile"
          profile={profile}
          setProfile={setProfile}
          onNext={handleNext}
          profilesList={user?.profiles ?? []}
        />
      ),
    });
    
    steps.push({
      type: "department",
      component: (
        <StepDepartment
          key="department"
          department={department}
          setDepartment={setDepartment}
          onNext={handleNext}
          onBack={handleBack}
          departamentList={departmentList ?? []}
        />
      ),
    });
    
    steps.push({
      type: "position",
      component: (
        <StepPosition
          key="position"
          position={position}
          setPosition={setPosition}
          onBack={handleBack}
          handleNext={handleNext}
          positionList={positionList ?? []}
        />
      ),
    });
    
    return steps;
  };

  const steps = buildSteps();
  
  if (steps.length === 0) {
    return null;
  }

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

export default LoginStepNormal;