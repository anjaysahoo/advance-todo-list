import Table, {Columns, SortDirection} from "../../../components/ui/Table.tsx";
import tasks from "../data/tasks.json";

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
];

function TaskTable() {
    return (
        <>
            <Table data={tasks} columns={taskColumns}/>
        </>
    );
}

export default TaskTable;
