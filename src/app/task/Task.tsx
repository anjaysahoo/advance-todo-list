import TaskTable from "../../features/tasks/components/TaskTable.tsx";
import CreateTask from "../../features/tasks/components/CreateTask.tsx";
import {useState} from "react";

function Task() {
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

    return (
        <main>
            <h1>Task Management</h1>
            <nav>
                <button onClick={() => setIsCreateTaskOpen(true)}>Create Task</button>
            </nav>
            <TaskTable/>
            <CreateTask isOpen={isCreateTaskOpen} onClose={() => setIsCreateTaskOpen(false)}/>
        </main>
    )
}

export default Task;
