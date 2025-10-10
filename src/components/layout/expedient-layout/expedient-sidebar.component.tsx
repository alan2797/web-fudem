// components/layout/Sidebar.jsx
import { Col, Divider, Form, Layout, Menu, Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { ExpedientMenuItems } from "./expedient-menu-items";
import { logout } from "../../../redux/features/auth.slice";
import { useForm } from "react-hook-form";
import type { CreateExpedientPatientDto } from "../../../interfaces/user.interface";
import { configFormExpedient, configFormExpedientFooter } from "./configs/expedient.config";
import type { FieldConfig } from "../../../interfaces/components.interface";
import { buildDefaultValues } from '../../../validators/validations';
import { FormField } from "../../form-field/form-field.component";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}
const configFormSchema: FieldConfig<CreateExpedientPatientDto>[] = configFormExpedient();
const configFormFooterSchema: FieldConfig<CreateExpedientPatientDto>[] = configFormExpedientFooter();
const ExpedientSidebar = ({ collapsed}: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
   const {
        control,
        formState: { errors },
    } = useForm<CreateExpedientPatientDto>({
        defaultValues: buildDefaultValues(configFormSchema),
    });
    const {
        control: controlFooter,
        formState: { errors:errorFooter },
    } = useForm<CreateExpedientPatientDto>({
        defaultValues: buildDefaultValues(configFormFooterSchema),
    });
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={400}
      className="bg-white custom-sider sidebar-content-layout"
      style={{borderRadius: "8px" }}
    >
      <style>
        {`
            .custom-sider .ant-menu-item-divider {
                border-top: 2px solid #00000015;
                margin: 8px 15px
            }
            .ant-layout-sider-collapsed .ant-menu-item-group-title {
                display: none !important;
                opacity: 0 !important;
                padding: 0 !important;
                height: 0 !important;
            }
            .collapsible-section {
              overflow: hidden;
              transition: all 0.3s ease;
              opacity: 1;
              max-height: 800px;
            }
            .collapsible-section.collapsed {
              opacity: 0;
              max-height: 0;
              padding: 0;
              margin: 0;
            }
            `}
      </style>
      {/* HEADER DEL SIDER: logo a la izquierda + hamburguesa a la derecha */}
           <div
        style={{
          margin: "12px 12px 0 12px",
          padding: collapsed ? "0px" : "16px"
        }}
        className={`collapsible-section ${collapsed ? "collapsed" : ""}`}
      >
      {!collapsed && (
        <Row gutter={10}>
          <Col xs={24}>
              <Form>
              <Row gutter={4}>
                   {configFormSchema.map((field) => (
                        <Col
                        className="mb-0"
                        key={String(field.key)}
                        xs={field.xs}
                        md={field.md}
                        >
                        {field.type === "divider" ? (
                            <Divider className="my-0 mb-2"/>
                        ) : (
                            <FormField
                            fieldConfig={field}
                            control={controlFooter}
                            error={errorFooter[field.key]?.message as string}
                            />
                        )}
                        </Col>
                    ))}
              </Row>
              </Form>
          </Col>
        </Row>
      )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={ExpedientMenuItems}
        onClick={({ key }) =>{ 
          if(key == '/logout'){
            dispatch(logout());
            navigate("/login");
            return;
          }
          navigate(key)}}
      />
      {!collapsed && (
      <Row gutter={5} style={{
          margin: "0px 12px 0 12px",
          padding: "0px 0px 16px 16px"
        }}
        className={`collapsible-section ${collapsed ? "collapsed" : ""}`}
        >
        <Col xs={24}>
            <Form>
            <Row gutter={10}>
                  {configFormFooterSchema.map((field) => (
                      <Col
                      className="mb-0"
                      key={String(field.key)}
                      xs={field.xs}
                      md={field.md}
                      >
                      {field.type === "divider" ? (
                          <Divider className="my-0 mb-2"/>
                      ) : (
                          <FormField
                          fieldConfig={field}
                          control={control}
                          error={errors[field.key]?.message as string}
                          />
                      )}
                      </Col>
                  ))}
            </Row>
            </Form>
        </Col>
      </Row>
      )}
    </Sider>
  );
};

export default ExpedientSidebar;
