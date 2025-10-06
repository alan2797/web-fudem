import { Row, Divider, Col, Form } from "antd";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { useForm } from "react-hook-form";
import { FormField } from "../../../components/form-field/form-field.component";
import type { CreateUserDto } from "../../../interfaces/user.interface";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import PageContainer from "../../../components/page-container/page-container.component";
import {
  generateZodSchema,
  buildDefaultValues,
} from "../../../validators/validations";
import ButtonCustom from "../../../components/button/button.component";
import {
  breadcrumb,
  configForm,
  configFormPassword,
  steps,
} from "./configs/user-create.config";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepCustom } from "../../../components/step/step.component";

const UserCreate: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const configFormSchema: FieldConfig<CreateUserDto>[] = configForm(); // Solución temporal con type assertion
  const userSchema = generateZodSchema<CreateUserDto>(configFormSchema);
  const configFormStep2Schema: FieldConfig<CreateUserDto>[] =
    configFormPassword(); // Solución temporal con type assertion
  const userStep2Schema = generateZodSchema<CreateUserDto>(
    configFormStep2Schema
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: zodResolver(userSchema),
    defaultValues: buildDefaultValues(configFormSchema),
  });

  const onNext = async () => {
    try {
      setCurrent(current + 1);
    } catch (err) {
      console.log("Errores en formulario:", err);
    }
  };
  const onSubmit = () => {
    console.log("Formulario enviado:");
  };
  return (
    <PageContainer
      title="Crear Usuarios"
      icon={<UnorderedListOutlined className="fs-4" />}
      breadcrumb={breadcrumb}
    >
      <Divider />
      {/* Steps */}
      <Row justify="center">
        <Col md={24} lg={24} xl={18}>
          <StepCustom current={current} steps={steps} />
        </Col>
      </Row>
      <Divider />
      {current === 0 && (
        <>
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
          <Row gutter={20} justify={"end"}>
            <Col xs={24} lg={10} xl={5} style={{ marginTop: 15 }}>
              <ButtonCustom
                htmlType="button"
                type="primary"
                variant={"solid"}
                text="Siguiente"
                onClick={onNext}
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                block
              />
            </Col>
          </Row>
        </>
      )}

      {current === 1 && (
        <>
          <Row gutter={30}>
            <Col xs={24}>
              <Form onFinish={handleSubmit(onSubmit)}>
                <Row gutter={30}>
                  {configFormStep2Schema.map((field) => (
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
          <Row gutter={20} justify={"space-between"}>
            <Col xs={24} lg={10} xl={5}>
              <ButtonCustom
                htmlType="button"
                type="default"
                variant={"solid"}
                text="Anterior"
                onClick={() => setCurrent(0)}
                icon={<ArrowLeftOutlined />}
                iconPosition="start"
                block
              />
            </Col>
            <Col xs={24} lg={10} xl={5}>
              <ButtonCustom
                htmlType="button"
                type="primary"
                variant={"solid"}
                text="Siguiente"
                onClick={() => setCurrent(2)}
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                block
              />
            </Col>
          </Row>
        </>
      )}

      {current === 2 && (
        <>
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
          <Row gutter={20} justify={"space-between"}>
            <Col xs={24} lg={10} xl={5}>
              <ButtonCustom
                htmlType="button"
                type="default"
                variant={"solid"}
                text="Anterior"
                onClick={() => setCurrent(1)}
                icon={<ArrowLeftOutlined />}
                iconPosition="start"
                block
              />
            </Col>
            <Col xs={24} lg={10} xl={5}>
              <ButtonCustom
                htmlType="submit"
                type="primary"
                variant={"solid"}
                text="Crear Usuario"
                icon={<CheckOutlined />}
                iconPosition="end"
                block
              />
            </Col>
          </Row>
        </>
      )}
    </PageContainer>
  );
};

export default UserCreate;
