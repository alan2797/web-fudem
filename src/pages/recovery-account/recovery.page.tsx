import React from "react";
import { Row, Col, Card, theme, Divider } from "antd";
import { KeyOutlined, LockOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const RecoveryAccount: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Row className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: token.colorPrimary }} >
      <Col xs={24} lg={10} className="d-flex justify-content-center">
        <Card className="w-100" style={{ maxWidth: 441, borderRadius: 24 }} styles={{ body: { padding: "2rem" }}} >
            <div className="d-flex justify-content-center mt-2 mb-5">
                <img
                src="/src/assets/images/login/logo-lg.png"
                alt="Logo"
                height={40}
                />
            </div>
            <div className="d-flex justify-content-center mb-4">
                <div
                    className=" rounded-circle d-flex justify-content-center align-items-center p-3"
                    style={{backgroundColor: "#e3f1f8" }}
                >
                    <UserDeleteOutlined size={40} className="main-text fs-1" />
                </div>
            </div>
            <Row className="mb-4">
                <Col xs="12">
                    <h5 className="text-center mb-2 fw-bolder">
                    ¿No puedes ingresar?
                    </h5    >
                    <p className="text-center">
                    Elige una de las siguientes opciones para poder entrar
                    </p>
                </Col>
            </Row>
            <Row>
            <div className="d-flex align-items-start">
                <div className="me-3 align-self-center">
                <UserDeleteOutlined className="main-text fs-1" />
                </div>
                <div>
                <h6 className="fw-bolder main-text m-0">
                    Olvidé mi usuario
                </h6>
                <p
                    className="small lh-1 m-0 my-1"
                >
                    Le ayudaremos a recuperar su usuario de manera rápida y
                    segura para que pueda ingresar a su cuenta.
                </p>
                <Link
                    to="/forgot-username"
                    className="main-link"
                >
                    Recuperar mi usuario
                </Link>
                </div>
            </div>
            <div className="w-100">
                <Divider className="my-3 border-color-primary"></Divider>
            </div>
            </Row>
            <Row>
            <div className="d-flex align-items-start">
                <div className="me-3 align-self-center">
                <LockOutlined className="main-text fs-1" />
                </div>
                <div>
                <h6 className="fw-bolder main-text m-0">
                    Mi usuario está bloqueado
                </h6>
                <p
                    className="small lh-1 m-0 my-1"
                >
                    Al restablecer su contraseña se desbloqueará su usario automáticamente.
                </p>
                <Link
                    to="/bloqued-user"
                    className="main-link"
                >
                    Desbloquear usuario
                </Link>
                </div>
            </div>
            <div className="w-100">
                <Divider className="border-color-primary"></Divider>
            </div>
            </Row>
            <Row>
            <div className="d-flex align-items-start">
                <div className="me-3 align-self-center">
                <KeyOutlined  className="main-text fs-1" />
                </div>
                <div>
                <h6 className="fw-bolder main-text m-0">
                    Olvidé mi contraseña
                </h6>
                <p
                    className="small lh-1 m-0 my-1"
                >
                    Le ayudaremos a recuperar su contraseña de manera rápida y
                    segura para que pueda ingresar a su cuenta.
                </p>
                <Link
                    to="/forgot-password"
                    className="main-link"
                >
                    Recuperar contraseña
                </Link>
                </div>
            </div>
            </Row>
        </Card>
      </Col>
      <Col xs={0} lg={14} className="d-none d-lg-flex justify-content-end align-items-center">
        <img
          src="/src/assets/images/login/image1.png"
          alt="Imagen lateral"
          className="img-fluid"
          style={{ objectFit: "cover", width: "85%" }}
        />
      </Col>
    </Row>
  )
};
  

export default RecoveryAccount;
