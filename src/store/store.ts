import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/slices/task.slice.ts';
import customFieldsReducer from '../features/tasks/slices/custom-fields.slice.ts';

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        customFields: customFieldsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
