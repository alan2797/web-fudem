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
  onFinish: () => void;
}

const StepPosition: React.FC<StepPositionProps> = ({ onBack, onFinish, setPosition, position }) => {
  const positions: Position[] = [
    { id: 1, name: 'Caja 1' },
    { id: 2, name: 'Caja 2' },
    { id: 3, name: 'Caja 3' }
  ];

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
      onNext={onFinish}
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
