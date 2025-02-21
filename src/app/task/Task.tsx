import TaskTable from "../../features/tasks/components/TaskTable.tsx";
import TaskForm from "../../features/tasks/components/TaskForm.tsx";

function Task() {
    return (
        <main>
            <h1>Task Management</h1>
            <TaskTable/>
            <TaskForm/>
        </main>
    )
}

export default Task;
