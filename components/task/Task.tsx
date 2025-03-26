import { FormEvent, useState } from "react";
import { TaskInforType } from "./task.types";
import TaskEdit from "./TaskEdit";
import cookies from "js-cookie";
import { updateTaskApi } from "@/apis/tasks/task.api";
import { TaskPriority, TaskStatus } from "@/apis/tasks/task.api.types";
import { useRouter } from "next/navigation";

const StatusColor: { [key: string]: string } = {
    PENDING: "text-yellow-600",
    DONE: "text-green-600",
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
}: TaskInforType) => {
    const [showTaskEdit, setShowTaskEdit] = useState(false);
    const router = useRouter();

    const submitUpdateTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitUpdateTask");
        const formData = new FormData(e.currentTarget);
        const accessToken = cookies.get("accessToken");

        if (!accessToken) {
            return;
        }

        const data = {
            title: formData.get("name") as string,
            description: formData.get("description") as string,
            status: formData.get("status")?.toString().toUpperCase() as TaskStatus,
            startDate: formData.get("startDate") as string,
            dueDate: formData.get("dueDate") as string,
            priority: formData.get("priority")?.toString().toUpperCase() as TaskPriority,
        };

        await updateTaskApi(accessToken, id, data);
        router.push("/")
        return;
    };

    return (
        <>
            <div className="px-4 py-5 sm:px-6 bg-white border border-gray-200 rounded-2xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {name}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {description}
                    </p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {/* Date */}
                        {startDate} - {dueDate}
                    </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
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
                        <button className="font-medium text-green-600 hover:text-green-500 cursor-pointer">
                            Done
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
                    startDate={startDate}
                    dueDate={dueDate}
                    priority={priority}
                />
            )}
        </>
    );
};

export default Task;
