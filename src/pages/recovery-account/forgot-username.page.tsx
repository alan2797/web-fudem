import React, { useState } from "react";
import { Row, Col, theme, Button, Form } from "antd";
import { CheckOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { configFormForgotUsername } from "./configs/forgot-username.config";
import type { ApiResponse, FieldConfig } from "../../interfaces/components.interface";
import { generateZodSchema } from "../../validators/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../components/form-field/form-field.component";
import RecoveryLayout from "./components/recovery-layout";
import type { ForgotUsernameReponse, ForgotUsernameRequestDto } from "../../interfaces/login.interface";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { handleRequestAxios } from "../../utils/handle-request-axios";
import { recoveryUsernameService } from "../../services/auth";

const configFormSchema: FieldConfig<ForgotUsernameRequestDto>[] =
  configFormForgotUsername();
const forgotUsernameSchema =
  generateZodSchema<ForgotUsernameRequestDto>(configFormSchema);

const ForgotUsername: React.FC = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [mostrarConfirm, setMostrarConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotUsernameRequestDto>({
    resolver: zodResolver(forgotUsernameSchema),
    defaultValues: configFormSchema.reduce(
      (acc, field) => ({ ...acc, [field.key]: field.valueInitial }),
      {} as ForgotUsernameRequestDto
    ),
  });
  const onSubmit = async (data: ForgotUsernameRequestDto) => {
    console.log("enviado", data);
    const result: ApiResponse<ForgotUsernameReponse> | null = await handleRequestAxios(dispatch, () => recoveryUsernameService(data), {
      showSpinner: true,
      showMessageApi: true
    });
    console.log(result);
    if(result?.success){
      setMostrarConfirm(true);
    }

  };
  return (
    <Row
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: token.colorPrimary }}
    >
      <Col xs={24} lg={10} className="d-flex justify-content-center">
        {!mostrarConfirm ? (
          <RecoveryLayout
            icon={<UserDeleteOutlined className="main-text fs-1" />}
            title="Has olvidado tu usuario"
            subtitle=" Digite su correo electrónico para que le enviemos el nombre de su usuario"
          >
            <Row>
              <Col xs={24}>
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
                        <Button
                          size="large"
                          type="primary"
                          htmlType="submit"
                          block
                          loading={isSubmitting}
                        >
                          Enviar
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button
                          className="main-text fw-bold"
                          style={{ borderWidth: "2px" }}
                          size="large"
                          htmlType="button"
                          type="primary"
                          ghost
                          block
                          onClick={() => {
                            navigate("/recovery-account");
                          }}
                        >
                          Regresar
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </Col>
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
              <p className="text-center fs-6 fw-light">
                <span className="fw-bold">¡Listo!</span> Tu nombre de usuario
                fue enviado a tu correo. Revisa tu bandeja de entrada o la
                carpeta de spam.
              </p>
            }
            subtitle=""
          >
            <Row>
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
            </Row>
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

export default ForgotUsername;
