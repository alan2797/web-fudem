import React, { useEffect, useState } from "react";
import { Row, Divider, Col, Form } from "antd";
import type { ApiResponse, FieldConfig } from "../../../interfaces/components.interface";
import { useForm, type SubmitHandler } from "react-hook-form";
import { breadcrumb, configFormUser } from "./configs/user-list.config";
import { FormField } from "../../../components/form-field/form-field.component";
import { TableCustom } from "../../../components/table/table-custom.component";
import type { FiltersUserDto, UserListDto, UserListResponseDto } from "../../../interfaces/user.interface";
import { columns } from "./configs/user-list.table";
import {
  CloseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import PageContainer from "../../../components/page-container/page-container.component";
import { buildDefaultValues } from "../../../validators/validations";
import ButtonCustom from "../../../components/button/button.component";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { getInitialUserCatalogs } from "../../../redux/features/catalogs.slice";
import { handleRequestAxios } from "../../../utils/handle-request-axios";
import { getAllUsersService } from "../../../services/user";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const catalogs = useSelector((state: RootState) => state.catalogs);
  const configFormSchema: FieldConfig<FiltersUserDto>[] = configFormUser(catalogs);

  const {
    control,
    formState: { errors },
    reset,
  } = useForm<FiltersUserDto>({
    defaultValues: buildDefaultValues(configFormSchema),
  });

  const [dataSource, setDataSource] = useState<UserListDto[] | undefined>(undefined);

  useEffect(() => {
    dispatch(getInitialUserCatalogs());
    getAllUsers({});
  }, [dispatch]);

  const onSubmit: SubmitHandler<FiltersUserDto> = async (data: FiltersUserDto) => {
    getAllUsers(data);
  };

  const getAllUsers = async (data: FiltersUserDto) => {
    const result: ApiResponse<UserListResponseDto> | null = await handleRequestAxios(dispatch, () => getAllUsersService(data), {
      showSpinner: true,
      showMessageApi: true
    });
    console.log(result);
    if(result?.success){
      setDataSource(result?.data?.users);
    }
  }


  return (
    <PageContainer
      title="Lista de Usuarios"
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
      </Form>
      
      <Divider />
      <TableCustom<UserListDto>
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
