"use client";

import { createTaskApi, getListTaskApi } from "@/apis/tasks/task.api";
import {
    TaskPriority,
    TaskResponseData,
    TaskStatus,
} from "@/apis/tasks/task.api.types";
import Task from "@/components/task/Task";
import TaskEdit from "@/components/task/TaskEdit";
import { FormEvent, useEffect, useState } from "react";
import cookies from "js-cookie";

const TaskContainer = () => {
    const [showTaskEdit, setShowTaskEdit] = useState(false);
    const [tasks, setTasks] = useState<TaskResponseData[]>([]);

    useEffect(() => {
        // fetch tasks
        const fetchTasks = async () => {
            const accessToken = cookies.get("accessToken");
            if (!accessToken) {
                return;
            }
            const result = await getListTaskApi(accessToken);
            if (result.success) {
                setTasks(result.data);
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const accessToken = cookies.get("accessToken");
        if (!accessToken) {
            return;
        }

        const data = {
            title: formData.get("name") as string,
            description: formData.get("description") as string,
            status: formData
                .get("status")
                ?.toString()
                .toUpperCase() as TaskStatus,
            startDate: formData.get("startDate") as string,
            dueDate: formData.get("dueDate") as string,
            priority: formData
                .get("priority")
                ?.toString()
                .toUpperCase() as TaskPriority,
        };

        // call api to create task
        const result = await createTaskApi(accessToken, data);
    };

    return (
        <>
            <div className="flex flex-col items-center w-full max-w-[620px] mb-4">
                <div className="text-center mt-4">
                    <h1 className="text-3xl font-bold">Tasks</h1>
                </div>
                <button
                    onClick={() => setShowTaskEdit(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer self-end"
                >
                    Add Task
                </button>
            </div>
            <section className="h-[500px] overflow-scroll overflow-x-hidden">
                <div className="w-full max-w-3xl space-y-4 flex flex-col px-6">
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            id={task.id}
                            name={task.title}
                            description={task.description}
                            status={task.status}
                            startDate={task.startDate}
                            dueDate={task.dueDate}
                            priority={task.priority}
                        />
                    ))}
                </div>
            </section>
            {showTaskEdit && (
                <TaskEdit
                    onShowTaskEdit={setShowTaskEdit}
                    onSubmited={handleAddTask}
                />
            )}
        </>
    );
};

export default TaskContainer;
