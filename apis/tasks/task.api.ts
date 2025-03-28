import { AxiosError } from "axios";
import { apiClient, handleApiError, Result } from "..";
import {
    CreateTaskRequestData,
    DeleteTaskResponseData,
    TaskResponseData,
    UpdateTaskRequestData,
    UpdateTaskResponseData,
} from "./task.api.types";

export const getListTaskApi = async (
    accessToken: string
): Promise<Result<TaskResponseData[]>> => {
    try {
        const response = await apiClient.get("/task", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error as AxiosError);
    }
};

export const updateTaskApi = async (
    accessToken: string,
    taskId: string,
    data: UpdateTaskRequestData
): Promise<Result<UpdateTaskResponseData>> => {
    try {
        const response = await apiClient.patch("/task/:taskId", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                taskId,
            },
        });

        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error as AxiosError);
    }
};

export const createTaskApi = async (
    accessToken: string,
    data: CreateTaskRequestData
): Promise<Result<TaskResponseData>> => {
    try {
        const response = await apiClient.post("/task", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error as AxiosError);
    }
};

export const deleteTaskApi = async (
    accessToken: string,
    taskId: string
): Promise<Result<DeleteTaskResponseData>> => {
    try {
        const response = await apiClient.delete("/task/:taskId", undefined, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                taskId,
            },
        });

        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error as AxiosError);
    }
};
