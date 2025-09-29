
import { Button } from 'antd';
import { ArrowRightOutlined, ShopOutlined } from '@ant-design/icons';
import StepLayout from './step-layout.component';

export interface Profile {
  id: number;
  name: string;
}

interface StepProfileProps {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  onNext: () => void;
}

const StepProfile: React.FC<StepProfileProps> = ({ onNext, setProfile, profile }) => {
  const profiles: Profile[] = [
    { id: 1, name: 'Técnico de Consultas' },
    { id: 2, name: 'Técnico de Citas' },
    { id: 3, name: 'Citas' }
  ];

  const handleProfileSelect = (p: Profile) => {
    setProfile(p);
  };

  return (
    <StepLayout
      imgSrc="/src/assets/svg/logo-sm.svg"
      title="¿A qué perfil desea entrar?"
      items={profiles}
      renderItem={(data) => (
        <Button
        className='fw-bolder'
          type={profile?.id !== data.id ? 'primary' : 'primary'}
          block
          color="primary"
          variant={profile?.id !== data.id ? 'outlined' : 'solid'}
          style={{
            borderRadius: 16,
            fontSize: 22,
            marginBottom: 8,
            transition: 'all 0.3s ease',
            padding: 22
          }}
          onClick={() => handleProfileSelect(data)}
          icon={<ShopOutlined />}
        >
          {data.name}
        </Button>
      )}
      onNext={onNext}
      disableNext={!profile?.id}
      nextLabel={
        <>
          Ingresar <ArrowRightOutlined style={{ marginLeft: 8 }} />
        </>
      }
    />
  );
};

export default StepProfile;
