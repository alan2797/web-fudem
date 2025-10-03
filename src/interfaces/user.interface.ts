export interface FiltersUserDto extends Record<string, unknown> {
    rol: string;
    sucursal: string;
    pais: string
}  
export interface User {
    id: number;
    username: string;
    name: string;
    role: string;
    branch: string;
    country: string;
    status: string;
}
export interface CreateUserDto extends Record <string,unknown> {
    nombre: string;
    apellido: string;
    usuario: string;
    email: string;
    dui: string;
    rol: string;
    sucursal: string;
    estado: string;
}