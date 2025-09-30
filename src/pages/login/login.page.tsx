import React from "react";
import { Row, Col, Card, Form, Button, theme } from "antd";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiResponse, FieldConfig } from "../../interfaces/components.interface";
import { configForm } from "./login.config";
import { generateZodSchema } from "../../validators/validations";
import type { LoginRequestDto, LoginResponseDto } from "../../interfaces/login.interface";
import { Link, useNavigate } from "react-router-dom";
import { FormField } from "../../components/form-field/form-field.component";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { login } from "../../redux/features/auth.slice";
import { handleRequest } from "../../utils/handle-request";
import { localStorageService } from "../../services/localstorage";

const configFormSchema: FieldConfig<LoginRequestDto>[] = configForm();
const loginSchema = generateZodSchema<LoginRequestDto>(configFormSchema);
const Login: React.FC = () => {
  const { token: themeToken } = theme.useToken();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequestDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: configFormSchema.reduce(
      (acc, field) => ({ ...acc, [field.key]: field.valueInitial }),
      {} as LoginRequestDto
    ),
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginRequestDto> = async (data) => {
    console.log(data);
    const result: ApiResponse<LoginResponseDto> | null = await handleRequest(dispatch, () => dispatch(login(data)).unwrap(), {
      showSpinner: true,
      successMessage: "Login exitoso",
      errorMessage: "Error en las credenciales",
    });
    console.log(result);
    const token = localStorageService.decode();
    if(token?.isAdmin){
      navigate("/login/step");
    }else if(result?.data.requiresProfileSelection){
      navigate("/login/step");
    }else{
      navigate("/home");
    }
  };

  return (
    <Row
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: themeToken.colorPrimary }}
    >
      <Col xs={24} lg={10} className="d-flex justify-content-center">
        <Card
          className="w-100"
          style={{ maxWidth: 410, borderRadius: 24 }}
          bodyStyle={{ padding: "2rem" }}
        >
          <div className="d-flex justify-content-center mb-5">
            <img
              src="/src/assets/images/login/logo-lg.png"
              alt="Logo"
              height={88}
            />
          </div>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            {configFormSchema.map((field) => (
              <div className="mb-1" key={String(field.key)}>
                <FormField
                  fieldConfig={field}
                  control={control}
                  error={errors[field.key]?.message as string}
                />
              </div>
            ))}
            <div className="text-start" style={{ marginTop: "-10px" }}>
              <Link
                to="/recovery-account"
                className="text-decoration-underline fs-6 fw-lighter"
                style={{color: "#0096F7"}}
              >
                He olvidado mi usuario/contraseña
              </Link>
            </div>
            <Button
              htmlType="submit"
              type="primary"
              loading={isSubmitting}
              block
              className="mt-3"
              size="large"
            >
              Ingresar
            </Button>
          </Form>
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

export default Login;
