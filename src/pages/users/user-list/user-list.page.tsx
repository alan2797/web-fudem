import React, { useEffect, useState } from "react";
import { Row, Divider, Col } from "antd";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { useForm } from "react-hook-form";
import type { LoginRequestDto } from "../../../interfaces/login.interface";
import { breadcrumb, configForm } from "./configs/user-list.config";
import { FormField } from "../../../components/form-field/form-field.component";
import { TableCustom } from "../../../components/table/table-custom.component";
import type { User } from "../../../interfaces/user.interface";
import { columns, users } from "./configs/user-list.table";
import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import PageContainer from "../../../components/page-container/page-container.component";

const configFormSchema: FieldConfig<LoginRequestDto>[] = configForm();
const UserList: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useForm<LoginRequestDto>({
    defaultValues: configFormSchema.reduce(
      (acc, field) => ({ ...acc, [field.key]: field.valueInitial }),
      {} as LoginRequestDto
    ),
  });
  const [dataSource, setDataSource] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setDataSource(users);
    }, 3000)
  }, [])
  return (
    <PageContainer title="Lista de Usuarios" icon={<UnorderedListOutlined className="fs-4"/>} breadcrumb={breadcrumb}>
      <Row gutter={30}>
        {configFormSchema.map((field) => (
          <Col className="mb-1" key={String(field.key)} xs={field.xs} md={field.md}>
            <FormField
              fieldConfig={field}
              control={control}
              error={errors[field.key]?.message as string}
            />
          </Col>
        ))}
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
        newButtonLabel={<span><PlusOutlined /> Añadir nuevo usuario</span>}
        onNewButtonClick={() => {}}
        showPageSize
      />
      </PageContainer>
    
  );
};

export default UserList;
