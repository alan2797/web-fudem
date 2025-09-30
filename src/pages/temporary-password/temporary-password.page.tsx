import React from "react";
import { Row, Col, Card, theme, Button, Form, Divider} from "antd";
import {KeyOutlined } from "@ant-design/icons";
import type { FieldConfig } from "../../interfaces/components.interface";
import type { ChangePasswordRequestDto } from "../../interfaces/change-password.interface";
import { configFormChangePassword } from "./temporary-password.config";
import { generateZodSchema } from "../../validators/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../components/form-field/form-field.component";

const configFormSchema: FieldConfig<ChangePasswordRequestDto>[] = configFormChangePassword();
const changePasswordSchema = generateZodSchema<ChangePasswordRequestDto>(configFormSchema)
const ChangeTemporaryPassword: React.FC = () => {
  const { token } = theme.useToken();
   const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<ChangePasswordRequestDto>({
      resolver: zodResolver(changePasswordSchema),
      defaultValues: configFormSchema.reduce(
        (acc, field) => ({ ...acc, [field.key]: field.valueInitial }),
        {} as ChangePasswordRequestDto
      ),
    });

    const onSubmit= () => {
        console.log("enviado");
    }
  return (
    <Row className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: token.colorPrimary }} >
      <Col xs={24} lg={10} className="d-flex justify-content-center">
        <Card className="w-100" style={{ maxWidth: 450, borderRadius: 24 }} styles={{ body: { padding: "2rem" }}} >
            <div className="d-flex justify-content-center mt-2 mb-5">
                <img
                src="/src/assets/images/login/logo-lg.png"
                alt="Logo"
                height={40}
                />
            </div>
                <div className="d-flex justify-content-center mb-4">
                    <div
                        className="rounded-circle d-flex justify-content-center align-items-center p-3"
                        style={{backgroundColor: "#e3f1f8" }}
                    >
                        <KeyOutlined size={40} className="main-text fs-1" />
                    </div>
                </div>
                <Row className="mb-4">
                    <Col xs="12">
                        <h5 className="text-center mb-2 fw-bolder">
                        Cambia la Contraseña Temporal
                        </h5>
                        <p className="text-center">
                        Cambia la contraseña temporal por una contraseña segura
                        </p>
                    </Col>
                </Row>
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
                                            error={errors[field.key]?.message as string}
                                        />
                                    </Col>
                                    {field.key === 'newPassword' && (
                                        <Col className="w-100">
                                            <Divider className="mt-2 mb-3 border-color-primary"></Divider>
                                        </Col>
                                    )}
                                </React.Fragment>
                            ))}
                            </Row>
                            <Form.Item>
                                <Row>
                                    <Col span={24}>
                                        <Button size="large" loading={isSubmitting} type="primary" htmlType="submit" block>
                                        Confirmar Nueva Contraseña
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
        </Card>
      </Col>
      <Col xs={0} lg={14} className="d-none d-lg-flex justify-content-end align-items-center">
        <img
          src="/src/assets/images/login/image1.png"
          alt="Imagen lateral"
          className="img-fluid"
          style={{ objectFit: "cover", width: "85%" }}
        />
      </Col>
    </Row>
  )
};
  

export default ChangeTemporaryPassword;
