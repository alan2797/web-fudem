import { Row, Divider, Col, Form, Tooltip, Button } from "antd";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FormField } from "../../../components/form-field/form-field.component";
import type { FilterEditUserDto } from "../../../interfaces/user.interface";
import {
  CalendarOutlined,
  LockOutlined,
  PlusOutlined,
  SearchOutlined,
  UnlockOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import PageContainer from "../../../components/page-container/page-container.component";
import { buildDefaultValues } from "../../../validators/validations";
import ButtonCustom from "../../../components/button/button.component";
import { TableCustom } from "../../../components/table/table-custom.component";
import {
  breadcrumb,
  configFormFilter,
  dataMock,
} from "./configs/patient-search.config";
import { columns } from "./configs/patient-search.table";
import { useApis } from "./hooks/use-apis";
import { useEffect, useState } from "react";
import type { PatientSearchDto, PatientSearchFilterDto } from "../../../interfaces/patient.interface";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../utils/constants";

const PatientSearch: React.FC = () => {
  const configFormSchema: FieldConfig<PatientSearchFilterDto>[] = configFormFilter();
  const [dataSource, setDataSource] = useState<PatientSearchDto[] | undefined>(
    undefined
  );
  const { getAllSearchPatientsHook, activePatientHook, deletePatientHook } = useApis();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<PatientSearchFilterDto>({
    defaultValues: buildDefaultValues(configFormSchema),
  });

 useEffect(() => {
    getAllPatientsSearch({});
  }, []);

  const onSubmit: SubmitHandler<PatientSearchFilterDto> = async (data) => {
    await getAllPatientsSearch(data);
  };

  const getAllPatientsSearch = async (filter: PatientSearchFilterDto) => {
    console.log(filter);
    console.log("buscar paciente");
    setDataSource(undefined);
    const response = await getAllSearchPatientsHook(filter);

    if (response?.success) {
      setDataSource(response.data ?? []);
    } else {
      setDataSource([]);
      console.error("Error al obtener pacientes:", response?.message);
    }
  }

  const activePatient =  async (data: any) => {
    console.log(data);
    const response = await activePatientHook(data);
    if (response?.success) {
        reset();
      getAllPatientsSearch({});
    }
  }

  const deletePatient =  async (data: any) => {
    console.log(data);
    const response = await deletePatientHook(data);
    if (response?.success) {
        reset();
      getAllPatientsSearch({});
    }
  }

  return (
    <PageContainer
      title="Busqueda de Expediente"
      icon={<UserSwitchOutlined className="fs-4" />}
      breadcrumb={breadcrumb}
    >
      <Divider></Divider>
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
        <Row justify="space-between" align="middle" gutter={[20, 20]} wrap>
          {/* Columna izquierda con los dos botones */}
          <Col flex="auto">
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
                    fontWeight: "bold",
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
          <Col>
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
        dataSource={dataSource}
        rowKey="id"
        pageSize={5}
        extraActions={(item: PatientSearchDto) => {
            return (
                <>
                    <Tooltip title={item.isActive ? "Desactivar" : "Activar"}>
                        <Button
                            danger={!item.isActive}
                            type="text"
                            icon={item.isActive ? (<UnlockOutlined />) : (<LockOutlined  />)}
                            onClick={() => activePatient(item.expedientNumber)}
                        />
                    </Tooltip>
                </>
            )
        }}
        
        onDelete={(item: PatientSearchDto) => deletePatient(item.expedientNumber)}
        onEdit={() => navigate(RoutePaths.USERS_EDIT)}
        showPageSize
      />
    </PageContainer>
  );
};

export default PatientSearch;
