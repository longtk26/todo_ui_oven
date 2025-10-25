export const optionForStatus = [
    {
        value: "in_progress",
        name: "In pogress",
    },
    {
        value: "pending",
        name: "Pending",
    },
    {
        value: "completed",
        name: "Completed",
    },
];

export const optionForPriority = [
    {
        value: "low",
        name: "Low",
    },
    {
        value: "medium",
        name: "Medium",
    },
    {
        value: "high",
        name: "High",
    },
];

export const StatusColor: { [key: string]: string } = {
    PENDING: "text-yellow-600",
    COMPLETED: "text-green-600",
    IN_PROGRESS: "text-blue-600",
};

export const PriorityColor: { [key: string]: string } = {
    LOW: "text-blue-600",
    MEDIUM: "text-yellow-600",
    HIGH: "text-red-600",
};
