import React from "react";
import { Modal } from "antd";
import type { ConfirmModalProps } from "../../interfaces/components.interface";


export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title = "Confirmar",
  content = "¿Estás seguro?",
  onConfirm,
  onCancel,
  okText = "Aceptar",
  cancelText = "Cancelar",
  ...modalProps
}) => {
  return (
    <Modal
      {...modalProps}
      visible={visible}
      title={title}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      centered
      maskClosable={false}
    >
      {content}
    </Modal>
  );
};
