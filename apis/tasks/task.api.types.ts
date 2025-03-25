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