import { apiClient, Result } from "..";
import {
    AuthRegisterApiTypes,
    AuthUserResponseData,
    VerifyEmailResponseData,
    VerifyEmailTokenResponseData,
} from "./auth.api.types";

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

export const verifyEmail = async (
    accessToken: string
): Promise<Result<VerifyEmailResponseData>> => {
    try {
        const response = await apiClient.post("/user/verify", undefined, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

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

export const verifyTokenEmail = async (
    token?: string
): Promise<Result<VerifyEmailTokenResponseData>> => {
    try {
        if (!token)
            return {
                success: false,
                error: "Missing token verify",
            };

        const response = await apiClient.get("/user/verify-email", {
            queries: {
                token,
            },
        });

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
