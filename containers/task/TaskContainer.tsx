"use client";

import { getListTaskApi } from "@/apis/tasks/task.api";
import { TaskResponseData } from "@/apis/tasks/task.api.types";
import Task from "@/components/task/Task";
import TaskEdit from "@/components/task/TaskEdit";
import { useEffect, useState } from "react";
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
            console.log(result);
            if (result.success) {
                setTasks(result.data);
            }
        }

        fetchTasks();
    }, []);

    return (
        <>
            <div className="text-center mb-4">
                <h1 className="text-3xl font-bold">Tasks</h1>
            </div>
            <div className="w-full max-w-3xl space-y-4 flex flex-col px-6">
                <button
                    onClick={() => setShowTaskEdit(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end cursor-pointer"
                >
                    Add Task
                </button>
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        name={task.title}
                        description={task.description}
                        status={task.status}
                        startDate={task.startDate}
                        dueDate={task.dueDate}
                        priority={task.priority}
                    />
                ))}
            </div>
            {showTaskEdit && <TaskEdit onShowTaskEdit={setShowTaskEdit} />}
        </>
    );
};

export default TaskContainer;
