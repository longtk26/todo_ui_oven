import { useState } from "react";
import TaskCreate from "../task/task-action";
import { optionForStatus } from "../task/task.data";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import TaskAction from "../task/task-action";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const DashboardHeader = () => {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2">
                <Input
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-neutral-300 dark:border-neutral-700"
                />
                <Select onValueChange={setFilterStatus} value={filterStatus}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {optionForStatus.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <TaskAction
                buttonAction={
                    <Button className="cursor-pointer bg-white border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700">
                        <PlusIcon />
                        Add Task
                    </Button>
                }
                action="add"
                defaultStatus="PENDING"
                defaultPriority="LOW"
            />
        </div>
    );
};

export default DashboardHeader;
