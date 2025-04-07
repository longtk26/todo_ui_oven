import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { format } from "date-fns";
import { TaskDetialType } from "./task.types";
import _ from "lodash";
const TaskDetail = ({
    detailOpen,
    setDetailOpen,
    selectedTask,
}: TaskDetialType) => {
    return (
        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Task Details</DialogTitle>
                </DialogHeader>
                {selectedTask && (
                    <div className="space-y-2 text-sm">
                        <p>
                            <strong>Name:</strong> {selectedTask.title}
                        </p>
                        <p>
                            <strong>Description:</strong>{" "}
                            {selectedTask.description}
                        </p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {_.capitalize(selectedTask.status).replace(
                                /_/g,
                                " "
                            )}
                        </p>
                        <p>
                            <strong>Priority:</strong>{" "}
                            {_.capitalize(selectedTask.priority)}
                        </p>
                        <p>
                            <strong>Start Date:</strong>{" "}
                            {format(selectedTask.startDate, "PPP")}
                        </p>
                        <p>
                            <strong>End Date:</strong>{" "}
                            {selectedTask.dueDate
                                ? format(selectedTask.dueDate, "PPP")
                                : "Not set"}
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default TaskDetail;
