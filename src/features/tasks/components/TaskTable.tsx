import Table, {Columns, SortDirection} from "../../../components/ui/Table.tsx";
import {useState} from "react";
import ManageTask from "./ManageTask.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/query";
import {deleteTask} from "../slices/task.slice.ts";
import mustTaskColumnConfig from "../config/must-task-column.config.ts";

type Priority = 'urgent' | 'high' | 'medium' | 'low' | 'none';
type Status = 'completed' | 'in_progress' | 'not_started';

type Task = {
    id: number;
    title: string;
    priority: Priority;
    status: Status;
};



function TaskTable() {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const [isManageTaskOpen, setIsManageTaskOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState({});
    const [title, setTitle] = useState('');

    const customTaskColumns: Columns<Task> = []

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
