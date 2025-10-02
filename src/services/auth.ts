import type { BlockedUsernameRequestDto, ChangePasswordRequestDto, ForgotPasswordReponse, ForgotPasswordRequestDto, ForgotUsernameRequestDto, LoginRequestDto } from "../interfaces/login.interface";
import api from "./api";

export const authService = async (data: LoginRequestDto) => {
    const res = await api.post("/auth/login", data);
    return res;
};

export const recoveryUsernameService = async (data: ForgotUsernameRequestDto) => {
    const res = await api.post("/users/recovery/username", data);
    return res;
};

export const blockedUsernameService = async (data: BlockedUsernameRequestDto) => {
    const res = await api.post("/users/recovery/unlock", data);
    return res;
};

export const forgotPasswordService = async (data: ForgotPasswordRequestDto) => {
    const res = await api.post("/users/recovery/password", data);
    return res;
};

export const changePasswordTempService = async (data: ChangePasswordRequestDto) => {
    const res = await api.post("/auth/change-temp-password", data);
    return res;
};