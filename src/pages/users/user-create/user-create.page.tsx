import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select, Steps, Typography, Divider, Card } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  ProfileOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import type { FieldConfig } from "../../../interfaces/components.interface";
import type { CreateUserDto } from "../../../interfaces/user.interface";
import { configForm } from "./configs/user-create.config";
import { generateZodSchema } from "../../../validators/validations";

const { Step } = Steps;
const { Title } = Typography;
const { Option } = Select;

const configFormSchema: FieldConfig<CreateUserDto>[] = configForm();
const userSchema = generateZodSchema<CreateUserDto>(configFormSchema);

const CrearUsuario: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const onNext = async () => {
    try {
      await form.validateFields();
      setCurrent(current + 1);
    } catch (err) {
      console.log("Errores en formulario:", err);
    }
  };

  return (
    <div style={{ background: "#fff", padding: 10, borderRadius: 8 }}>
      <Title level={1} className='text-primary-antd'>
        <UserOutlined style={{ marginRight: 8 }} />
        Crear Usuarios
      </Title>
      <Divider />
      {/* Steps */}
      <Steps current={current} style={{ marginBottom: 32 }}>
        <Step title="Detalle" icon={<UserOutlined />} />
        <Step title="Contraseña" icon={<LockOutlined />} />
        <Step title="Perfil de Trabajo" icon={<ProfileOutlined />} />
      </Steps>
      <Divider />
      {/* Formulario primer paso */}
      {current === 0 && (
        <>
          <Title level={4}>Añada Detalles de Nuevo Usuario</Title>
          <Form
            form={form}
            layout="vertical"
            name="crear-usuario"
            style={{ marginTop: 24 }}
          >
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item
                  name="nombre"
                  label="Nombre"
                  rules={[{ required: true, message: "Ingrese el nombre" }]}
                >
                  <Input placeholder="Placeholder" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="apellido"
                  label="Apellido"
                  rules={[{ required: true, message: "Ingrese el apellido" }]}
                >
                  <Input placeholder="Placeholder" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="usuario"
                  label="Nombre de Usuario"
                  rules={[{ required: true, message: "Ingrese el usuario" }]}
                >
                  <Input placeholder="Placeholder" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Ingrese el email" },
                    { type: "email", message: "Formato no válido" },
                  ]}
                >
                  <Input placeholder="Placeholder" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="dui"
                  label="DUI"
                  rules={[{ required: true, message: "Ingrese el DUI" }]}
                >
                  <Input placeholder="Placeholder" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="rol"
                  label="Rol"
                  rules={[{ required: true, message: "Seleccione un rol" }]}
                >
                  <Select placeholder="Placeholder">
                    <Option value="admin">Admin</Option>
                    <Option value="user">Usuario</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item
                  name="sucursal"
                  label="Sucursal"
                  rules={[{ required: true, message: "Seleccione una sucursal" }]}
                >
                  <Select placeholder="Placeholder">
                    <Option value="central">Sucursal Central</Option>
                    <Option value="norte">Sucursal Norte</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="estado"
                  label="Estado"
                  rules={[{ required: true, message: "Seleccione un estado" }]}
                >
                  <Select placeholder="Placeholder">
                    <Option value="activo">Activo</Option>
                    <Option value="inactivo">Inactivo</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row justify="end">
              <Col>
                <Button
                  type="primary"
                  onClick={onNext}
                  icon={<ArrowRightOutlined />}
                >
                  Siguiente
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </div>
  );
};

export default CrearUsuario;