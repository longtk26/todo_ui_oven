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
}

export type UpdateTaskResponseData = {
    id: string;
}

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type UpdateTaskRequestData = {
    title?: string;
    description?: string;
    status?: TaskStatus;
    startDate?: string;
    dueDate?: string;
    priority?: TaskPriority;
}