import {
    ArrowRightOutlined,
    ArrowLeftOutlined,
    ShoppingOutlined,
  } from "@ant-design/icons";
  import { Button } from "antd";
import StepLayout from "./step-layout.component";
  
  export interface Department {
    id: number;
    name: string;
  }
  
  interface StepDepartmentProps {
    onNext: () => void;
    onBack: () => void;
    setDepartment: (department: Department) => void;
    department?: Department  | null;
  }
  
  const StepDepartment: React.FC<StepDepartmentProps> = ({
    onNext,
    onBack,
    setDepartment,
    department,
  }) => {
    const departments: Department[] = [
      { id: 1, name: "Caja" },
      { id: 2, name: "Óptica" },
      { id: 3, name: "Toma de Datos" },
    ];
  
    return (
      <StepLayout<Department>
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
  