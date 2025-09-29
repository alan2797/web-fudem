import { ShoppingOutlined, ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import StepLayout from "./step-layout.component"

export interface Branch {
  id: number
  name: string
}

interface StepBranchProps {
  onNext: () => void
  onBack: () => void
  setBranch: (branch: Branch) => void
  branch?: Branch | null
}

const StepBranch: React.FC<StepBranchProps> = ({ onNext, onBack, setBranch, branch }) => {
  const branches: Branch[] = [
    { id: 1, name: "Zacatoluca" },
    { id: 2, name: "Valle Dulce" },
    { id: 3, name: "Merliot" },
  ]

  return (
    <StepLayout
      imgSrc="/src/assets/svg/logo-sm.svg"
      title="¿A qué sucursal desea entrar?"
      items={branches}
      renderItem={(data) => (
        <Button
          type={branch?.id === data.id ? "primary" : "default"}
          block
          size="large"
          variant={branch?.id !== data.id ? 'outlined' : 'solid'}
          className="fw-bolder"
          color="primary"
          style={{
            borderRadius: 16,
            fontSize: 22,
            marginBottom: 8,
            transition: 'all 0.3s ease',
            padding: 22
          }}
          onClick={() => setBranch(data)}
          icon={<ShoppingOutlined />}
        >
          {data.name}
        </Button>
      )}
      onBack={onBack}
      onNext={onNext}
      disableNext={!branch?.id}
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
  )
}

export default StepBranch
