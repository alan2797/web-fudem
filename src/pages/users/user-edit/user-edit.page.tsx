import { Col, Form, Divider } from "antd";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  breadcrumb,
  configFormTab2,
  configFormTab1,
  tabsItems,
  configFormTab3,
} from "./configs/user-edit.config";
import { FormField } from "../../../components/form-field/form-field.component";
import type {
  CreateUserDto,
  FilterEditUserDto,
} from "../../../interfaces/user.interface";
import {
  UnorderedListOutlined,
} from "@ant-design/icons";
import PageContainer from "../../../components/page-container/page-container.component";
import { buildDefaultValues } from "../../../validators/validations";
import { useState } from "react";
import EditFormLayout from "./configs/edit-form.layout";

const UserEdit: React.FC = () => {
  const configFormSchema: FieldConfig<CreateUserDto>[] = configFormTab1();
  const [activeTab, setActiveTab] = useState("1");

  const {
    control,
    formState: { errors },
    reset,
  } = useForm<CreateUserDto>({
    defaultValues: buildDefaultValues(configFormSchema),
  });

  const tab2FormSchema: FieldConfig<CreateUserDto>[] = configFormTab2();
  const {
    control: controlTab2,
    formState: { errors: errorsTab2 },
    reset: resetTab2,
  } = useForm<CreateUserDto>({
    defaultValues: buildDefaultValues(tab2FormSchema),
  });

  const tab3FormSchema: FieldConfig<CreateUserDto>[] = configFormTab3();
  const {
    control: controlTab3,
    formState: { errors: errorsTab3 },
    reset: resetTab3,
  } = useForm<FilterEditUserDto>({
    defaultValues: buildDefaultValues(tab3FormSchema),
  });

  const onSubmit: SubmitHandler<FilterEditUserDto> = async () => {
    console.log("Editar Usuario");
  };
  return (
    <PageContainer
      title="Edición de Usuario"
      icon={<UnorderedListOutlined className="fs-4" />}
      breadcrumb={breadcrumb}
      tabs={{
        items: tabsItems,
        defaultActiveKey: "1",
        onChange: (key) => setActiveTab(key), // actualiza el estado
      }}
    >
      {/* Solo renderizamos el formulario si estamos en la pestaña 1 */}
      {activeTab === "1" && (
        <Form onFinish={onSubmit} layout="vertical">
          <EditFormLayout
            onDelete={() => {}}
            onSubmit={() => {}}
            onReset={() => reset()}
          >
            {configFormSchema.map((field) => (
              <Col
                className="mb-2"
                key={String(field.key)}
                xs={field.xs || 24}
                md={field.md || 12}
              >
                {field.type === "divider" ? (
                  <Divider className="my-1 mb-2" />
                ) : field.disabled ? (
                  <div>
                    {field.label && (
                      <label style={{ display: "block", marginBottom: "6px" }}>
                        {field.label}
                      </label>
                    )}
                    <span style={{ fontSize: "22px" }}>
                      {field.valueInitial as string}
                    </span>
                  </div>
                ) : (
                  <FormField
                    fieldConfig={field}
                    control={control}
                    error={errors[field.key]?.message as string}
                  />
                )}
              </Col>
            ))}
          </EditFormLayout>
        </Form>
      )}

      {/* Aquí podrías renderizar contenido de otras pestañas si quieres */}
      {activeTab === "2" && (
        <Form onFinish={onSubmit} layout="vertical">
          <EditFormLayout
            onDelete={() => {}}
            onSubmit={() => {}}
            onReset={() => resetTab2()}
          >
            {tab2FormSchema.map((field) => (
              <Col
                className="mb-2"
                key={String(field.key)}
                xs={field.xs || 24}
                md={field.md || 12}
              >
                {field.type === "divider" ? (
                  <Divider className="my-1 mb-2" />
                ) : field.disabled ? (
                  <div>
                    {field.label && (
                      <label style={{ display: "block", marginBottom: "6px" }}>
                        {field.label}
                      </label>
                    )}
                    <span style={{ fontSize: "22px" }}>
                      {field.valueInitial as string}
                    </span>
                  </div>
                ) : (
                  <FormField
                    fieldConfig={field}
                    control={controlTab2}
                    error={errorsTab2[field.key]?.message as string}
                  />
                )}
              </Col>
            ))}
          </EditFormLayout>
        </Form>
      )}
      {activeTab === "3" && (
        <Form onFinish={onSubmit} layout="vertical">
          <EditFormLayout
            onDelete={() => {}}
            onSubmit={() => {}}
            onReset={() => resetTab3()}
          >
            {tab3FormSchema.map((field) => (
              <Col
                className="mb-2"
                key={String(field.key)}
                xs={field.xs || 24}
                md={field.md || 12}
              >
                {field.type === "divider" ? (
                  <Divider className="my-1 mb-2" />
                ) : field.disabled ? (
                  <div>
                    {field.label && (
                      <label style={{ display: "block", marginBottom: "6px" }}>
                        {field.label}
                      </label>
                    )}
                    <span style={{ fontSize: "22px" }}>
                      {field.valueInitial as string}
                    </span>
                  </div>
                ) : (
                  <FormField
                    fieldConfig={field}
                    control={controlTab3}
                    error={errorsTab3[field.key]?.message as string}
                  />
                )}
              </Col>
            ))}
          </EditFormLayout>
        </Form>
      )}
    </PageContainer>
  );
};

export default UserEdit;
