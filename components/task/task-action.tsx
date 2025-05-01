import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import dayjs from "dayjs";
import { useTaskMutation } from "@/hooks/use-task";
import {
    CreateTaskRequestData,
    ResultTaskCreate,
    ResultTaskDelete,
    ResultTaskUpdate,
    TaskPriority,
    TaskStatus,
    UpdateTaskRequestData,
} from "@/apis/tasks/task.api.types";
import { createTaskApi, updateTaskApi } from "@/apis/tasks/task.api";
import TaskEdit from "./task-edit";
import _ from "lodash";

const TaskAction = ({
    action,
    taskId,
    buttonAction,
    defaultTaskName,
    defaultStartDate,
    defaultEndDate,
    defaultDescription,
    defaultStatus,
    defaultPriority,
}: {
    action: "add" | "edit";
    taskId?: string;
    buttonAction?: React.ReactNode;
    defaultTaskName?: string;
    defaultStartDate?: Date;
    defaultEndDate?: Date;
    defaultDescription?: string;
    defaultStatus: TaskStatus;
    defaultPriority: TaskPriority;
}) => {
    // States
    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [startDate, setStartDate] = useState<Date | undefined>(
        dayjs().toDate()
    );
    const [endDate, setEndDate] = useState<Date | undefined>(dayjs().toDate());
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [priority, setPriority] = useState("low");

    // Effects
    const createMutate = useTaskMutation<
        CreateTaskRequestData,
        ResultTaskCreate
    >(createTaskApi);
    const updateMutate = useTaskMutation<
        UpdateTaskRequestData,
        ResultTaskUpdate
    >(updateTaskApi);

    const onAddTask = () => {
        const data: CreateTaskRequestData = {
            title: taskName,
            startDate: startDate?.toISOString() || dayjs().toISOString(),
            dueDate: endDate?.toISOString(),
            description,
            status: (status.toUpperCase() as TaskStatus) || "PENDING",
            priority: (priority.toUpperCase() as TaskPriority) || "LOW",
        };
        console.log(`data`, data);
        createMutate.mutate(data);
        setOpen(false);
        setTaskName("");
        setDescription("");
        setStartDate(dayjs().toDate());
        setEndDate(dayjs().toDate());
        setStatus("pending");
        setPriority("low");
    };
    const updateTask = () => {
        const data: UpdateTaskRequestData = {
            taskId: taskId || "",
            title: taskName,
            startDate: startDate?.toISOString() || dayjs().toISOString(),
            dueDate: endDate?.toISOString(),
            description,
            status: (status.toUpperCase() as TaskStatus) || "PENDING",
            priority: (priority.toUpperCase() as TaskPriority) || "LOW",
        };
        updateMutate.mutate(data);
        setOpen(false);
    };

    const onActionTask = action === "add" ? onAddTask : updateTask;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{buttonAction}</DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {action === "add" ? "Add Task" : "Edit Task"}
                    </DialogTitle>
                </DialogHeader>
                <TaskEdit
                    taskName={taskName || defaultTaskName}
                    onSetTaskName={setTaskName}
                    startDate={startDate || defaultStartDate}
                    onSetStartDate={setStartDate}
                    endDate={endDate || defaultEndDate}
                    onSetEndDate={setEndDate}
                    description={description || defaultDescription}
                    onSetDescription={setDescription}
                    status={_.toLower(status) || _.toLower(defaultStatus)}
                    onSetStatus={setStatus}
                    priority={_.toLower(priority) || _.toLower(defaultPriority)}
                    onSetPriority={setPriority}
                />
                <DialogFooter>
                    <Button onClick={onActionTask}>
                        {action === "add" ? "Add" : "Update"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TaskAction;
