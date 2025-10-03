import React, { useEffect, useState } from "react";
import { Row, Divider, Col } from "antd";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { useForm } from "react-hook-form";
import { breadcrumb, configForm } from "./configs/user-list.config";
import { FormField } from "../../../components/form-field/form-field.component";
import { TableCustom } from "../../../components/table/table-custom.component";
import type { FiltersUserDto, User } from "../../../interfaces/user.interface";
import { columns, users } from "./configs/user-list.table";
import {
  CloseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import PageContainer from "../../../components/page-container/page-container.component";
import { buildDefaultValues } from "../../../validators/validations";
import ButtonCustom from "../../../components/button/button.component";

const configFormSchema: FieldConfig<FiltersUserDto>[] = configForm();
const UserList: React.FC = () => {
  const {
    control,
    formState: { errors },
    reset,
  } = useForm<FiltersUserDto>({
    defaultValues: buildDefaultValues(configFormSchema),
  });
  const [dataSource, setDataSource] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setDataSource(users);
    }, 3000);
  }, []);

  return (
    <PageContainer
      title="Lista de Usuarios"
      icon={<UnorderedListOutlined className="fs-4" />}
      breadcrumb={breadcrumb}
    >
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
      <Row gutter={20} justify={"end"}>
        <Col xs={24} lg={10} xl={5}>
          <ButtonCustom
            htmlType="submit"
            type="primary"
            color="gold"
            variant={"solid"}
            text="Limpiar Filtros"
            icon={<CloseCircleOutlined />}
            iconPosition="start"
            style={{ backgroundColor: "#FF7D00", marginBottom: "15px" }}
            onClick={() => reset()}
            block
          />
        </Col>
        <Col xs={24} lg={10} xl={5}>
          <ButtonCustom
            htmlType="submit"
            type="primary"
            variant={"solid"}
            text="Buscar"
            icon={<SearchOutlined />}
            iconPosition="start"
            block
          />
        </Col>
      </Row>
      <Divider />
      <TableCustom<User>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pageSize={5}
        searchable
        onView={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        showNewButton
        newButtonLabel={
          <span>
            <PlusOutlined /> Añadir nuevo usuario
          </span>
        }
        onNewButtonClick={() => {}}
        showPageSize
      />
    </PageContainer>
  );
};

export default UserList;
