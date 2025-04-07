import { Result } from "..";

export type TaskResponseData = {
    id: string;
    title: string;
    description?: string;
    status: string;
    startDate: string;
    dueDate?: string;
    priority: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

export type UpdateTaskResponseData = {
    id: string;
};

export type DeleteTaskResponseData = {
    id: string;
};

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type UpdateTaskRequestData = {
    taskId: string;
    title?: string;
    description?: string;
    status?: TaskStatus;
    startDate?: string;
    dueDate?: string;
    priority?: TaskPriority;
};

export type CreateTaskRequestData = {
    title: string;
    description?: string;
    status?: TaskStatus;
    startDate: string;
    dueDate?: string;
    priority: TaskPriority;
};

export type ResultTaskDelete = Result<DeleteTaskResponseData>;
export type ResultTaskCreate = Result<TaskResponseData>;
export type ResultTaskUpdate = Result<UpdateTaskResponseData>;
