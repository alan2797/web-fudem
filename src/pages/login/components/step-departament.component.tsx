import {
    ArrowRightOutlined,
    ArrowLeftOutlined,
    ShoppingOutlined,
  } from "@ant-design/icons";
  import { Button } from "antd";
import StepLayout from "./step-layout.component";
import type { DepartmentDto } from "../../../interfaces/area.interface";
  
  interface StepDepartmentProps {
    onNext: () => void;
    onBack: () => void;
    setDepartment: (department: DepartmentDto) => void;
    department?: DepartmentDto  | null;
    departamentList: DepartmentDto[];
  }
  
  const StepDepartment: React.FC<StepDepartmentProps> = ({
    onNext,
    onBack,
    setDepartment,
    department,
    departamentList
  }) => {
    const departments: DepartmentDto[] = departamentList;
  
    return (
      <StepLayout<DepartmentDto>
      imgSrc="/src/assets/svg/logo-sm.svg"
        title="¿A qué área desea entrar?"
        items={departments}
        renderItem={(data) => (
          <Button
            type={department?.id === data.id ? "primary" : "default"}
            className="w-100 fw-bolder"
            color="primary"
            variant={department?.id !== data.id ? 'outlined' : 'solid'}
            style={{
                borderRadius: 16,
                fontSize: 22,
                marginBottom: 8,
                transition: 'all 0.3s ease',
                padding: 22
            }}
            icon={<ShoppingOutlined style={{ fontSize: 20 }} />}
            onClick={() => setDepartment(data)}
          >
            {data.name}
          </Button>
        )}
        onBack={onBack}
        onNext={onNext}
        disableNext={!department?.id}
        backLabel={
          <>
            Regresar <ArrowLeftOutlined style={{ marginLeft: 8 }} />
          </>
        }
        nextLabel={
          <>
            Ingresar <ArrowRightOutlined style={{ marginLeft: 8 }} />
          </>
        }
      />
    );
  };
  
  export default StepDepartment;
  