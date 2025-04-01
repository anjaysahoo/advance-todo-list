import TaskTable from "../../features/tasks/components/TaskTable";
import {useState} from "react";
import ManageTask from "../../features/tasks/components/ManageTask";
import ManageCustomFields from "../../features/tasks/components/ManageCustomFields";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {Ellipsis} from "lucide-react";

function Task() {
    const [isManageCustomFieldsOpen, setIsManageCustomFieldsOpen] = useState(false);
    const [isManageTaskOpen, setIsManageTaskOpen] = useState(false);

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold">Task Management</h1>
            <nav className="flex gap-5 justify-end p-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                            <Ellipsis onClick={() => setIsManageCustomFieldsOpen(true)}/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Manage Custom Fields</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <Button onClick={() => setIsManageTaskOpen(true)}>Create Task</Button>
            </nav>
            <TaskTable/>
            <ManageCustomFields
                isOpen={isManageCustomFieldsOpen}
                onClose={() => setIsManageCustomFieldsOpen(false)}
            />
            <ManageTask
                isOpen={isManageTaskOpen}
                onClose={() => setIsManageTaskOpen(false)}
                isEdit={false}
                title="Create Task"
            />
        </main>
    );
}

export default Task;
