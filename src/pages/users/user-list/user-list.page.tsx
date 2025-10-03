
import React, { useState } from 'react';
import { Select, Input, Card, Row, Divider, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { Column, FieldConfig, FilterColumn, Pagination } from '../../../interfaces/components.interface';
import GenericTable from '../../../components/generic-table/generic-table.component';
import { useForm } from 'react-hook-form';
import { configForm } from './user-list.config';
import { FormField } from '../../../components/form-field/form-field.component';
import type { FiltersUserDto } from '../../../interfaces/user.interface';

const { Option } = Select;
const { Search } = Input;

// Datos de ejemplo
const mockData = [
  {
    id: 1,
    usuario: 'MROJAS',
    nombre: 'Rojas Martínez Miguel Ángel',
    rol: 'Técnicos de Soporte',
    sucursal: 'Merilot',
    pais: 'El Salvador'
  },
  {
    id: 2,
    usuario: 'LVALDEZ',
    nombre: 'Valdez López Laura Carolina',
    rol: 'Asesora de Óptica',
    sucursal: 'Valle Dulce',
    pais: 'El Salvador'
  },
];
const configFormSchema: FieldConfig<FiltersUserDto>[] = configForm();
const UserList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    pageSize: 10,
    totalItems: mockData.length
  });

  // Definir columnas
  const columns: Column[] = [
    { 
      key: 'usuario', 
      label: 'Usuario', 
      sortable: true,
      width: 120
    },
    { 
      key: 'nombre', 
      label: 'Nombre Completo', 
      sortable: true 
    },
    { 
      key: 'rol', 
      label: 'Rol', 
      sortable: true,
      width: 200
    },
    { 
      key: 'sucursal', 
      label: 'Sucursal', 
      sortable: true,
      width: 150
    },
    { 
      key: 'pais', 
      label: 'País', 
      sortable: true,
      width: 150
    }
  ];

  // Definir filtros
  const filters: FilterColumn[] = [
    {
      key: 'rol-filter',
      content: (
        <div>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>Rol</div>
          <Select
            style={{ width: '100%' }}
            placeholder="Todos los roles"
            allowClear
          >
            <Option value="soporte">Técnicos de Soporte</Option>
            <Option value="optica">Asesora de Óptica</Option>
            <Option value="calero">Calero</Option>
          </Select>
        </div>
      )
    },
    {
      key: 'sucursal-filter',
      content: (
        <div>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>Sucursal</div>
          <Select
            style={{ width: '100%' }}
            placeholder="Todas las sucursales"
            allowClear
          >
            <Option value="merilot">Merilot</Option>
            <Option value="valle-dulce">Valle Dulce</Option>
            <Option value="metrocentro">Metrocentro</Option>
          </Select>
        </div>
      )
    },
    {
      key: 'search-filter',
      span: 8,
      content: (
        <div>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>Buscar</div>
          <Search
            placeholder="Buscar usuario..."
            enterButton={<SearchOutlined />}
            onSearch={(value) => console.log('Buscar:', value)}
          />
        </div>
      )
    }
  ];

  // Handlers
  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prev => ({ 
      ...prev, 
      currentPage: page,
      pageSize: pageSize || prev.pageSize
    }));
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    console.log('Ordenar por:', key, direction);
  };
  const {
      control,
      formState: { errors},
    } = useForm<FiltersUserDto>({
      defaultValues: configFormSchema.reduce(
        (acc, field) => ({ ...acc, [field.key]: field.valueInitial }),
        {} as FiltersUserDto
      ),
    });
  return (

    <Card title="Lista de Usuarios" style={{ margin: 16 }}>
      <Row gutter={30}>
          {configFormSchema.map((field) => (
            <Col className="mb-1" key={String(field.key)} xs={field.xs}>
              <FormField
                fieldConfig={field}
                control={control}
                error={errors[field.key]?.message as string}
              />
            </Col>
          ))}
      </Row>
    <Divider />
      <GenericTable
        data={mockData}
        columns={columns}
        filters={filters}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSort={handleSort}
        loading={loading}
        scroll={{ x: 800 }}
      />
    </Card>
  );
};

export default UserList;