import React from "react";
import { Row, Col, Card, Form, Button } from "antd";
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
import { login, setTempPassword } from "../../redux/features/auth.slice";
import { handleRequestThunk } from "../../utils/handle-request-thunk";
import { localStorageService } from "../../services/localstorage";
import { RoutePaths } from "../../utils/constants";

const configFormSchema: FieldConfig<LoginRequestDto>[] = configForm();
const loginSchema = generateZodSchema<LoginRequestDto>(configFormSchema);
const Login: React.FC = () => {
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
  const result: ApiResponse<LoginResponseDto> | null = await handleRequestThunk(dispatch, () => dispatch(login(data)).unwrap(), {
    showSpinner: true,
    showMessageApi: true
  });
  if(result?.success){
    if(result.data.requiresPasswordChange){
      dispatch(setTempPassword(data?.password ?? ''));
      navigate(RoutePaths.CHANGE_PASSWORD_TEMP);
      return;
    }

    const token = localStorageService.decode();
    if(token?.isAdmin || result.data.requiresProfileSelection){
      navigate(RoutePaths.LOGIN_STEP);
    }else{
      navigate(RoutePaths.HOME);
    }
  }
};

  return (
    <Row
      className="min-vh-100 d-flex justify-content-center align-items-center bg-primary-antd"
    >
      <Col xs={23} lg={10} className="d-flex justify-content-center">
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
                className="main-link"
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
