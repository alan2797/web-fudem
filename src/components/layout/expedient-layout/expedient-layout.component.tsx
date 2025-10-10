import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { theme } from "antd";
import ExpedientSidebar from "./expedient-sidebar.component";
import ExpedientHeaderBar from "./expedient-header.component";

const { Content } = Layout;

const ExpedientLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
    <ExpedientHeaderBar collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)} />
      <Layout>
      <ExpedientSidebar collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)} />
        <Content className="main-content-layout" style={{ minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ExpedientLayout;
