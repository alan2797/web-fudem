// steps/UserDetailsStep.tsx
import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightOutlined } from "@ant-design/icons";

import { configForm } from "../configs/user-create.config";
import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { CreateUserDto } from "../../../../interfaces/user.interface";
import { buildDefaultValues, generateZodSchema } from "../../../../validators/validations";
import { FormField } from "../../../../components/form-field/form-field.component";
import ButtonCustom from "../../../../components/button/button.component";
import { useApiCatalogs } from "../hooks/use-apis";

interface UserDetailsStepProps {
  onNext: () => void;
  dispatch: any;
  initialData?: CreateUserDto;
}

const UserDetailsStep: React.FC<UserDetailsStepProps> = ({ onNext, dispatch, initialData }) => {
  const [configFormSchema, setConfigFormSchema] = useState<FieldConfig<CreateUserDto>[]>(configForm());
  const { loadAndUpdateBranches } = useApiCatalogs();
  
  const form = useForm<CreateUserDto>({
    resolver: zodResolver(generateZodSchema(configFormSchema)),
    defaultValues: {...buildDefaultValues(configFormSchema), ...initialData},
  });

  // Reset form cuando initialData cambia (al retroceder)
  useEffect(() => {
    if (initialData) {
      form.reset({
        ...buildDefaultValues(configFormSchema),
        ...initialData
      });
    }
  }, [initialData, form, configFormSchema]);

  useEffect(() => {
    const loadData = async () => await loadAndUpdateBranches(dispatch, setConfigFormSchema);
    loadData();
  }, [dispatch, loadAndUpdateBranches]);

  return (
    <>
      <h1 className="fs-2 text-primary-antd mb-5 mt-5">Añada Detalles de Nuevo Usuario</h1>
      
      <Form onFinish={form.handleSubmit(onNext)}>
        <Row gutter={30}>
          <Col xs={24}>
            <Row gutter={30}>
              {configFormSchema.map((field) => (
                <Col className="mb-2" key={String(field.key)} xs={field.xs} md={field.md}>
                  <FormField
                    fieldConfig={field}
                    control={form.control}
                    error={form.formState.errors[field.key]?.message as string}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row gutter={20} justify="end">
          <Col xs={24} lg={10} xl={5} style={{ marginTop: 15 }}>
            <ButtonCustom
              htmlType="submit"
              type="primary"
              variant="solid"
              text="Siguiente"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              block
              loading={form.formState.isSubmitting}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UserDetailsStep;