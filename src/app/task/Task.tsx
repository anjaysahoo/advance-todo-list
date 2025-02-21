import TaskTable from "../../features/tasks/components/TaskTable.tsx";
import {useState} from "react";
import ManageTask from "../../features/tasks/components/ManageTask.tsx";
import ManageCustomFields from "../../features/tasks/components/ManageCustomFields.tsx";


function Task() {
    const [isManageCustomFieldsOpen, setIsManageCustomFieldsOpen] = useState(false);
    const [isManageTaskOpen, setIsManageTaskOpen] = useState(false);

    return (
        <main>
            <h1>Task Management</h1>
            <nav>
                <button onClick={() => setIsManageCustomFieldsOpen(true)}>Manage Custom Fields</button>
                <button onClick={() => setIsManageTaskOpen(true)}>Create Task</button>
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
                defaultValues={{ name: "John" }}
                title={'Create Task'}
            />
        </main>
    )
}

export default Task;
