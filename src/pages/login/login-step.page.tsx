import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepProfile, { type Profile } from "./components/step-profile.components";
import StepDepartment, { type Department } from "./components/step-departament.component";
import StepBranch, { type Branch } from "./components/step-branch.component";
import StepPosition, { type Position } from "./components/step-position.component";
import { Col, Layout, Row, theme } from "antd";
import { Content } from "antd/es/layout/layout";

const LoginStep: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  // Estados para cada selección
  const [profile, setProfile] = useState<Profile | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [branch, setBranch] = useState<Branch | null>(null);

  const { token } = theme.useToken();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
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
    navigate("/home");
  };

  const steps = [
    <StepProfile
      key="profile"
      profile={profile}
      setProfile={setProfile}
      onNext={handleNext}
    />,
    <StepDepartment
      key="department"
      department={department}
      setDepartment={setDepartment}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <StepBranch
      key="branch"
      branch={branch}
      setBranch={setBranch}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <StepPosition
      key="position"
      position={position}
      setPosition={setPosition}
      onBack={handleBack}
      onFinish={handleFinish}
    />,
  ];

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: token.colorPrimary }}>
    <Content>
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh"}}
      >
        <Col xs={24}>
          {steps[step]}
        </Col>
      </Row>
    </Content>
  </Layout>
  );
};

export default LoginStep;
