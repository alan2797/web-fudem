import type { ColumnsType } from "antd/es/table";
import type { User } from "../../../../interfaces/user.interface";

export const columns: ColumnsType<User> = [
  { title: "Nombre de Usuario", dataIndex: "username", key: "username" },
  { title: "Nombre", dataIndex: "name", key: "name" },
  { title: "Rol", dataIndex: "role", key: "role" },
  { title: "Sucursal", dataIndex: "branch", key: "branch" },
  { title: "País", dataIndex: "country", key: "country" },
  {
    title: "Estado",
    dataIndex: "status",
    key: "status",
    render: (value: string) => (
      <span style={{ color: value === "activo" ? "green" : "red" }}>{value}</span>
    ), // Ejemplo de custom render de celda
  },
];

export const users: User[] = [
    { id: 1, username: "jperez", name: "Juan Pérez", role: "Admin", branch: "Central", country: "Bolivia", status: "inactivo" },
    { id: 2, username: "alopez", name: "Ana López", role: "Vendedor", branch: "Norte", country: "Bolivia", status: "activo" },
    { id: 3, username: "cdiaz", name: "Carlos Díaz", role: "Supervisor", branch: "Sur", country: "Bolivia", status: "activo" },
    { id: 4, username: "jperez", name: "Juan Pérez", role: "Admin", branch: "Central", country: "Bolivia", status: "inactivo" },
    { id: 5, username: "alopez", name: "Ana López", role: "Vendedor", branch: "Norte", country: "Bolivia", status: "activo" },
    { id: 6, username: "cdiaz", name: "Carlos Díaz", role: "Supervisor", branch: "Sur", country: "Bolivia", status: "activo" },
    { id: 7, username: "jperez", name: "Juan Pérez", role: "Admin", branch: "Central", country: "Bolivia", status: "inactivo" },
    { id: 8, username: "alopez", name: "Ana López", role: "Vendedor", branch: "Norte", country: "Bolivia", status: "activo" },
    { id: 9, username: "cdiaz", name: "Carlos Díaz", role: "Supervisor", branch: "Sur", country: "Bolivia", status: "activo" },
    { id: 10, username: "jperez", name: "Juan Pérez", role: "Admin", branch: "Central", country: "Bolivia", status: "inactivo" },
    { id: 11, username: "alopez", name: "Ana López", role: "Vendedor", branch: "Norte", country: "Bolivia", status: "activo" },
    { id: 12, username: "cdiaz", name: "Carlos Díaz", role: "Supervisor", branch: "Sur", country: "Bolivia", status: "activo" },
    { id: 13, username: "jperez", name: "Juan Pérez", role: "Admin", branch: "Central", country: "Bolivia", status: "inactivo" },
    { id: 14, username: "alopez", name: "Ana López", role: "Vendedor", branch: "Norte", country: "Bolivia", status: "activo" },
    { id: 15, username: "cdiaz", name: "Carlos Díaz", role: "Supervisor", branch: "Sur", country: "Bolivia", status: "activo" },
    { id: 16, username: "jperez", name: "Juan Pérez", role: "Admin", branch: "Central", country: "Bolivia", status: "inactivo" },
    { id: 17, username: "alopez", name: "Ana López", role: "Vendedor", branch: "Norte", country: "Bolivia", status: "activo" },
    { id: 18, username: "cdiaz", name: "Carlos Díaz", role: "Supervisor", branch: "Sur", country: "Bolivia", status: "activo" },
    { id: 19, username: "jperez", name: "Juan Pérez", role: "Admin", branch: "Central", country: "Bolivia", status: "inactivo" },
    { id: 20, username: "alopez", name: "Ana López", role: "Vendedor", branch: "Norte", country: "Bolivia", status: "activo" },
    { id: 21, username: "cdiaz", name: "Carlos Díaz", role: "Supervisor", branch: "Sur", country: "Bolivia", status: "activo" },
];