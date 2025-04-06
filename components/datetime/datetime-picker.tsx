import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { format } from "date-fns";

export default function DateTimePicker({
    label,
    date,
    setDate,
}: {
    label: string;
    date: Date | undefined;
    setDate: (value: Date | undefined) => void;
}) {
    const handleDateChange = (newDate: Date | undefined) => {
        if (!newDate) return;
        if (date) {
            newDate.setHours(date.getHours(), date.getMinutes());
        }
        setDate(newDate);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!date) return;
        const [hours, minutes] = e.target.value.split(":").map(Number);
        const newDate = new Date(date);
        newDate.setHours(hours, minutes);
        setDate(newDate);
    };

    const getTimeValue = () => {
        if (!date) return "00:00";
        return `${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
        ).padStart(2, "0")}`;
    };

    return (
        <div className="grid gap-2">
            <label className="text-sm font-medium">{label}</label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                    >
                        {date ? (
                            format(date, "PPP p")
                        ) : (
                            <span>Pick a date & time</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4 bg-white dark:bg-neutral-900">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                    />
                    <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <Input
                            type="time"
                            value={getTimeValue()}
                            onChange={handleTimeChange}
                            className="w-[120px]"
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
