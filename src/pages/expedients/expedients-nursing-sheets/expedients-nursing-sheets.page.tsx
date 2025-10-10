import {CheckOutlined, DeleteOutlined, EyeOutlined, FileAddOutlined, FileTextOutlined, PlusCircleOutlined, SolutionOutlined, UnlockOutlined } from "@ant-design/icons";
import PageContainer from "../../../components/page-container/page-container.component";
import { Col, DatePicker, Divider, Form, Row, Tooltip } from "antd";
import type { CreateExpedientPatientDto } from "../../../interfaces/user.interface";

import ButtonCustom from "../../../components/button/button.component";
import { TableCustom } from "../../../components/table/table-custom.component";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { FormField } from "../../../components/form-field/form-field.component";
import { useForm } from "react-hook-form";
import { buildDefaultValues } from '../../../validators/validations';
import ModalConstanciaMedica from "../../../components/modals/modal-form.component";
import { configForm, mockData } from "./configs/expedients-nursing-sheets.config";
import { columns } from "./configs/expedients-nursing-sheets-table.config";

const { RangePicker } = DatePicker;
const configFormSchema: FieldConfig<CreateExpedientPatientDto>[] = configForm();

const ExpedientsNursingSheets: React.FC = () => {
    const [open, setOpen] = useState(false);

  const {
    control,
    // setValue,
    formState: { errors },
  } = useForm<CreateExpedientPatientDto>({
    defaultValues: buildDefaultValues(configFormSchema),
  });

  return (
    <PageContainer
      title="Hoja de Enfermeria"
      icon={<FileAddOutlined className="fs-2" />}
    >
      <Row>
        <Col span={24}>
          <Divider />
          <ButtonCustom
            type="primary"
            text="Crear Hoja de Enfermeria"
            icon={<PlusCircleOutlined />}
            onClick={() => setOpen(true)}
            style={{ marginRight: 10, borderRadius: "20px" }}
            className="bg-primary-antd"
          />
          <Divider />
        </Col>
      </Row>

      <Row>
         <Col span={24}>
          <Title level={2} className="text-primary-antd my-1 mb-4">
            Historial de Hoja de Enfermeria
          </Title>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "15px",
          }}
          className="mb-4"
          span={24}
        >
          <label
            style={{
              fontWeight: 500,
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            Fecha
          </label>
          <RangePicker size="large" format="DD/MM/YYYY" />
        </Col>
       
        <Col>
          <TableCustom<CreateExpedientPatientDto>
            columns={columns}
            dataSource={mockData}
            rowKey="id"
            showPageSize
            extraActions={(record) => (
                    <>
                    <Tooltip title="Desbloquear">
                        <ButtonCustom
                        type="primary"
                        icon={<FileTextOutlined />}
                        size="small"
                        text="VER HOJA"
                        iconPosition="start"
                        // onClick={() => handleUnlock(record.id)}
                        />
                    </Tooltip>
                    </>
                )}
          />
        </Col>
      </Row>
      <ModalConstanciaMedica
        open={open}
        onClose={() => setOpen(false)}
        width={600}
        // imageSrc="/src/assets/svg/logo-sm.svg"
        title="Nueva Hoja de Enfermeria"
        icon={<FileAddOutlined className="fs-2 text-primary-antd" />}
         footerButtons={[
            {
              text: "Limpiar",
              type: "primary",
              onClick: () => {},  // <-- función vacía
              className: "bg-warning-antd",
              icon: <DeleteOutlined />,
              iconPosition:"end"

            },
            {
              text: "Vista Previa",
              type: "default",
              onClick: () => {},  // <-- función vacía
              className: "border-primary-antd text-primary-antd",
              icon: <EyeOutlined />,
              iconPosition: "end"
            },
            {
              text: "Guardar",
              type: "primary",
              onClick: () => {},  // <-- función vacía
              className: "bg-primary-antd",
              icon: <CheckOutlined />,
              iconPosition: "end"
            },
          ]}
      >
        <Row gutter={30}>
          <Col xs={24}>
              <Form>
              <Row gutter={30}>
                   {configFormSchema.map((field) => (
                        <Col
                        className="mb-2"
                        key={String(field.key)}
                        xs={field.xs}
                        md={field.md}
                        >
                        {field.type === "divider" ? (
                            <Divider className="my-0 mb-2"/>
                        ) : (
                            <FormField
                            fieldConfig={field}
                            control={control}
                            error={errors[field.key]?.message as string}
                            />
                        )}
                        </Col>
                    ))}
              </Row>
              </Form>
          </Col>
        </Row>
      </ModalConstanciaMedica>

    </PageContainer>
  );
};

export default ExpedientsNursingSheets;
