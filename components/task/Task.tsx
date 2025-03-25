import { TaskInforType } from "./task.types";

const Task = ({
    name,
    description,
    status,
    startDate,
    dueDate,
    priority,
}: TaskInforType) => {
    return (
        <div className="px-4 py-5 sm:px-6 bg-white border border-gray-200">
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
                    Status: <span className="text-green-600">{status}</span>
                </p>
                <p className="text-sm font-medium text-gray-500">
                    Priority: <span className="text-green-600">{priority}</span>
                </p>
                <div className="flex space-x-2">
                    <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Edit
                    </a>
                    <a
                        href="#"
                        className="font-medium text-green-600 hover:text-green-500"
                    >
                        Done
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Task;
