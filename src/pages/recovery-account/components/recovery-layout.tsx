import React from "react";
import { Card, Row, Col } from "antd";

interface RecoveryLayoutProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}

const RecoveryLayout: React.FC<RecoveryLayoutProps> = ({ icon, title, subtitle, children }) => {
  return (
    <Card
      className="w-100"
      style={{ maxWidth: 441, borderRadius: 24 }}
      styles={{ body: { padding: "2rem" } }}
    >
      {/* Logo */}
      <div className="d-flex justify-content-center mt-2 mb-5">
        <img
          src="/src/assets/images/login/logo-lg.png"
          alt="Logo"
          height={40}
        />
      </div>

      {/* Icono central */}
      {icon && (
        <div className="d-flex justify-content-center mb-4">
          <div
            className="rounded-circle d-flex justify-content-center align-items-center p-3"
            style={{ backgroundColor: "#e3f1f8" }}
          >
            {icon}
          </div>
        </div>
      )}

      {/* Título y subtítulo */}
      <Row className="mb-4">
        <Col xs={24}>
          {/* Si el title es string, lo envuelvo en <h5>, si no lo renderizo tal cual */}
            {typeof title === "string" ? (
            <h5 className="text-center mb-2 fw-bolder">{title}</h5>
            ) : (
            title
            )}

            {/* Igual para subtitle */}
            {subtitle &&
            (typeof subtitle === "string" ? (
                <p className="text-center">{subtitle}</p>
            ) : (
                subtitle
            ))}
        </Col>
      </Row>

      {/* Contenido dinámico */}
      {children}
    </Card>
  );
};

export default RecoveryLayout;
