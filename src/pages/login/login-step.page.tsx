import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import StepProfile from "./components/step-profile.components";
import StepDepartment, {
  type Department,
} from "./components/step-departament.component";
import StepBranch, { type Branch } from "./components/step-branch.component";
import StepPosition, {
  type Position,
} from "./components/step-position.component";
import { Col, Layout, Row, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  selectBranch,
  selectDepartment,
  selectPosition,
  selectProfile,
} from "../../services/sessions";
import type { ProfileDto } from "../../interfaces/profile.interface";
interface StepItem {
  type: "profile" | "department" | "branch" | "position";
  component: JSX.Element;
}

const LoginStep: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [step, setStep] = useState<number>(0);

  // Estados para cada selección
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [branch, setBranch] = useState<Branch | null>(null);

  const { token } = theme.useToken();
  const navigate = useNavigate();

  const handleNext = async () => {
    console.log("Current Step:", step);
    if (!steps[step]) return;

    let valid = true;
    const currentStepType = steps[step].type;
    console.log("Current Step Type:", currentStepType);

    try {
      switch (currentStepType) {
        case "profile":
          valid = await selectProfile(profile?.id ?? 0);
          break;
        case "department":
          valid = await selectDepartment(department?.id ?? 0);
          break;
        case "branch":
          valid = await selectBranch(branch?.id ?? 0);
          break;
        case "position":
          valid = await selectPosition(position?.id ?? 0);
          break;
      }

      if (!valid) {
        //message.error("No se pudo validar este paso. Verifica tu selección.");
        return;
      }

      if (step === steps.length - 1) {
        // Último paso: navegar al home
        handleFinish();
      } else {
        setStep(step + 1);
      }
    } catch (err) {
      console.error(err);
      //message.error("Ocurrió un error al verificar el paso.");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFinish = () => {
    console.log({
      profile,
      department,
      position,
      branch,
    });
    console.log("se va a home");
    navigate("/home");
  };

  const steps: StepItem[] = [
    user?.requiresProfileSelection && {
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
    },
    user?.requiresAreaSelection && {
      type: "departament",
      component: (
        <StepDepartment
          key="department"
          department={department}
          setDepartment={setDepartment}
          onNext={handleNext}
          onBack={handleBack}
        />
      ),
    },
    user?.requiresBranchSelection && {
      type: "branch",
      component: (
        <StepBranch
          key="branch"
          branch={branch}
          setBranch={setBranch}
          onNext={handleNext}
          onBack={handleBack}
        />
      ),
    },
    user?.requiresPositionSelection && {
      type: "position",
      component: (
        <StepPosition
          key="position"
          position={position}
          setPosition={setPosition}
          onBack={handleBack}
          onFinish={handleFinish}
        />
      ),
    },
  ].filter(Boolean) as StepItem[]; // eliminamos los valores falsos (los pasos que no aplica)

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: token.colorPrimary }}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={24}>
            {steps[step]?.component && (
              <>
                {steps[step].component}
              </>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginStep;
