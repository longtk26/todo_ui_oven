import { PenBoxIcon, Trash2Icon } from "lucide-react";
import { TaskInforType } from "./task.types";
import _ from "lodash";
import TaskAction from "./task-action";
import { TaskPriority, TaskStatus } from "@/apis/tasks/task.api.types";
import dayjs from "dayjs";

const TaskRow = ({
    task,
    isChecked,
    toggleCheck,
    handleDeleteTask,
    setDetailOpen,
    setSelectedTask,
}: {
    task: TaskInforType;
    isChecked: boolean;
    toggleCheck: (id: string) => void;
    handleDeleteTask: (id: string) => void;
    setDetailOpen: (open: boolean) => void;
    setSelectedTask: (task: any) => void;
}) => {
    return (
        <tr
            key={task.id}
            className={`border-t border-neutral-200 dark:border-neutral-700 ${
                isChecked ? "line-through opacity-50" : ""
            }`}
        >
            <td className="text-center p-2">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCheck(task.id)}
                />
            </td>
            <td
                className="cursor-pointer p-2 hover:underline"
                onClick={() => {
                    setSelectedTask(task);
                    setDetailOpen(true);
                }}
            >
                {task.title}
            </td>
            <td className="p-2">
                {_.capitalize(task.status).replace(/_/g, " ")}
            </td>
            <td className="p-2">{_.capitalize(task.priority)}</td>
            <td className="text-center p-2 flex gap-2">
                <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                    <Trash2Icon size={16} />
                </button>
                <TaskAction
                    buttonAction={
                        <button
                            onClick={() => {}}
                            className="cursor-pointer hover:text-blue-600"
                        >
                            <PenBoxIcon size={16} />
                        </button>
                    }
                    action="edit"
                    defaultStatus={task.status as TaskStatus}
                    defaultPriority={task.priority as TaskPriority}
                    defaultTaskName={task.title}
                    defaultStartDate={dayjs(task.startDate).toDate()}
                    defaultEndDate={dayjs(task.dueDate).toDate()}
                    defaultDescription={task.description}
                />
            </td>
        </tr>
    );
};

export default TaskRow;
