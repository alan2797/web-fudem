import React, { useState } from "react";
import { Row, Col, Button, Form } from "antd";
import { CheckOutlined, KeyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RecoveryLayout from "./components/recovery-layout";
import type { ForgotPasswordReponse, ForgotPasswordRequestDto } from "../../interfaces/login.interface";
import type { ApiResponse, FieldConfig } from "../../interfaces/components.interface";
import { generateZodSchema } from "../../validators/validations";
import { configFormForgotPassword } from "./configs/forgot-password.config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { handleRequestAxios } from "../../utils/handle-request-axios";
import { forgotPasswordService } from "../../services/auth";
import ButtonCustom from "../../components/button/button.component";
import { FormField } from "../../components/form-field/form-field.component";
const configFormSchema: FieldConfig<ForgotPasswordRequestDto>[] = configFormForgotPassword();
const blockedUsernameSchema = generateZodSchema<ForgotPasswordRequestDto>(configFormSchema);

const ForgotPassword: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordRequestDto>({
    resolver: zodResolver(blockedUsernameSchema),
    defaultValues: configFormSchema.reduce(
      (acc, field) => ({ ...acc, [field.key]: field.valueInitial }),
      {} as ForgotPasswordRequestDto
    ),
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [mostrarConfirm, setMostrarConfirm] = useState(false);
  const onSubmit = async (data: ForgotPasswordRequestDto) => {
    const result: ApiResponse<ForgotPasswordReponse> | null = await handleRequestAxios(dispatch, () => forgotPasswordService(data), {
      showSpinner: true,
      showMessageApi: true
    });
    if(result?.success){
      setMostrarConfirm(true);
    }
  };
  return (
    <Row
      className="min-vh-100 d-flex justify-content-center align-items-center bg-primary-antd"
    >
      <Col xs={24} lg={10} className="d-flex justify-content-center">
        {!mostrarConfirm ? (
          <RecoveryLayout
            icon={<KeyOutlined size={40} className="main-text fs-1" />}
            title="Olvide mi contraseña"
            subtitle="Digite su correo electrónico y usuario para recuperar contraseña"
          >
            <Row>
              <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Row>
                  {configFormSchema.map((field) => (
                    <Col key={field.key} xs={field.xs}>
                      <FormField
                        fieldConfig={field}
                        control={control}
                        error={errors[field.key]?.message as string}
                      />
                    </Col>
                  ))}
                </Row>
                <Form.Item>
                  <Row gutter={10}>
                    <Col span={12}>
                      <ButtonCustom
                        htmlType="submit"
                        type="primary"
                        text="Validar"
                        block
                        loading={isSubmitting}
                      />
                    </Col>
                    <Col span={12}>
                      <ButtonCustom
                        className="main-text fw-bold"
                        style={{ borderWidth: "2px" }}
                        ghost
                        type="primary"
                        block
                        onClick={() => {
                          navigate("/recovery-account");
                        }}
                        text="Regresar"
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Row>
          </RecoveryLayout>
        ) : (
          <RecoveryLayout
            icon={
              <CheckOutlined
                size={32}
                className="fs-2"
                style={{ color: "#00C473" }}
              />
            }
            title={
              <p className="text-center fs-6 fw-lighter">
                <span className="fw-bold">
                  Su información ha sido validado,
                </span>{" "}
                se ha enviado una contraseña temporal, por favor revise su
                correo.
              </p>
            }
            subtitle=""
          >
            <Button
              className="fw-bolder"
              size="large"
              htmlType="button"
              type="primary"
              block
              onClick={() => {
                navigate("/login"); // navega
              }}
            >
              Regresar
            </Button>
          </RecoveryLayout>
        )}
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

export default ForgotPassword;
