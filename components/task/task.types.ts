import { FormEvent } from "react";

export type TaskInforType = {
    id: string;
    title: string;
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

export type TaskOptionType = {
    label: string;
    value: string;
    listOptions?: {
        value: string;
        name: string;
    }[];
    onChange: (value: string) => void;
};

export type TaskDetialType = {
    detailOpen: boolean;
    setDetailOpen: (open: boolean) => void;
    selectedTask: TaskInforType | null;
};
