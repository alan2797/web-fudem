// PageContainer.tsx
import { Typography, Breadcrumb, Tabs } from "antd";
import type { PageContainerProps } from "../../interfaces/components.interface";
const PageContainer = ({ title, icon, breadcrumb,tabs, children }: PageContainerProps) => {
  return (
    <div style={{ padding: "0px" }}>
      {breadcrumb && breadcrumb.length > 0 && (
        <Breadcrumb style={{ marginBottom: "25px" }}>
          {breadcrumb.map((item, index) => (
            <Breadcrumb.Item key={index}>
              {item.path ? <a href={item.path}>{item.label}</a> : item.label}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

        <div className={`page-container ${""}`} style={{ padding: 0 }}>
        <div
            className="page-header text-primary-antd"
            style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            lineHeight: 1,
            marginBottom: 16, // espacio opcional entre header y contenido
            }}
        >
            {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
            <Typography.Title
            level={4}
            style={{
                margin: 0,
                fontWeight: 400,
                lineHeight: 1,
            }}
            className="text-primary-antd fs-3 ms-2"
            >
            {title}
            </Typography.Title>
        </div>
           {tabs && tabs.items.length > 0 && (
              <Tabs
                defaultActiveKey={tabs.defaultActiveKey}
                onChange={tabs.onChange}
                items={tabs.items.map((tab) => ({
                  key: tab.key,
                  label: (
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {tab.icon && tab.icon}
                      {tab.label}
                    </span>
                  ),
                  children: tab.children,
                }))}
                style={{ marginBottom: 16 }}
              />
            )}
        <div className="page-content" style={{ padding: 0 }}>
            {children}
        </div>
        </div>
    </div>
  );
};

export default PageContainer;
