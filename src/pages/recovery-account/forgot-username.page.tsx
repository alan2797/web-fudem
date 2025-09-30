import React, { useState } from "react";
import { Row, Col, Card, theme, Button, Form } from "antd";
import { CheckOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { configFormForgotUsername } from "./configs/forgot-username.config";
import type { ForgotUsernameRequestDto } from "../../interfaces/forgot-username.interface";
import type { FieldConfig } from "../../interfaces/components.interface";
import { generateZodSchema } from "../../validators/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../components/form-field/form-field.component";

const configFormSchema: FieldConfig<ForgotUsernameRequestDto>[] =
  configFormForgotUsername();
const forgotUsernameSchema =
  generateZodSchema<ForgotUsernameRequestDto>(configFormSchema);

const ForgotUsername: React.FC = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
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
  const onSubmit = () => {
    console.log("enviado");
  };
  return (
    <Row
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: token.colorPrimary }}
    >
      <Col xs={24} lg={10} className="d-flex justify-content-center">
        <Card
          className="w-100"
          style={{ maxWidth: 441, borderRadius: 24 }}
          styles={{ body: { padding: "2rem" } }}
        >
          <div className="d-flex justify-content-center mt-2 mb-5">
            <img
              src="/src/assets/images/login/logo-lg.png"
              alt="Logo"
              height={40}
            />
          </div>
          {!mostrarConfirm ? (
            <>
              <div className="d-flex justify-content-center mb-4">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center p-3"
                  style={{ backgroundColor: "#e3f1f8" }}
                >
                  <UserDeleteOutlined size={40} className="main-text fs-1" />
                </div>
              </div>
              <Row className="mb-4">
                <Col xs="12">
                  <h5 className="text-center mb-2 fw-bolder">
                    Has olvidado tu usuario
                  </h5>
                  <p className="text-center text-dark">
                    Digite su correo electrónico para que le enviemos el nombre
                    de su usuario
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={24}>
                  <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Row>
                      {configFormSchema.map((field) => (
                        <Col xs={field.xs}>
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
                            onClick={() => setMostrarConfirm(true)}
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
            </>
          ) : (
            <Row>
              <Row className="mb-3" justify="center" align="middle">
                <Col
                  className=" d-flex mb-4 justify-content-center align-items-center rounded-circle"
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "3px solid #00C473",
                  }}
                >
                  <CheckOutlined
                    size={30}
                    className="fs-4"
                    style={{ color: "#00C473" }}
                  />
                </Col>
                <Col xs="12">
                  <p className="text-center fs-6">
                    <span className="fw-bold">¡Listo!</span> Tu nombre de
                    usuario fue enviado a tu correo. Revisa tu bandeja de
                    entrada o la carpeta de spam.
                  </p>
                </Col>
              </Row>
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
          )}
        </Card>
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
