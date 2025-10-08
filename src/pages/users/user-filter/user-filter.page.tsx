import { Row, Divider, Col, Form } from "antd";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  breadcrumb,
  configFormUser,
  userData,
} from "./configs/user-filter.config";
import { FormField } from "../../../components/form-field/form-field.component";
import type { FilterEditUserDto } from "../../../interfaces/user.interface";
import { columns } from "./configs/user-filter.table";
import {
    CalendarOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import PageContainer from "../../../components/page-container/page-container.component";
import { buildDefaultValues } from "../../../validators/validations";
import ButtonCustom from "../../../components/button/button.component";
import { TableCustom } from "../../../components/table/table-custom.component";

const UserFilter: React.FC = () => {
  const configFormSchema: FieldConfig<FilterEditUserDto>[] = configFormUser();

  const {
    control,
    formState: { errors },
    reset,
  } = useForm<FilterEditUserDto>({
    defaultValues: buildDefaultValues(configFormSchema),
  });

  const onSubmit: SubmitHandler<FilterEditUserDto> = async () => {
    console.log("Editar Usuario");
  };

  return (
    <PageContainer
      title="Edición de Usuario"
      icon={<UnorderedListOutlined className="fs-4" />}
      breadcrumb={breadcrumb}
    >
      <Form onFinish={onSubmit}>
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
        <Row justify="space-between" align="middle" gutter={[20, 20]}>
          <Col>
            <Row gutter={[16, 16]}>
              <Col>
                <ButtonCustom
                htmlType="button"
                type="default"
                variant="outlined"
                text="Crear Paciente"
                icon={<PlusOutlined />}
                iconPosition="start"
                style={{
                borderColor: "#006eb5",
                borderWidth: "2px",
                color: "#006eb5",
                fontWeight: "bold"
                }}
                />
              </Col>
              <Col>
                <ButtonCustom
                  htmlType="submit"
                  type="primary"
                  variant="solid"
                  text="Crear Citas"
                  icon={<CalendarOutlined />}
                  iconPosition="start"
                  style={{ backgroundColor: "#FF7D00" }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} lg={10} xl={5}>
            <ButtonCustom
            htmlType="submit"
            type="primary"
            variant="solid"
            text="Buscar Paciente"
            icon={<SearchOutlined />}
            iconPosition="start"
            />
          </Col>
        </Row>
      </Form>

      <Divider className="my-4" />
      <TableCustom
        columns={columns}
        dataSource={userData}
        rowKey="id"
        pageSize={5}
        searchable
        onView={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        showPageSize
      />
    </PageContainer>
  );
};

export default UserFilter;
