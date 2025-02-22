import {Columns, SortDirection} from "../../../components/ui/Table.tsx";
import {Task} from "../slices/task.slice.ts";

const PRIORITY_OPTIONS = ['urgent', 'high', 'medium', 'low', 'none'];
const STATUS_OPTIONS = ['completed', 'in_progress', 'not_started'];

const mustTaskColumnConfig: Columns<Task> = [
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

export default mustTaskColumnConfig;
