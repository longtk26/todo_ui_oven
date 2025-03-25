import { apiClient, Result } from "..";
import { TaskResponseData } from "./task.api.types";

export const getListTaskApi = async (accessToken: string): Promise<Result<TaskResponseData[]>> => {
    try {
        const response = await apiClient.get("/task", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return { success: true, data: response.data };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}