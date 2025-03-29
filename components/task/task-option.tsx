import { TaskOptionType } from "./task.types";

const TaskOption = ({type, defaultValue, listOptions, label}: {
    type: string;
    defaultValue: string;
    listOptions: TaskOptionType[];
    label: string;
}) => {
    return (
        <div className="relative mt-6">
            <select
                name={type}
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                defaultValue={defaultValue.toLowerCase()}
                required
            >
                {listOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            <label
                htmlFor={label}
                className="absolute capitalize left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
                {label}
            </label>
        </div>
    );
};

export default TaskOption;
