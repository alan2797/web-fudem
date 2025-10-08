// steps/PasswordStep.tsx
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Alert, message } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftOutlined, CheckOutlined, ClearOutlined } from "@ant-design/icons";

import { configFormPassword } from "../configs/user-create.config";
import type { CreateUserPasswordDto } from "../../../../interfaces/user.interface";
import { buildDefaultValues, generateZodSchema } from "../../../../validators/validations";
import { FormField } from "../../../../components/form-field/form-field.component";
import ButtonCustom from "../../../../components/button/button.component";
import type { FieldConfig } from "../../../../interfaces/components.interface";

interface PasswordStepProps {
  onNext: () => void;
  onPrev: () => void;
  dispatch: any;
  initialData?: CreateUserPasswordDto;
  onSubmit: (data: CreateUserPasswordDto) => void;
}

const PasswordStep: React.FC<PasswordStepProps> = ({ onNext, onPrev, dispatch, initialData, onSubmit }) => {
  const [configFormSchema, setConfigFormSchema] = useState<FieldConfig<CreateUserPasswordDto>[]>(
    configFormPassword()
  );
  
  const form = useForm<CreateUserPasswordDto>({
    resolver: zodResolver(generateZodSchema(configFormSchema)),
    criteriaMode: "all",
    defaultValues: {...buildDefaultValues(configFormSchema), ...initialData},
  });

  // Reset form cuando initialData cambia
  useEffect(() => {
    if (initialData) {
      form.reset({
        ...buildDefaultValues(configFormSchema),
        ...initialData
      });
    }
  }, [initialData, form, configFormSchema]);

  const watchAutoPassword = form.watch("autoPassword");

  useEffect(() => {
    const updatedConfig = configFormPassword().map(field => {
      if (watchAutoPassword && (field.key === "password" || field.key === "confirmPassword")) {
        return { ...field, validations: [] };
      }
      
      if (!watchAutoPassword && (field.key === "password" || field.key === "confirmPassword")) {
        const originalConfig = configFormPassword().find(f => f.key === field.key);
        return { ...field, validations: originalConfig?.validations || [] };
      }
      
      return field;
    });
    
    setConfigFormSchema(updatedConfig);
    form.clearErrors(["password", "confirmPassword"]);
  }, [watchAutoPassword, form]);

  const filteredFields = configFormSchema.filter(field => 
    !watchAutoPassword || !["password", "confirmPassword"].includes(field.key as string)
  );

  const handleClear = () => {
    message.success("Formulario limpiado");
  };

  return (
    <>
      <h1 className="fs-2 text-primary-antd mb-5 mt-5">Añade Nueva Contraseña</h1>
      
      <Form layout="vertical" onFinish={form.handleSubmit(onNext)}>
        <Row gutter={30}>
          <Col xs={24}>
            <Row gutter={30}>
              {filteredFields.map((field) => (
                <Col key={String(field.key)} xs={field.xs} md={field.md}>
                  <FormField
                    fieldConfig={field}
                    control={form.control}
                    error={form.formState.errors[field.key]}
                  />
                </Col>
              ))}
              
              {watchAutoPassword && (
                <Col xs={24} className="mb-4">
                  <Alert
                    message="Se generará una contraseña temporal y se le enviará a su correo electrónico"
                    type="info"
                  />
                </Col>
              )}
            </Row>
          </Col>
        </Row>

        <Row gutter={20} justify="space-between" className="mt-5">
        <Col xs={24} lg={10} xl={5}>
          <ButtonCustom
            htmlType="button"
            type="default"
            variant="solid"
            text="Anterior"
            onClick={onPrev}
            icon={<ArrowLeftOutlined />}
            iconPosition="start"
            block
          />
        </Col>

        <Col>
          <Row gutter={20}>
            <Col>
              <ButtonCustom
                htmlType="button"
                color="orange"
                type="primary"
                variant="solid"
                text="Limpiar"
                icon={<ClearOutlined />}
                iconPosition="end"
                onClick={handleClear}
              />
            </Col>
            <Col>
              <ButtonCustom
                htmlType="submit"
                type="primary"
                variant="solid"
                text="Crear Usuario"
                icon={<CheckOutlined />}
                iconPosition="end"
                onClick={form.handleSubmit(onSubmit)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      </Form>
    </>
  );
};

export default PasswordStep;