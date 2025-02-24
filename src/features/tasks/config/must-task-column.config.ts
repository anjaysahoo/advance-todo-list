import {Task} from "../slices/task.slice.ts";
import {Columns, SortDirection} from "@/components/table/CustomizableTable.tsx";

export const STATUS_OPTIONS  = [
    { value: "completed", label: "Completed" },
    { value: "in_progress", label: "In Progress" },
    { value: "not_started", label: "Not Started" },
];
export const PRIORITY_OPTIONS = [
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
    { value: "none", label: "None" },
];

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
