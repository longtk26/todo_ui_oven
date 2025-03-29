import { componentsInForm } from "../form/form.data";
import TaskOption from "./task-option";
import { optionForPriority, optionForStatus } from "./task.data";
import { TaskEditType } from "./task.types";

const TaskEdit = ({
    onShowTaskEdit,
    onSubmited,
    ...taskInfos
}: TaskEditType) => {
    const listInfoInform = componentsInForm["task"];
    const taskInfoReduce: { [key: string]: string } = Object.entries(
        taskInfos
    ).reduce((acc, [key, value]) => ({ ...acc, [key]: value || "" }), {});

    return (
        <div
            onClick={() => onShowTaskEdit(false)}
            className="fixed inset-0 z-10 overflow-y-auto bg-black/30 bg-opacity-10 flex justify-center items-center"
        >
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={onSubmited}
                className="py-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 bg-white rounded-2xl px-4"
            >
                <div className="relative mt-6">
                    {listInfoInform.map((item) => (
                        <div className="relative mt-6" key={item.name}>
                            <input
                                autoComplete={item.autoComplete}
                                id={item.name}
                                name={item.name}
                                type={item.type}
                                defaultValue={taskInfoReduce[item.name]}
                                required={item.required}
                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                placeholder={item.placeHolder}
                            />
                            <label
                                htmlFor={item.name}
                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                                {item.label}
                            </label>
                        </div>
                    ))}
                    {/* Options for priority */}
                    <TaskOption 
                        type="priority"
                        defaultValue={taskInfos?.priority?.toString() || ''}
                        listOptions={optionForPriority}
                        label="priority"
                    />

                    {/* Option for status */}
                    <TaskOption 
                        type="status"
                        defaultValue={taskInfos?.status?.toString() || ''}
                        listOptions={optionForStatus}
                        label="status"
                    />
                </div>
                <div className="relative">
                    <button
                        className="bg-cyan-500 text-white rounded-md px-2 py-1 cursor-pointer"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskEdit;
