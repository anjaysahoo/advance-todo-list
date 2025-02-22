import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import tasks from '.././data/tasks.json';

type Priority = 'urgent' | 'high' | 'medium' | 'low' | 'none';
type Status = 'completed' | 'in_progress' | 'not_started';

export type Task = {
    id: number;
    title: string;
    priority: Priority;
    status: Status;
};

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: tasks
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
            const newId = Math.max(...state.tasks.map(task => task.id)) + 1;
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
        }
    }
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
