// components/TableCustom.tsx
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Table,
  Button,
  Input,
  Tooltip,
  Col,
  Row,
  Dropdown,
  Menu,
  Select,
  Skeleton,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import React, { useState, useMemo, useEffect } from "react";
import type { TableCustomProps } from "../../interfaces/components.interface";

export const TableCustom = <T extends { [key: string]: any }>({
  columns,
  dataSource,
  rowKey,
  pageSize = 10,
  searchable = false,
  selectable = false,
  onView,
  onEdit,
  onDelete,
  extraActions,
  showNewButton,
  newButtonLabel,
  onNewButtonClick,
  pageSizeOptions = [5, 10, 20],
  onPageSizeChange,
  showPageSize,
}: TableCustomProps<T>) => {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const isLoading = !dataSource; // cuando dataSource es null o undefined
  const skeletonRows = Array.from({ length: 3 }, (_, i) => ({ id: `skeleton-${i}` })) as unknown as T[];

  const handlePageSizeChange = (current: number, size: number) => {
    setCurrentPageSize(size);
    if (onPageSizeChange) onPageSizeChange(size);
  };

  const filteredData = useMemo(() => {
    if (!searchable || !searchText) return dataSource;

    return dataSource?.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, dataSource, searchable]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Columnas con acciones
  const enhancedColumns: ColumnsType<T> = useMemo(() => {
    const actionColumn = {
      title: "Acciones",
      key: "actions",
      fixed: "right" as const,
      render: (_: any, record: T) => {
        if (!isMobile) {
          return (
            <div style={{ display: "flex", gap: 8 }}>
              {onView && (
                <Tooltip title="Ver">
                  <Button
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={() => onView(record)}
                  />
                </Tooltip>
              )}
              {onEdit && (
                <Tooltip title="Editar">
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(record)}
                  />
                </Tooltip>
              )}
              {onDelete && (
                <Tooltip title="Eliminar">
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => onDelete(record)}
                  />
                </Tooltip>
              )}
              {extraActions && extraActions(record)}
            </div>
          );
        } else {
          const menuItems = [];
          if (onView)
            menuItems.push({
              key: "view",
              label: "Ver",
              onClick: () => onView(record),
            });
          if (onEdit)
            menuItems.push({
              key: "edit",
              label: "Editar",
              onClick: () => onEdit(record),
            });
          if (onDelete)
            menuItems.push({
              key: "delete",
              label: "Eliminar",
              onClick: () => onDelete(record),
            });
          if (extraActions) {
            const extra = extraActions(record);

            // Función auxiliar para convertir cualquier JSX a texto para el menú
            const getLabelFromNode = (node: React.ReactNode): string => {
              if (React.isValidElement(node)) {
                // Si es Tooltip, Button u otro, intentamos obtener props.title
                return (node.props as { title?: string })?.title ?? "Acción";
              }
              if (typeof node === "string") return node;
              return "Acción";
            };

            if (Array.isArray(extra)) {
              extra.forEach((node, i) => {
                menuItems.push({
                  key: `extra-${i}`,
                  label: getLabelFromNode(node),
                  onClick: () => {
                    // Opcional: si quieres ejecutar algo específico en móvil
                    console.log("Extra action clicked", record);
                  },
                });
              });
            } else {
              menuItems.push({
                key: "extra-0",
                label: getLabelFromNode(extra),
                onClick: () => console.log("Extra action clicked", record),
              });
            }
          }
          return (
            <Dropdown
              overlay={<Menu items={menuItems} />}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
          );
        }
      },
    };

    return [...columns, actionColumn];
  }, [columns, onView, onEdit, onDelete, extraActions, isMobile]);

  // Clonar columnas para renderizar Skeleton si está cargando
  const skeletonColumns = enhancedColumns.map(col => ({
    ...col,
    render: (_: any) => (
      <Skeleton.Input active size="small" style={{ width: "100%" }} />
    ),
  }));

  // Configuración de selección de filas
  const rowSelection: TableRowSelection<T> | undefined = selectable
    ? {
        selectedRowKeys,
        onChange: (keys: any) => setSelectedRowKeys(keys),
      }
    : undefined;

  return (
    <div>
      {(searchable || showNewButton || showPageSize) && (
        <Row align="middle" style={{ marginBottom: 16, gap: 8 }}>
          {/* Selector de filas a la izquierda */}
          {showPageSize && (
            <Col xs={24} md={3}>
              <Select
                value={currentPageSize}
                onChange={(value: any) => setCurrentPageSize(value)}
                options={pageSizeOptions.map((item) => {return {label: String(item), value: item}})}
                size="large"
                
                style={{width: "100%"}}
              />
            </Col>
          )}

          {/* Espaciador para separar izquierda y derecha */}
          <Col flex="auto" />

          {/* Búsqueda y botón a la derecha */}
          {(searchable || showNewButton) && (
            <Row align="middle" style={{ gap: 8 }}>
              {searchable && (
                <Col xs={24} md={11}>
                  <Input
                    placeholder="Buscar..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    size="large"
                  />
                </Col>
              )}
              {showNewButton && (
                <Col xs={24} md={12}>
                  <Button
                    type="primary"
                    size="large"
                    onClick={onNewButtonClick}
                    style={{width: "100%"}}
                  >
                    {newButtonLabel || "Registrar Nuevo"}
                  </Button>
                </Col>
              )}
            </Row>
          )}
        </Row>
      )}

      <Table
        rowKey={rowKey}
        columns={isLoading ? skeletonColumns : enhancedColumns}
        dataSource={isLoading ? skeletonRows : filteredData}
        pagination={{
          pageSize: currentPageSize,
          pageSizeOptions: pageSizeOptions.map(String), // Antd requiere string[]
          onShowSizeChange: handlePageSizeChange,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total}`,
          locale: {
            items_per_page: "", // ← cambia el texto que se ve en el dropdown
          },

          position: ["bottomRight"], // 'topLeft', 'bottomLeft', 'bottomRight'
        }}
        scroll={{ x: "max-content" }}
        rowSelection={rowSelection}
      />
    </div>
  );
};
