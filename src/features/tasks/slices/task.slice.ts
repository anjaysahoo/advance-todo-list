import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task.types';

export interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
            const newId = state.tasks.length > 0 ? Math.max(...state.tasks.map(t => t.id)) + 1 : 1;
            state.tasks.unshift({ ...action.payload, id: newId } as Task);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
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

export const { setTasks, addTask, updateTask, deleteTask, addCustomFieldToTasks } = taskSlice.actions;
export default taskSlice.reducer;
