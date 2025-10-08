// steps/WorkProfileStep.tsx
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Divider, message } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  ArrowLeftOutlined, 
  CheckOutlined, 
  ClearOutlined, 
  DeleteOutlined, 
  PlusOutlined 
} from "@ant-design/icons";

import { configFormStep3 } from "../configs/user-create.config";
import { FormField } from "../../../../components/form-field/form-field.component";
import ButtonCustom from "../../../../components/button/button.component";
import { TableCustom } from "../../../../components/table/table-custom.component";
import type { CreateUserWorkProfileDto } from "../../../../interfaces/user.interface";
import { buildDefaultValues, generateZodSchema } from "../../../../validators/validations";
import type { WorkProfileTableDto } from "../../../../interfaces/profile.interface";
import { columns } from "../configs/user-create.table";
import { useApiCatalogs } from "../hooks/use-apis";
import type { FieldConfig } from "../../../../interfaces/components.interface";

interface WorkProfileStepProps {
  onPrev: () => void;
  onSubmit: (data: CreateUserWorkProfileDto) => void;
  dispatch: any;
  initialData?: CreateUserWorkProfileDto;
}

const WorkProfileStep: React.FC<WorkProfileStepProps> = ({ onPrev, onSubmit, dispatch, initialData }) => {
  const { loadAndUpdateBranches, loadAndUpdateAreas, loadAndUpdatePositions } = useApiCatalogs();
  const [configFormSchema, setConfigFormSchema] = useState<FieldConfig<CreateUserWorkProfileDto>[]>(configFormStep3());
  const form = useForm<CreateUserWorkProfileDto>({
    resolver: zodResolver(generateZodSchema(configFormSchema)),
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
  }, [initialData, form]);
   // Watch para los campos dependientes
   const watchBranchId = form.watch("branchId") ?? 0;
   const watchAreaId = form.watch("areaId") ?? 0;

  useEffect(() => {
    const loadData = async () => await loadAndUpdateBranches(dispatch, setConfigFormSchema);
    loadData();
  }, [loadAndUpdateBranches, dispatch]);

  useEffect(() => {
    const loadData = async () => await loadAndUpdateAreas(dispatch, watchBranchId, setConfigFormSchema, form);
    loadData();
  }, [loadAndUpdateAreas, watchBranchId, setConfigFormSchema, form]);

  useEffect(() => {
    const loadData = async () => await loadAndUpdatePositions(dispatch, watchAreaId, setConfigFormSchema, form);
    loadData();
  }, [loadAndUpdatePositions, watchAreaId, setConfigFormSchema, form]);


  const handleAddProfile = () => {
    message.info("Añadir perfil (implementar lógica)");
  };

  const handleClear = () => {
    message.success("Formulario limpiado");
  };

  const handleDeleteUser = () => {
    message.warning("Eliminar usuario (implementar lógica)");
  };

  return (
    <>
      <h1 className="fs-2 text-primary-antd mb-5 mt-5">Defina el Perfil del Trabajo</h1>
      
      <Form onFinish={form.handleSubmit(onSubmit)}>
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

        <Row justify="end">
          <Col>
            <ButtonCustom
              htmlType="button"
              type="primary"
              variant="solid"
              text="Añadir Perfil"
              icon={<PlusOutlined />}
              iconPosition="end"
              onClick={handleAddProfile}
            />
          </Col>
        </Row>
      </Form>
      <Row>
        <Divider />
        <Col xs={24}>
          <TableCustom<WorkProfileTableDto>
            columns={columns}
            dataSource={[]}
            rowKey="id"
            onNewButtonClick={() => {}}
            onDelete={() => {}}
          />
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
                color="danger"
                type="primary"
                variant="solid"
                text="Eliminar Usuario"
                icon={<DeleteOutlined />}
                iconPosition="end"
                onClick={handleDeleteUser}
              />
            </Col>
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
    </>
  );
};

export default WorkProfileStep;