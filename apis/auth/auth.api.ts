import { apiClient, handleApiError, Result } from "..";
import {
    AuthRegisterApiTypes,
    AuthUserResponseData,
    VerifyEmailResponseData,
    VerifyEmailTokenResponseData,
} from "./auth.api.types";
import { AxiosError } from "axios";

export const loginApi = async (
    email: string,
    password: string
): Promise<Result<AuthUserResponseData>> => {
    try {
        console.log(
            `calling loginApi with email: ${email} and password: ${password}`
        );
        const response = await apiClient.post("/user/sign-in", {
            email,
            password,
        });

        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error as AxiosError);
    }
};

export const registerApi = async (
    registerInfo: AuthRegisterApiTypes
): Promise<Result<AuthUserResponseData>> => {
    try {
        const response = await apiClient.post("/user/sign-up", registerInfo);

        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error as AxiosError);
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
        return handleApiError(error as AxiosError);
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
        return handleApiError(error as AxiosError);
    }
};
