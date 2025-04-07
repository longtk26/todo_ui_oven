import { PlusIcon } from "lucide-react";
import DateTimePicker from "../datetime/datetime-picker";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import TaskOption from "./task-option";
import { optionForPriority, optionForStatus } from "./task.data";

const TaskEdit = ({
    taskName,
    onSetTaskName,
    startDate,
    onSetStartDate,
    endDate,
    onSetEndDate,
    description,
    onSetDescription,
    status,
    onSetStatus,
    priority,
    onSetPriority,
}: {
    taskName?: string;
    onSetTaskName: (name: string) => void;
    startDate?: Date | undefined;
    onSetStartDate: (date: Date | undefined) => void;
    endDate?: Date | undefined;
    onSetEndDate: (date: Date | undefined) => void;
    description?: string;
    onSetDescription: (description: string) => void;
    status: string;
    onSetStatus: (status: string) => void;
    priority: string;
    onSetPriority: (priority: string) => void;
}) => {
    return (
        <div className="grid gap-4 py-2">
            <div className="grid gap-2">
                <Label>Task Name</Label>
                <Input
                    value={taskName}
                    onChange={(e) => onSetTaskName(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <DateTimePicker
                    label="Start Date"
                    date={startDate}
                    setDate={onSetStartDate}
                />
            </div>
            <div className="grid gap-2">
                <DateTimePicker
                    label="End Date"
                    date={endDate}
                    setDate={onSetEndDate}
                />
            </div>
            <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                    value={description}
                    onChange={(e) => onSetDescription(e.target.value)}
                />
            </div>
            <TaskOption
                value={status}
                label="Status"
                listOptions={optionForStatus}
                onChange={onSetStatus}
            />
            <TaskOption
                value={priority}
                label="Priority"
                listOptions={optionForPriority}
                onChange={onSetPriority}
            />
        </div>
    );
};

export default TaskEdit;
