import React, { useState } from "react";
import { Row, Col, Card, theme, Button, Form, Input } from "antd";
import { CheckOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BloquedUser: React.FC = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [mostrarConfirm, setMostrarConfirm] = useState(false);

  return (
    <Row
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: token.colorPrimary }}
    >
      <Col xs={24} lg={10} className="d-flex justify-content-center">
        <Card
          className="w-100"
          style={{ maxWidth: 410, borderRadius: 24 }}
          styles={{ body: { padding: "2rem" } }}
        >
          <div className="d-flex justify-content-center mt-2 mb-5">
            <img
              src="/src/assets/images/login/logo-lg.png"
              alt="Logo"
              height={40}
            />
          </div>
          {!mostrarConfirm ? (
            <>
              <div className="d-flex justify-content-center mb-4">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center p-3"
                  style={{ backgroundColor: "#e3f1f8" }}
                >
                  <LockOutlined size={40} className="main-text fs-1" />
                </div>
              </div>
              <Row className="mb-4">
                <Col xs="12">
                  <h5 className="text-center mb-2 fw-bolder">
                    Su usuario esta bloqueado
                  </h5>
                  <p className="text-center text-dark">
                    Digite su correo electrónico y usuario para poder
                    desbloquear su usuario
                  </p>
                </Col>
              </Row>
              <Row>
                <Form layout="vertical">
                  <Row>
                    <Col span={24}>
                      <Form.Item label="Ingrese su usuario" name="text">
                        <Input size="large" placeholder="ej. juliana.med" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Ingrese su correo" name="email">
                        <Input
                          size="large"
                          placeholder="ej. juliana@fudem.com"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Row gutter={10}>
                      <Col span={12}>
                        <Button
                          size="large"
                          type="primary"
                          htmlType="submit"
                          block
                          onClick={() => setMostrarConfirm(true)}
                        >
                          Validar
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button
                          className="main-text fw-bold"
                          style={{ borderWidth: "2px" }}
                          size="large"
                          ghost
                          htmlType="button"
                          type="primary"
                          block
                          onClick={() => navigate("/recovery-account")}
                        >
                          Regresar
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </Row>
            </>
          ) : (
            <Row>
              <Row className="mb-3" justify="center" align="middle">
                <Col
                  className=" d-flex mb-4 justify-content-center align-items-center rounded-circle"
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "3px solid #00C473",
                  }}
                >
                  <CheckOutlined
                    size={30}
                    className="fs-4"
                    style={{ color: "#00C473" }}
                  />
                </Col>
                <Col xs="12">
                  <p className="text-center fs-6">
                    <span className="fw-bold">
                      Su información ha sido validado,
                    </span>{" "}
                    se ha enviado una contraseña temporal, por favor revise su
                    correo
                  </p>
                </Col>
              </Row>
              <Button
                className="fw-bolder"
                size="large"
                htmlType="button"
                type="primary"
                block
                onClick={() => {
                  navigate("/login");
                }}
              >
                Regresar
              </Button>
            </Row>
          )}
        </Card>
      </Col>
      <Col
        xs={0}
        lg={14}
        className="d-none d-lg-flex justify-content-end align-items-center"
      >
        <img
          src="/src/assets/images/login/image1.png"
          alt="Imagen lateral"
          className="img-fluid"
          style={{ objectFit: "cover", width: "85%" }}
        />
      </Col>
    </Row>
  );
};

export default BloquedUser;
