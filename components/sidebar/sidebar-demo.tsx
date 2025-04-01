"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SidebarDemo() {
    const links = [
        {
            label: "Dashboard",
            href: "#",
            icon: (
                <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Profile",
            href: "#",
            icon: (
                <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Settings",
            href: "#",
            icon: (
                <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
                "h-screen" 
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <Image
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <Dashboard />
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-black dark:text-white"
            >
                Todo App
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
        </Link>
    );
};

const Dashboard =  () => {
    const [tasks, setTasks] = useState([
        { id: 1, name: "Task 1", status: "Pending" },
        { id: 2, name: "Task 2", status: "Completed" },
        { id: 3, name: "Task 3", status: "Pending" },
        { id: 4, name: "Task 4", status: "Completed" },
        { id: 5, name: "Task 5", status: "Pending" },
        { id: 6, name: "Task 6", status: "Completed" },
        { id: 7, name: "Task 7", status: "Pending" },
        { id: 8, name: "Task 8", status: "Completed" },
        { id: 9, name: "Task 9", status: "Pending" },
        { id: 10, name: "Task 10", status: "Completed" },
    ]);
    const [taskName, setTaskName] = useState("");
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const addTask = () => {
        if (taskName.trim()) {
            setTasks([...tasks, { id: tasks.length + 1, name: taskName, status: "Pending" }]);
            setTaskName("");
        }
    };

    const filteredTasks = tasks.filter((task) => {
        return (filterStatus === "All" || task.status === filterStatus) &&
               task.name.toLowerCase().includes(search.toLowerCase());
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
                    <div key={task.id} className="flex justify-between p-3 rounded-lg bg-gray-100 dark:bg-neutral-800">
                        <span>{task.name}</span>
                        <span className={`px-2 py-1 rounded ${task.status === "Completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}>
                            {task.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
