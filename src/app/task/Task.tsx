import TaskTable from "../../features/tasks/components/TaskTable.tsx";
import {useState} from "react";
import ManageTask from "../../features/tasks/components/ManageTask.tsx";


function Task() {
    const [isManageTaskOpen, setIsManageTaskOpen] = useState(false);

    return (
        <main>
            <h1>Task Management</h1>
            <nav>
                <button onClick={() => setIsManageTaskOpen(true)}>Create Task</button>
            </nav>
            <TaskTable/>
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
