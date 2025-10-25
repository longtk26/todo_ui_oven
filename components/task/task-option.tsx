import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { TaskOptionType } from "./task.types";

const TaskOption = ({
    label,
    value,
    listOptions,
    onChange,
}: TaskOptionType) => {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Select onValueChange={onChange} value={value}>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {listOptions?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default TaskOption;
