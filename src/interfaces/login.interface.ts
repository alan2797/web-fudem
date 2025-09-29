export interface LoginRequestDto extends Record<string, unknown> {
    username?: string;
    password?: string;
}