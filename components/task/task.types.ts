import { FormEvent } from "react";

export type TaskInforType = {
    id: string;
    name: string;
    description?: string;
    status: string;
    startDate: string;
    dueDate?: string;
    priority: string;
};

export type TaskEditType = {
    onShowTaskEdit: (show: boolean) => void;
    onSubmited?: (e: FormEvent<HTMLFormElement>) => void;
    name?: string;
    description?: string;
    status?: string;
    startDate?: string;
    dueDate?: string;
    priority?: string;
};
