import Table, {Columns, SortDirection} from "../../../components/ui/Table.tsx";
import tasks from "../data/tasks.json";
import {useState} from "react";
import ManageTask from "./ManageTask.tsx";

type Priority = 'urgent' | 'high' | 'medium' | 'low' | 'none';
type Status = 'completed' | 'in_progress' | 'not_started';

type Task = {
    id: number;
    title: string;
    priority: Priority;
    status: Status;
};

const PRIORITY_OPTIONS = ['urgent', 'high', 'medium', 'low', 'none'];
const STATUS_OPTIONS = ['completed', 'in_progress', 'not_started'];



function TaskTable() {
    const [isManageTaskOpen, setIsManageTaskOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState({});
    const [title, setTitle] = useState('');

    const taskColumns: Columns<Task> = [
        {
            label: 'ID',
            key: 'id',
            renderCell: (task: Task) => task.id,
            comparator: (a: Task, b: Task, direction: SortDirection) =>
                direction === 'asc' ? a.id - b.id : b.id - a.id,
            filterType: null,
        },
        {
            label: 'Title',
            key: 'title',
            renderCell: (task: Task) => task.title,
            comparator: (a: Task, b: Task, direction: SortDirection) =>
                direction === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title),
            filterType: 'string',
        },
        {
            label: 'Priority',
            key: 'priority',
            renderCell: (task: Task) => task.priority,
            comparator: (a: Task, b: Task, direction: SortDirection) =>
                direction === 'asc'
                    ? a.priority.localeCompare(b.priority)
                    : b.priority.localeCompare(a.priority),
            filterType: 'select',
            filterOptions: PRIORITY_OPTIONS,
        },
        {
            label: 'Status',
            key: 'status',
            renderCell: (task: Task) => task.status,
            comparator: (a: Task, b: Task, direction: SortDirection) =>
                direction === 'asc'
                    ? a.status.localeCompare(b.status)
                    : b.status.localeCompare(a.status),
            filterType: 'select',
            filterOptions: STATUS_OPTIONS,
        },
        {
            label: 'Edit',
            key: 'edit',
            renderCell: ((task: Task) => (
                <button onClick={() => {
                    setIsManageTaskOpen(true);
                    setCurrentTask(task);
                    setTitle('Edit Task');
                }}>
                    Edit
                </button>
            )),
            comparator: () => null,
            filterType: null,
        },
        {
            label: 'Delete',
            key: 'delete',
            renderCell: (() => (<button>Delete</button>)),
            comparator: () => null,
            filterType: null,
        },
    ];

    return (
        <>
            <Table data={tasks} columns={taskColumns}/>
            <ManageTask
                isOpen={isManageTaskOpen}
                onClose={() => setIsManageTaskOpen(false)}
                isEdit={false}
                defaultValues={currentTask}
                title={title}
            />
        </>
    );
}

export default TaskTable;
