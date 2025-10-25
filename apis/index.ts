import { config } from "@/configs/config";
import { createApiClient } from "./zod";
import axios, { AxiosError } from "axios";
import cookies from "js-cookie";

const getApiClient = async () => {
    const token = cookies.get("accessToken");
    if (!token) {
        return;
    }

    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    console.log("axiosInstance", axiosInstance);

    return createApiClient(config.serverUrl, { axiosInstance });
};

export const apiClient =
    (await getApiClient()) || createApiClient(config.serverUrl);

export type Result<T> =
    | { success: true; data: T }
    | { success: false; error: string };

export const handleApiError = <T>(error: AxiosError): Result<T> => {
    if (axios.isAxiosError(error)) {
        const data: unknown = error.response?.data;

        if (typeof data === "object" && data !== null && "cause" in data) {
            const cause = (data as { cause: unknown }).cause;

            if (typeof cause === "string") {
                return { success: false, error: cause };
            }

            if (
                typeof cause === "object" &&
                cause !== null &&
                "message" in cause
            ) {
                const message = (cause as { message: unknown }).message;
                if (Array.isArray(message)) {
                    return { success: false, error: message.join(", ") };
                }
            }
        }
    }

    return {
        success: false,
        error: "Unknown error",
    };
};
