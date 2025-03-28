import { config } from "@/configs/config";
import { createApiClient } from "./zod";
import axios, { AxiosError } from "axios";

export const apiClient = createApiClient(config.serverUrl);

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
