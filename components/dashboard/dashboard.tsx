"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";
import DateTimePicker from "../datetime/datetime-picker";

const Dashboard = () => {
    const [tasks, setTasks] = useState([
        {
            id: 10,
            name: "Task 10",
            status: "Completed",
            priority: "High",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
        },
    ]);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // Dialog states
    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const [priority, setPriority] = useState("Medium");

    const handleAddTask = () => {
        if (taskName.trim()) {
            setTasks([
                ...tasks,
                {
                    id: tasks.length + 1,
                    name: taskName,
                    startDate: startDate || new Date(),
                    endDate: endDate || new Date(),
                    description,
                    status,
                    priority,
                },
            ]);
            // Reset form
            setTaskName("");
            setStartDate(undefined);
            setEndDate(undefined);
            setDescription("");
            setStatus("Pending");
            setPriority("Medium");
            setOpen(false);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        return (
            (filterStatus === "All" || task.status === filterStatus) &&
            task.name.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-white dark:bg-neutral-900 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 overflow-scroll">
            <div className="flex gap-2">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer">Add Task</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Create a new Task</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-2">
                            <div className="grid gap-2">
                                <Label>Task Name</Label>
                                <Input
                                    value={taskName}
                                    onChange={(e) =>
                                        setTaskName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <DateTimePicker
                                    label="Start Date"
                                    date={startDate}
                                    setDate={setStartDate}
                                />
                            </div>
                            <div className="grid gap-2">
                                <DateTimePicker
                                    label="End Date"
                                    date={endDate}
                                    setDate={setEndDate}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select
                                    onValueChange={setStatus}
                                    value={status}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="Completed">
                                            Completed
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Priority</Label>
                                <Select
                                    onValueChange={setPriority}
                                    value={priority}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="High">
                                            High
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddTask}>Add</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Input
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select onValueChange={setFilterStatus} value={filterStatus}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                {filteredTasks.map((task) => (
                    <div
                        key={task.id}
                        className="flex justify-between items-center p-3 rounded-lg bg-gray-100 dark:bg-neutral-800"
                    >
                        <div className="flex flex-col">
                            <span className="font-medium">{task.name}</span>
                            <span className="text-sm text-muted-foreground">
                                {task.description}
                            </span>
                            {task.startDate && task.endDate && (
                                <span className="text-xs text-muted-foreground">
                                    {format(task.startDate, "PPP")} -{" "}
                                    {format(task.endDate, "PPP")}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span
                                className={`px-2 py-1 rounded text-sm ${
                                    task.status === "Completed"
                                        ? "bg-green-500 text-white"
                                        : "bg-yellow-500 text-black"
                                }`}
                            >
                                {task.status}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {task.priority}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
