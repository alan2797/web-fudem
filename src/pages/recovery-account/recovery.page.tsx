import React from "react";
import { Row, Col, Card, theme, Divider } from "antd";
// import { Link } from "react-router-dom";
import { UserDeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import { type SubmitHandler } from "react-hook-form";

// import { configForm } from "./login.config";
// import { generateZodSchema } from "../../validators/validations";
// import type { LoginRequestDto } from "../../interfaces/login.interface";
// import { useNavigate } from "react-router-dom";
const RecoveryAccount: React.FC = () => {
  const { token } = theme.useToken();
//   const navigate = useNavigate();
/* 
  const onSubmit: SubmitHandler<LoginRequestDto> = async () => {

    navigate("/login/step")
  }; */

  return (
    <Row className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: token.colorPrimary }} >
      <Col xs={24} lg={10} className="d-flex justify-content-center">
        <Card className="w-100" style={{ maxWidth: 410, borderRadius: 24 }} bodyStyle={{ padding: '2rem' }}>
            <div className="d-flex justify-content-center mb-4">
                <img
                src="/src/assets/images/login/logo-lg.png"
                alt="Logo"
                height={40}
                />
            </div>
            <div className="d-flex justify-content-center mb-2">
                <div
                    className=" rounded-circle d-flex justify-content-center align-items-center p-4"
                    style={{backgroundColor: "#E3F2FD" }}
                >
                    <UserDeleteOutlined size={40} className="text-primary fs-1" />
                </div>
            </div>
            <Row className="mb-4">
                <Col xs="12">
                    <h3 className="text-center text-dark mb-2 fw-bolder">
                    ¿No puedes ingresar?
                    </h3>
                    <p className="text-center text-dark">
                    Elige una de las siguientes opciones para poder entrar
                    </p>
                </Col>
            </Row>
            <Row>
            <div className="d-flex align-items-start">
                <div className="me-3 align-self-center">
                <UserDeleteOutlined className="text-primary fs-1" />
                </div>
                <div>
                <h6 className="fw-bolder text-primary m-0">
                    Olvidé mi usuario
                </h6>
                <p
                    className="small lh-1 text-dark m-0"
                >
                    Le ayudaremos a recuperar su usuario de manera rápida y
                    segura para que pueda ingresar a su cuenta.
                </p>
                <Link
                    to="/forgot-username"
                    className="text-info text-decoration-underline fs-6"
                >
                    Recuperar mi usuario
                </Link>
                </div>
            </div>
            <div>
                <Divider style={{borderColor: token.colorPrimary}} />
            </div>
            </Row>
            <Row>
            <div className="d-flex align-items-start">
                <div className="me-3 align-self-center">
                <UserDeleteOutlined className="text-primary fs-1" />
                </div>
                <div>
                <h6 className="fw-bolder text-primary m-0">
                    Olvidé mi usuario
                </h6>
                <p
                    className="small lh-1 text-dark m-0"
                >
                    Le ayudaremos a recuperar su usuario de manera rápida y
                    segura para que pueda ingresar a su cuenta.
                </p>
                <Link
                    to="/forgot-username"
                    className="text-info text-decoration-underline fs-6"
                >
                    Recuperar mi usuario
                </Link>
                </div>
            </div>
            <div>
                <hr
                className=" border-bottom-primary border-2 border-transparent"
                />
            </div>
            </Row>
            <Row>
            <div className="d-flex align-items-start">
                <div className="me-3 align-self-center">
                <UserDeleteOutlined className="text-primary fs-1" />
                </div>
                <div>
                <h6 className="fw-bolder text-primary m-0">
                    Olvidé mi usuario
                </h6>
                <p
                    className="small lh-1 text-dark m-0"
                >
                    Le ayudaremos a recuperar su usuario de manera rápida y
                    segura para que pueda ingresar a su cuenta.
                </p>
                <Link
                    to="/forgot-username"
                    className="text-info text-decoration-underline fs-6"
                >
                    Recuperar mi usuario
                </Link>
                </div>
            </div>
            <div>
                <hr
                className=" border-bottom-primary border-2 border-transparent"
                />
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
