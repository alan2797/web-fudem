import React, { useEffect, useState } from "react";
import { Row, Divider, Col, Form } from "antd";
import type {
  ApiResponse,
  FieldConfig,
} from "../../../interfaces/components.interface";
import { useForm, type SubmitHandler } from "react-hook-form";
import { breadcrumb, configFormUser } from "./configs/user-list.config";
import { FormField } from "../../../components/form-field/form-field.component";
import { TableCustom } from "../../../components/table/table-custom.component";
import type {
  FiltersUserDto,
  UserListDto,
  UserListResponseDto,
} from "../../../interfaces/user.interface";
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
import { handleRequestAxios } from "../../../utils/handle-request-axios";
import { getAllUsersService } from "../../../services/user";
import { handleRequestThunk } from "../../../utils/handle-request-thunk";
import {
  getCountries,
  getBranches,
} from "../../../redux/features/catalogs.slice";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../utils/constants";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const catalogs = useSelector((state: RootState) => state.catalogs);
  const configFormSchema: FieldConfig<FiltersUserDto>[] = configFormUser(catalogs);
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<FiltersUserDto>({
    defaultValues: buildDefaultValues(configFormSchema),
  });

  const [dataSource, setDataSource] = useState<UserListDto[] | undefined>(
    undefined
  );

  const onSubmit: SubmitHandler<FiltersUserDto> = async (
    data: FiltersUserDto
  ) => {
    getAllUsers(data);
  };

  useEffect(() => {
    getAllBranches();
    getAllCountries();
    getAllUsers({});
  }, []);

  const getAllBranches = async () => {
    await handleRequestThunk(dispatch, () => dispatch(getBranches()).unwrap(), {showSpinner: false});
  };

  const getAllCountries = async () => {
    await handleRequestThunk(dispatch, () => dispatch(getCountries()).unwrap(), {showSpinner: false});
  };

  const getAllUsers = async (data: FiltersUserDto) => {
    setDataSource(undefined);
    const result: ApiResponse<UserListResponseDto> | null =
      await handleRequestAxios(dispatch, () => getAllUsersService(data), {showSpinner: false});
    console.log(result);
    if (result?.success) {
      setDataSource(result?.data?.users);
    }else{
      setDataSource([]);
    }
  };

  return (
    <PageContainer
      title="Lista de Usuarios"
      icon={<UnorderedListOutlined className="fs-4" />}
      breadcrumb={breadcrumb}
    >
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
        <Row gutter={20} justify={"end"}>
          <Col xs={24} lg={10} xl={5}>
            <ButtonCustom
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
        selectable
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pageSize={5}
        searchable
        showNewButton
        newButtonLabel={
          <span>
            <PlusOutlined /> Añadir nuevo usuario
          </span>
        }
        onNewButtonClick={() => {navigate(RoutePaths.USERS_CREATE)}}
        showPageSize
      />
    </PageContainer>
  );
};

export default UserList;
