import { Row, Col, Divider } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import ButtonCustom from "../../../../components/button/button.component";

interface EditFormLayoutProps {
  children?: React.ReactNode;
  onReset?: () => void;
  onDelete?: () => void;
  onSubmit?: () => void;
}

const EditFormLayout: React.FC<EditFormLayoutProps> = ({
  children,
  onReset,
  onDelete,
  onSubmit,
}) => {
  return (
    <>
      <Row gutter={20}>
        {/* Columna del icono de usuario */}
        <Col xs={24} md={24} lg={6} className="text-center mb-5">
          <div
            style={{
              fontSize: "100px",
              color: "#1890ff",
              backgroundColor: "#E3F1F8",
              borderRadius: "50%",
              width: "150px",
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <UserAddOutlined />
          </div>
        </Col>

        {/* Columna derecha - formulario dinámico */}
        <Col xs={24} md={24} lg={18}>
          <Row gutter={16}>
            {children}
            <Col span={24}>
              <Divider className="my-0 mb-3" />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Botones */}
      <Row justify="end" gutter={[10, 10]} className="mt-2">
        <Col xs={24} md={10} lg={6} xl={4}>
          <ButtonCustom
            block
            htmlType="button"
            type="primary"
            text="Eliminar Usuario"
            onClick={onDelete}
            className="bg-error-antd"
          />
        </Col>
        <Col xs={24} md={7} lg={5} xl={3}>
          <ButtonCustom
            block
            htmlType="button"
            text="Limpiar"
            type="primary"
            variant="outlined"
            onClick={onReset}
            className="bg-success-info"
          />
        </Col>
        <Col xs={24} md={7} lg={4} xl={3}>
          <ButtonCustom
            block
            htmlType="submit"
            type="primary"
            variant="solid"
            text="Guardar"
            onClick={onSubmit}
          />
        </Col>
      </Row>
    </>
  );
};

export default EditFormLayout;
