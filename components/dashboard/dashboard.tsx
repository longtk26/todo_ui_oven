"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const Dashboard = () => {
    const [tasks, setTasks] = useState([
        { id: 10, name: "Task 10", status: "Completed" },
    ]);
    const [taskName, setTaskName] = useState("");
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const addTask = () => {
        if (taskName.trim()) {
            setTasks([
                ...tasks,
                { id: tasks.length + 1, name: taskName, status: "Pending" },
            ]);
            setTaskName("");
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
            {/* Tạo task */}
            <div className="flex gap-2">
                <Input
                    placeholder="Enter task name..."
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <Button onClick={addTask}>Add Task</Button>
            </div>

            {/* Tìm kiếm và lọc */}
            <div className="flex gap-2">
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

            {/* Danh sách task */}
            <div className="flex flex-col gap-2">
                {filteredTasks.map((task) => (
                    <div
                        key={task.id}
                        className="flex justify-between p-3 rounded-lg bg-gray-100 dark:bg-neutral-800"
                    >
                        <span>{task.name}</span>
                        <span
                            className={`px-2 py-1 rounded ${
                                task.status === "Completed"
                                    ? "bg-green-500 text-white"
                                    : "bg-yellow-500 text-black"
                            }`}
                        >
                            {task.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;