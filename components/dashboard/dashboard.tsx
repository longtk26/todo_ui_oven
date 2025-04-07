"use client";
import { useState } from "react";

import DashboardHeader from "./dashboard-header";
import TaskDetail from "../task/task-detail";
import TaskRow from "../task/task-row";
import { useTaskMutation, useTaskQuery } from "@/hooks/use-task";
import { deleteTaskApi } from "@/apis/tasks/task.api";
import { ResultTaskDelete } from "@/apis/tasks/task.api.types";

const Dashboard = () => {
    const { tasks, isLoading } = useTaskQuery();
    const [selectedTask, setSelectedTask] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [checkedTasks, setCheckedTasks] = useState<string[]>([]);
    const deleteMutate = useTaskMutation<string, ResultTaskDelete>(
        deleteTaskApi
    );

    const toggleCheck = (id: string) => {
        setCheckedTasks((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const onDeleteTask = (id: string) => {
        deleteMutate.mutate(id);
    };

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center p-4 bg-white dark:bg-neutral-900 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-white dark:bg-neutral-900 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 overflow-scroll">
            <DashboardHeader />

            <div className="flex flex-col gap-2">
                <TaskDetail
                    detailOpen={detailOpen}
                    setDetailOpen={setDetailOpen}
                    selectedTask={selectedTask}
                />

                <div className="overflow-x-auto rounded-lg border border-neutral-300 dark:border-neutral-700">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-gray-100 dark:bg-neutral-800">
                            <tr>
                                <th className="w-10 p-2"></th>
                                <th className="text-left p-2">Task Name</th>
                                <th className="text-left p-2">Status</th>
                                <th className="text-left p-2">Priority</th>
                                <th className="w-10 p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => {
                                const isChecked = checkedTasks.includes(
                                    task.id
                                );
                                return (
                                    <TaskRow
                                        key={task.id}
                                        task={task}
                                        isChecked={isChecked}
                                        toggleCheck={toggleCheck}
                                        handleDeleteTask={onDeleteTask}
                                        setDetailOpen={setDetailOpen}
                                        setSelectedTask={setSelectedTask}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
