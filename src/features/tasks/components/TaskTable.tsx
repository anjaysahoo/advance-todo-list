import {useState} from "react";
import ManageTask from "./ManageTask";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {deleteTask} from "../slices/task.slice";
import mustTaskColumnConfig from "../config/must-task-column.config";
import Modal from "../../../components/ui/Modal";
import CustomizableTable, {Columns, SortDirection} from "@/components/table/CustomizableTable";
import {Pencil, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import { Task } from '../types/task.types';

interface CustomField {
    key: string;
    label: string;
    type: string;
    options?: { value: string; label: string }[];
}

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

function TaskTable() {
    const checkboxOrder: Record<string, number> = { 'true': 1, 'false': 2, 'null': 3 };
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const customFields = useSelector((state: RootState) => state.customFields.fields);
    const [isManageTaskOpen, setIsManageTaskOpen] = useState(false);
    const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
    const [title, setTitle] = useState('');

    const customTaskColumns: Columns<Task> = customFields.map((field: CustomField) => ({
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
            const aVal = String(a[field.key] ?? getDefaultValue(field.type));
            const bVal = String(b[field.key] ?? getDefaultValue(field.type));

            if (field.type === 'checkbox') {
                return direction === 'asc' ?
                    checkboxOrder[aVal] - checkboxOrder[bVal] :
                    checkboxOrder[bVal] - checkboxOrder[aVal];
            }

            return direction === 'asc' ?
                String(aVal).localeCompare(String(bVal)) :
                String(bVal).localeCompare(String(aVal));
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
                <Pencil size={18}
                        strokeWidth={1.5}
                        className="cursor-pointer"
                        onClick={() => {
                    setIsManageTaskOpen(true);
                    setCurrentTask(task);
                    setTitle('Edit Task');
                }}
                />
            )),
            comparator: () => 0,
            filterType: null,
        },
        {
            label: 'Delete',
            key: 'delete',
            renderCell: ((task: Task) => (
                <Trash
                    size={18}
                    strokeWidth={1.5}
                    className="cursor-pointer"
                    onClick={() => {
                    setCurrentTask(task);
                    setIsDeleteTaskOpen(true);
                    setTitle('Delete Task');
                    }}
                />
            )),
            comparator: () => 0,
            filterType: null,
        },
    ];

    return (
        <>
            <CustomizableTable data={tasks} columns={[...mustTaskColumnConfig, ...customTaskColumns, ...editDeleteTaskColumns]}/>
            <ManageTask
                isOpen={isManageTaskOpen}
                onClose={() => setIsManageTaskOpen(false)}
                isEdit={true}
                defaultValues={currentTask}
                title={title}
            />
            <Modal
                open={isDeleteTaskOpen}
                title={title}
                onClose={() => setIsDeleteTaskOpen(false) }>
                <div className="flex flex-col gap-4">
                    <div>
                        Are you sure you want to delete this task?
                    </div>
                    <Button
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={() => {
                            if (currentTask?.id) {
                                dispatch(deleteTask(currentTask.id));
                                setIsDeleteTaskOpen(false);
                            }
                        }}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default TaskTable;
