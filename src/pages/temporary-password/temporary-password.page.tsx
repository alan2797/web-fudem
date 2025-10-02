import React, { useEffect } from "react";
import { Row, Col, Form, Divider } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import type { ApiResponse, FieldConfig } from "../../interfaces/components.interface";
import { configFormChangePassword } from "./temporary-password.config";
import { buildDefaultValues, generateZodSchema } from "../../validators/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../components/form-field/form-field.component";
import type { ChangePasswordRequestDto, ChangePasswordResponse } from "../../interfaces/login.interface";
import RecoveryLayout from "../recovery-account/components/recovery-layout";
import { handleRequestAxios } from "../../utils/handle-request-axios";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { changePasswordTempService } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../utils/constants";
import ButtonCustom from "../../components/button/button.component";

const configFormSchema: FieldConfig<ChangePasswordRequestDto>[] = configFormChangePassword();
const changePasswordSchema = generateZodSchema<ChangePasswordRequestDto>(configFormSchema);
const ChangeTemporaryPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const tempPassword = useSelector((state: RootState) => state.auth.user?.tempPassword);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordRequestDto>({
    resolver: zodResolver(changePasswordSchema),
    criteriaMode: "all",
    defaultValues: buildDefaultValues(configFormSchema),
  });

  useEffect(() => {
    if (!tempPassword) navigate(RoutePaths.LOGIN);
  }, [tempPassword, navigate]);

  const onSubmit = async (data: ChangePasswordRequestDto) => {
    console.log("enviado");
    const result: ApiResponse<ChangePasswordResponse> | null = await handleRequestAxios(dispatch, () => changePasswordTempService({ ...data, tempPassword }), {
        showSpinner: true,
        showMessageApi: true
    });
    if(result?.success){
      navigate(RoutePaths.LOGIN);
    }
  };

  return (
    <Row
      className="min-vh-100 d-flex justify-content-center align-items-center bg-primary-antd"
    >
      <Col xs={24} lg={10} className="d-flex justify-content-center">
        <RecoveryLayout
          icon={<KeyOutlined className="main-text fs-2" />}
          title="Cambia la Contraseña Temporal"
          subtitle="Cambia la contraseña temporal por una contraseña segura"
        >
          <Row>
            <Col xs={24}>
              <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Row>
                  {configFormSchema.map((field) => (
                    <React.Fragment key={String(field.key)}>
                      <Col xs={field.xs}>
                        <FormField
                          fieldConfig={field}
                          control={control}
                          error={errors[field.key]}
                        />
                      </Col>
                      {field.key === "newPassword" && (
                        <Col className="w-100">
                          <Divider className="mt-2 mb-3 border-color-primary"></Divider>
                        </Col>
                      )}
                    </React.Fragment>
                  ))}
                </Row>
                <Form.Item>
                  <Row className="mt-2">
                    <Col span={24}>
                      <ButtonCustom
                        loading={isSubmitting}
                        type="primary"
                        htmlType="submit"
                        block
                        title="Confirmar Nueva Contraseña"
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </RecoveryLayout>
      </Col>
      <Col
        xs={0}
        lg={14}
        className="d-none d-lg-flex justify-content-end align-items-center"
      >
        <img
          src="/src/assets/images/login/image1.png"
          alt="Imagen lateral"
          className="img-fluid"
          style={{ objectFit: "cover", width: "85%" }}
        />
      </Col>
    </Row>
  );
};

export default ChangeTemporaryPassword;
