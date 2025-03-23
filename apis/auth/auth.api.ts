import { apiClient, Result } from "..";
import { AuthRegisterApiTypes, AuthUserResponseData } from "./auth.api.types";

export const loginApi = async (
    email: string,
    password: string
): Promise<Result<AuthUserResponseData>> => {
    try {
        const response = await apiClient.post("/user/sign-in", {
            email,
            password,
        });

        return { success: true, data: response.data };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

export const registerApi = async (
    registerInfo: AuthRegisterApiTypes
): Promise<Result<AuthUserResponseData>> => {
    try {
        const response = await apiClient.post("/user/sign-up", registerInfo);

        return { success: true, data: response.data };
    } catch (error) {
        console.error(error);
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        return {
            success: false,
            error: errorMessage,
        };
    }
};
