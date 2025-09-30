// components/MainLayout.jsx
import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { logout } from '../../redux/features/auth.slice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG, colorWhite },
  } = theme.useToken();
  
  const dispatch = useDispatch<AppDispatch>();

  const menuItems = [
    {
      key: '/home',
      icon: <HomeOutlined />,
      label: 'Inicio',
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'Usuarios',
    },
    {
      key: '/documents',
      icon: <FileTextOutlined />,
      label: 'Documentos',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Configuración',
    },
  ];

  const handleMenuClick = ({ key }: any) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} 
            style={{backgroundColor: colorWhite, width: "260px", maxWidth: "260px"}}>
        <div className='text-center py-4'>
            {collapsed ? "" :  <img src='src/assets/svg/logo-sm.svg'></img>}
           
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          {/* Botón de logout */}
            <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={() => {
                    dispatch(logout());
                    navigate("/login"); // redirige al login después de cerrar sesión
                }}
                style={{ fontSize: "16px" }}
            />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;