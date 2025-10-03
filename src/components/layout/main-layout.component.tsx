import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { theme } from "antd";
import Sidebar from "./sidebar.component";
import HeaderBar from "./header-bar.component";

const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)} />
      <Layout>
        <Content style={{ margin: "16px 16px 16px 0px", padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
