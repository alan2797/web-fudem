
export interface ChangePasswordRequestDto extends Record<string, unknown>{
    newPassword?: string;
    confirmPassword?: string;    
}