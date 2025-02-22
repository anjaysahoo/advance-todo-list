import Table, {Columns, SortDirection} from "../../../components/ui/Table.tsx";
import {useState} from "react";
import ManageTask from "./ManageTask.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import {deleteTask} from "../slices/task.slice.ts";
import mustTaskColumnConfig from "../config/must-task-column.config.ts";

type Priority = 'urgent' | 'high' | 'medium' | 'low' | 'none';
type Status = 'completed' | 'in_progress' | 'not_started';

type Task = {
    id: number;
    title: string;
    priority: Priority;
    status: Status;
    [key: string]: any;
};

// Helper functions moved to the top
const getFilterType = (type: string): 'string' | 'range' | 'select' | 'radio' | null => {
    switch (type) {
        case 'number':
            return 'range';
        case 'text':
            return 'string';
        case 'checkbox':
            return 'radio';
        default:
            return null;
    }
};

const getDefaultValue = (type: string) => {
    switch (type) {
        case 'number':
            return 0;
        case 'text':
            return '';
        case 'checkbox':
            return false;
        default:
            return null;
    }
};


function TaskTable() {
    const checkboxOrder = { true: 1, false: 2, null: 3 };
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const customFields = useSelector((state: RootState) => state.customFields.fields);
    const [isManageTaskOpen, setIsManageTaskOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | {}>({});
    const [title, setTitle] = useState('');

    const customTaskColumns: Columns<Task> = customFields.map(field => ({
        label: field.label,
        key: field.key,
        renderCell: (task: Task) => {
            if (field.type === 'checkbox') {
                return (
                    <input
                        type="checkbox"
                        checked={task[field.key] ?? false}
                        readOnly
                    />
                );
            }
            return task[field.key] ?? getDefaultValue(field.type);
        },
        comparator: (a: Task, b: Task, direction: SortDirection) => {
            const aVal = a[field.key] ?? getDefaultValue(field.type);
            const bVal = b[field.key] ?? getDefaultValue(field.type);

            switch (field.type) {
                case 'number':
                    return direction === 'asc' ?
                        Number(aVal) - Number(bVal) :
                        Number(bVal) - Number(aVal);
                case 'checkbox':
                    return direction === 'asc' ?
                        checkboxOrder[aVal] - checkboxOrder[bVal] :
                        checkboxOrder[bVal] - checkboxOrder[aVal];
                default:
                    return direction === 'asc' ?
                        String(aVal).localeCompare(String(bVal)) :
                        String(bVal).localeCompare(String(aVal));
            }
        },
        filterType: getFilterType(field.type),
        filterOptions: field.type === 'checkbox' ? [
            { value: 'clear', label: "Clear" },
            { value: 'checked', label: "Checked" },
            { value: 'unchecked', label: "Unchecked" },
        ] : field.options
    }));

    const editDeleteTaskColumns: Columns<Task> = [
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
            renderCell: ((task: Task) => (
                <button onClick={() => dispatch(deleteTask(task.id))}>
                    Delete
                </button>
            )),
            comparator: () => null,
            filterType: null,
        },
    ];

    return (
        <>
            <Table data={tasks} columns={[...mustTaskColumnConfig, ...customTaskColumns, ...editDeleteTaskColumns]}/>
            <ManageTask
                isOpen={isManageTaskOpen}
                onClose={() => setIsManageTaskOpen(false)}
                isEdit={true}
                defaultValues={currentTask}
                title={title}
            />
        </>
    );
}

export default TaskTable;
