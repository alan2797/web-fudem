import React, { type ReactNode } from "react";
import { Divider } from "antd";
import { Link } from "react-router-dom";

interface RecoveryOptionProps {
  icon: ReactNode;      // el ícono (UserDeleteOutlined, LockOutlined, etc.)
  title: ReactNode;     // puede ser string o un <h6>
  description: ReactNode; // texto descriptivo
  linkText: string;     // texto del link
  linkTo: string;       // ruta a la que lleva el link
  showDivider?: boolean; // si se muestra el Divider debajo
}

const RecoveryOption: React.FC<RecoveryOptionProps> = ({
  icon,
  title,
  description,
  linkText,
  linkTo,
  showDivider = true,
}) => {
  return (
    <>
      <div className="d-flex align-items-start">
        <div className="me-3 align-self-center">{icon}</div>
        <div>
          {/* Si el título es string lo ponemos en <h6>, sino lo renderizamos tal cual */}
          {typeof title === "string" ? (
            <h6 className="fw-bolder main-text m-0">{title}</h6>
          ) : (
            title
          )}
          {/* Igual para descripción */}
          {typeof description === "string" ? (
            <p className="small lh-1 m-0 my-1">{description}</p>
          ) : (
            description
          )}
          <Link to={linkTo} className="main-link">
            {linkText}
          </Link>
        </div>
      </div>
      {showDivider && (
        <div className="w-100">
          <Divider className="my-3 border-color-primary" />
        </div>
      )}
    </>
  );
};

export default RecoveryOption;
