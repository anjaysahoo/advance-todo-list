import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Priority = 'urgent' | 'high' | 'medium' | 'low' | 'none';
type Status = 'completed' | 'in_progress' | 'not_started';

export type Task = {
    id: number;
    title: string;
    priority: Priority;
    status: Status;
    [key: string]: any; // Allow dynamic fields
};

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: []
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
            const newId = crypto.randomUUID();
            state.tasks.unshift({ ...action.payload, id: newId });
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            console.log("Updating task :", action.payload);
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            console.log("Deleting task with ID:", action.payload);
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        addCustomFieldToTasks: (state, action: PayloadAction<{key: string, type: string}>) => {
            state.tasks = state.tasks.map(task => ({
                ...task,
                [action.payload.key]: getDefaultValue(action.payload.type)
            }));
        }
    }
});

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

export const { addTask, updateTask, deleteTask, addCustomFieldToTasks } = taskSlice.actions;
export default taskSlice.reducer;
