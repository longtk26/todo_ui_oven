import { getListTaskApi } from "@/apis/tasks/task.api";
import { TaskInforType } from "@/components/task/task.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTaskQuery = (): {
    tasks: TaskInforType[];
    isLoading: boolean;
    isError: boolean;
    error: unknown;
} => {
    const query = useQuery({
        queryKey: ["tasks"],
        queryFn: getListTaskApi,
    });
    let tasks: TaskInforType[] = [];

    if (query.data && query.data.success) {
        tasks = query.data.data;
    }

    return {
        tasks,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    };
};

export const useTaskMutation = <T, R>(mutationFn: (data: T) => Promise<R>) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    return mutation;
};
