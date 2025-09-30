import { Button } from 'antd';
import { ArrowRightOutlined, RollbackOutlined, ShopOutlined } from '@ant-design/icons';
import StepLayout from './step-layout.component';

export interface Position {
  id: number;
  name: string;
}

interface StepPositionProps {
  position: Position | null;
  setPosition: (pos: Position) => void;
  onBack: () => void;
  handleNext: () => void;
  positionList: Position[];
}

const StepPosition: React.FC<StepPositionProps> = ({ onBack, handleNext, setPosition, position, positionList }) => {
  const positions: Position[] = positionList;

  return (
    <StepLayout
      imgSrc="/src/assets/svg/logo-sm.svg"
      title="¿A qué puesto desea entrar?"
      items={positions}
      renderItem={(data) => (
        <Button
        className='fw-bolder'
          type={position?.id !== data.id ? 'default' : 'primary'}
          block
          variant={position?.id !== data.id ? 'outlined' : 'solid'}
          color="primary"
          style={{
            borderRadius: 16,
            fontSize: 22,
            marginBottom: 8,
            transition: 'all 0.3s ease',
            padding: 22
          }}
          onClick={() => setPosition(data)}
          icon={<ShopOutlined />}
        >
          {data.name}
        </Button>
      )}
      onBack={onBack}
      onNext={handleNext}
      disableNext={!position?.id}
      backLabel={
        <>
          Regresar <RollbackOutlined style={{ marginLeft: 8 }} />
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

export default StepPosition;
