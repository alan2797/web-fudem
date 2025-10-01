import React from "react";
import { Row, Col, theme } from "antd";
import {
  KeyOutlined,
  LockOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import RecoveryLayout from "./components/recovery-layout";
import RecoveryOption from "./components/recovery-option";

const RecoveryAccount: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Row
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: token.colorPrimary }}
    >
      <Col xs={24} lg={10} className="d-flex justify-content-center">
        <RecoveryLayout
          icon={<UserDeleteOutlined className="main-text fs-2" />}
          title="¿No puedes ingresar?"
          subtitle="Elige una de las siguientes opciones para poder entrar"
        >
          <Row>
            <RecoveryOption
              icon={<UserDeleteOutlined className="main-text fs-2" />}
              title="Olvidé mi usuario"
              description="Le ayudaremos a recuperar su usuario de manera rápida y segura para que pueda ingresar a su cuenta."
              linkText="Recuperar mi usuario"
              linkTo="/forgot-username"
            />
          </Row>

          <Row>
            <RecoveryOption
              icon={<LockOutlined className="main-text fs-2" />}
              title="Mi usuario está bloqueado"
              description="Al restablecer su contraseña se desbloqueará su usuario automáticamente."
              linkText="Desbloquear usuario"
              linkTo="/blocked-user"
            />
          </Row>

          <Row>
            <RecoveryOption
              icon={<KeyOutlined className="main-text fs-2" />}
              title="Olvidé mi contraseña"
              description="Le ayudaremos a recuperar su contraseña de manera rápida y segura para que pueda ingresar a su cuenta."
              linkText="Recuperar contraseña"
              linkTo="/forgot-password"
              showDivider={false}
            />
          </Row>
        </RecoveryLayout>
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

export default RecoveryAccount;
