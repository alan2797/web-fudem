import { Row, Divider, Col, Typography, Form } from "antd";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { useForm } from "react-hook-form";
import type { CreateUserDto } from "../../../interfaces/user.interface";
import { FileAddOutlined } from "@ant-design/icons";
import PageContainer from "../../../components/page-container/page-container.component";
import {
  generateZodSchema,
  buildDefaultValues,
} from "../../../validators/validations";
import { breadcrumb, configForm } from "./configs/patient-create.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/form-field/form-field.component";
import ButtonCustom from "../../../components/button/button.component";

//Step1
const configFormSchema: FieldConfig<CreateUserDto>[] = configForm();
const userSchema = generateZodSchema<CreateUserDto>(configFormSchema);

const { Title } = Typography;

const PatientCreate: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: zodResolver(userSchema),
    defaultValues: buildDefaultValues(configFormSchema),
  });

  const onSubmit = () => {
    console.log("Enviando... patient Create Page")
  } 
  return (
    <PageContainer
      title="Nuevo Paciente"
      icon={<FileAddOutlined className="fs-4" />}
      breadcrumb={breadcrumb}
    >
      <Divider />
      <Form
        layout="vertical"
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 24,
          marginTop: 20,
        }}
      >
        <Title level={4} style={{ marginBottom: 24 }}>
          {" "}
          Crea Nuevos Pacientes{" "}
        </Title>
        <Row gutter={30}>
          <Col xs={24}>
              <Form onFinish={handleSubmit(onSubmit)}>
              <Row gutter={30}>
                  {configFormSchema.map((field) => (
                  <Col
                      className="mb-2"
                      key={String(field.key)}
                      xs={field.xs}
                      md={field.md}
                  >
                      <FormField
                      fieldConfig={field}
                      control={control}
                      error={errors[field.key]?.message as string}
                      />
                  </Col>
                  ))}
              </Row>
              </Form>
          </Col>
        </Row>

        {/* Botones */}
        <Row justify={"end"} gutter={16}>
          <Col xs={24} md={10} lg={6} xl={4}>
          <ButtonCustom
            block
            htmlType="button"
            type="primary"
            variant="solid"
            text="Cancelar"
            className="bg-error-antd"
          />
        </Col>
          <Col xs={24} md={10} lg={6} xl={4}>
          <ButtonCustom
            block
            htmlType="button"
            type="primary"
            variant="solid"
            text="Crear"
            className="bg-primary-antd"
          />
        </Col>
        </Row>
      </Form>
    </PageContainer>
  );
};

export default PatientCreate;
