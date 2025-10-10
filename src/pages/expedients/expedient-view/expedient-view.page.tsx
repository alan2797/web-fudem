import { UserAddOutlined } from "@ant-design/icons";
import PageContainer from "../../../components/page-container/page-container.component";
import {Col, Divider, Form, Row } from "antd";
import { configForm } from "./configs/expedient-view.config";
import type { CreateExpedientPatientDto } from "../../../interfaces/user.interface";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { buildDefaultValues } from "../../../validators/validations";
import { useForm } from "react-hook-form";
import { FormField } from "../../../components/form-field/form-field.component";

const configFormSchema: FieldConfig<CreateExpedientPatientDto>[] = configForm();
const ExpedientPatient: React.FC = () => {
    const {
        control,
        // setValue,
        formState: { errors },
    } = useForm<CreateExpedientPatientDto>({
        defaultValues: buildDefaultValues(configFormSchema),
    });

/* 
    useEffect(()=>{
        let data = {
            medicalRecord: "adsad",
            recordDate: "12/15/2544"
        }
        // O puedes iterar sobre el objeto
        Object.entries(data).forEach(([key, value]) => {
            setValue(key, value);
        });
        
    },[]) */


  return (
   <PageContainer
      title="Información del Paciente"
      icon={<UserAddOutlined className="fs-2" />}
    >
      <Divider />

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

    </PageContainer>
    )
};

export default ExpedientPatient;
