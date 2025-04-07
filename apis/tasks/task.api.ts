import { AxiosError } from "axios";
import { apiClient, handleApiError, Result } from "..";
import {
    CreateTaskRequestData,
    DeleteTaskResponseData,
    TaskResponseData,
    UpdateTaskRequestData,
    UpdateTaskResponseData,
} from "./task.api.types";

export const getListTaskApi = async (): Promise<Result<TaskResponseData[]>> => {
    try {
        const response = await apiClient.get("/task");

        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error as AxiosError);
    }
};

export const updateTaskApi = async (
    data: UpdateTaskRequestData
): Promise<Result<UpdateTaskResponseData>> => {
    try {
        const taskId = data.taskId;
        const { taskId: _, ...restData } = data;

        const response = await apiClient.patch("/task/:taskId", restData, {
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
    data: CreateTaskRequestData
): Promise<Result<TaskResponseData>> => {
    try {
        const response = await apiClient.post("/task", data);
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error as AxiosError);
    }
};

export const deleteTaskApi = async (
    taskId: string
): Promise<Result<DeleteTaskResponseData>> => {
    try {
        const response = await apiClient.delete("/task/:taskId", undefined, {
            params: {
                taskId,
            },
        });

        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error as AxiosError);
    }
};
