// UserCreate.tsx
import React, { useState } from "react";
import { Row, Divider, Col, message } from "antd";
import { useDispatch } from "react-redux";
import { UnorderedListOutlined } from "@ant-design/icons";

import PageContainer from "../../../components/page-container/page-container.component";
import { StepCustom } from "../../../components/step/step.component";
import { breadcrumb, steps } from "./configs/user-create.config";
import type { AppDispatch } from "../../../redux/store";

import UserDetailsStep from "./components/user-detail-step.component";
import PasswordStep from "./components/password-step.components";
import type {
  CreateUserDto,
  CreateUserPasswordDto,
} from "../../../interfaces/user.interface";
import type { ApiResponse } from "../../../interfaces/components.interface";
import { handleRequestAxios } from "../../../utils/handle-request-axios";
import { createUserService } from "../../../services/user";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../utils/constants";

interface FormData {
  step1?: CreateUserDto;
  step2?: CreateUserPasswordDto;
}

interface CommonStepProps {
  onNext: (data?: any) => void;
  onPrev: () => void;
  dispatch: AppDispatch;
  initialData?: any;
}

const UserCreate: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({});
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleNext = (stepData?: any) => {
    // Guardar datos del step actual
    if (stepData) {
      setFormData((prev) => ({
        ...prev,
        [`step${current + 1}`]: stepData,
      }));
    }

    setCurrent((c) => Math.min(c + 1, steps.length - 1));
  };

  const handlePrev = () => setCurrent((c) => Math.max(0, c - 1));

  // Función para manejar el envío final del formulario desde el step 2
  const handleSubmit = async (step2Data: CreateUserPasswordDto) => {
    const createUserDto: CreateUserDto = {
      ...formData.step1,
      ...step2Data,
    };
    const result: ApiResponse<CreateUserDto> | null = await handleRequestAxios(
      dispatch,
      () => createUserService(createUserDto),
      {
        showSpinner: true,
        showMessageApi: true,
      }
    );
    if (result?.success) {
      navigate(RoutePaths.USERS_LIST);
    }
  };

  const renderStep = () => {
    const commonProps: CommonStepProps = {
      onNext: handleNext,
      onPrev: handlePrev,
      dispatch,
    };

    switch (current) {
      case 0:
        return (
          <UserDetailsStep {...commonProps} initialData={formData.step1} />
        );
      case 1:
        return (
          <PasswordStep
            {...commonProps}
            onSubmit={handleSubmit} // Pasamos onSubmit al PasswordStep
            initialData={formData.step2}
          />
        );
      default:
        return (
          <UserDetailsStep {...commonProps} initialData={formData.step1} />
        );
    }
  };

  return (
    <PageContainer
      title="Crear Usuarios"
      icon={<UnorderedListOutlined className="fs-4" />}
      breadcrumb={breadcrumb}
    >
      <Divider />

      <Row justify="center">
        <Col md={24} lg={24} xl={18}>
          <StepCustom current={current} steps={steps} />
        </Col>
      </Row>

      <Divider />

      {renderStep()}
    </PageContainer>
  );
};

export default UserCreate;
