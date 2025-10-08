import { Row, Divider, Col, Typography, Form, Button } from "antd";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { useForm } from "react-hook-form";
import type { CreateUserDto } from "../../../interfaces/user.interface";
import { FileAddOutlined } from "@ant-design/icons";
import PageContainer from "../../../components/page-container/page-container.component";
import {
  generateZodSchema,
  buildDefaultValues,
} from "../../../validators/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/form-field/form-field.component";
import ButtonCustom from "../../../components/button/button.component";

//Step1
// const configFormSchema: FieldConfig<CreateUserDto>[] = configForm();
// const userSchema = generateZodSchema<CreateUserDto>(configFormSchema);

const { Title } = Typography;

const ExpedientPatient: React.FC = () => {
 /*  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: zodResolver(userSchema),
    defaultValues: buildDefaultValues(configFormSchema),
  }); */

  const onSubmit = () => {
    console.log("Enviando... patient Create Page")
  } 
  return (
    <PageContainer
      title="Nuevo Paciente"
      icon={<FileAddOutlined className="fs-4" />}
    //   breadcrumb={breadcrumb}
    >
        <h1>Expediente</h1>
    </PageContainer>
  );
};

export default ExpedientPatient;
