import { ShoppingOutlined, ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import StepLayout from "./step-layout.component"
import type { BranchDto } from "../../../interfaces/branch.interface"


interface StepBranchProps {
  onNext: () => void
  setBranch: (branch: BranchDto) => void
  branch?: BranchDto | null
  branchList?: BranchDto[]
}

const StepBranch: React.FC<StepBranchProps> = ({ onNext, setBranch, branch, branchList }) => {
  const branches: BranchDto[] | undefined = branchList ?? []

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
      onNext={onNext}
      disableNext={!branch?.id}
      nextLabel={
        <>
          Ingresar <ArrowRightOutlined style={{ marginLeft: 8 }} />
        </>
      }
    />
  )
}

export default StepBranch
