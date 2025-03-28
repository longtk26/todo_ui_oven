import { FormEvent, useState } from "react";
import { TaskInforType } from "./task.types";
import TaskEdit from "./TaskEdit";
import cookies from "js-cookie";
import { deleteTaskApi, updateTaskApi } from "@/apis/tasks/task.api";
import { TaskPriority, TaskStatus } from "@/apis/tasks/task.api.types";
import {
    changeDatetoDateTimeLocal,
    changeDatetoShowOnUI,
    getUpdateData,
} from "@/utils";
import { toast } from "react-toastify";

const StatusColor: { [key: string]: string } = {
    PENDING: "text-yellow-600",
    COMPLETED: "text-green-600",
    IN_PROGRESS: "text-blue-600",
};

const PriorityColor: { [key: string]: string } = {
    LOW: "text-blue-600",
    MEDIUM: "text-yellow-600",
    HIGH: "text-red-600",
};

const Task = ({
    id,
    name,
    description,
    status,
    startDate,
    dueDate,
    priority,
    onFetchTasks,
}: TaskInforType) => {
    const [showTaskEdit, setShowTaskEdit] = useState(false);

    const submitUpdateTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const accessToken = cookies.get("accessToken");

        if (!accessToken) {
            return;
        }

        const newData = {
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
        const oldData = {
            title: name,
            description,
            status,
            startDate: changeDatetoDateTimeLocal(startDate),
            dueDate: changeDatetoDateTimeLocal(dueDate),
            priority,
        };
        const updateData = getUpdateData(newData, oldData);

        const data = await updateTaskApi(accessToken, id, updateData);
        if (!data.success) {
            toast.error(data.error);
            return;
        }
        onFetchTasks();
        setShowTaskEdit(false);
        return;
    };

    const deleteTask = async () => {
        const accessToken = cookies.get("accessToken");

        if (!accessToken) {
            return;
        }

        const result = await deleteTaskApi(accessToken, id);

        if (!result.success) {
            toast.error(result.error);
            return;
        }
        onFetchTasks();
    };

    return (
        <>
            <div className="px-4 py-5 sm:px-6 bg-white border border-gray-200 rounded-2xl min-w-[300px] md:min-w-[400px] lg:min-w-[600px]">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {name}
                    </h3>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-gray-500">
                    <span className="font-medium">Start date:</span>{" "}
                    {changeDatetoShowOnUI(startDate)}
                </p>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    <span className="font-medium">Due date:</span>{" "}
                    {changeDatetoShowOnUI(dueDate)}
                </p>
                <p className="mt-2 text-sm text-gray-500 italic">
                    Description: {description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">
                        Status:{" "}
                        <span className={`${StatusColor[status]}`}>
                            {status}
                        </span>
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                        Priority:{" "}
                        <span className={`${PriorityColor[priority]}`}>
                            {priority}
                        </span>
                    </p>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setShowTaskEdit(true)}
                            className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                        >
                            Edit
                        </button>
                        <button
                            onClick={deleteTask}
                            className="font-medium text-red-600 hover:text-red-500 cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {showTaskEdit && (
                <TaskEdit
                    onShowTaskEdit={setShowTaskEdit}
                    onSubmited={submitUpdateTask}
                    name={name}
                    description={description}
                    status={status}
                    startDate={changeDatetoDateTimeLocal(startDate)}
                    dueDate={changeDatetoDateTimeLocal(dueDate)}
                    priority={priority}
                />
            )}
        </>
    );
};

export default Task;
