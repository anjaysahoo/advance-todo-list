import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { TaskState } from '../features/tasks/slices/task.slice';
import customFieldsReducer, { CustomFieldsState } from '../features/tasks/slices/custom-fields.slice';
import { localStorageMiddleware } from './localStorage.middleware';
import { fetchInitialTasks } from '../features/tasks/services/task.service';

export interface AppState {
    tasks: TaskState;
    customFields: CustomFieldsState;
}

const createStore = () => configureStore({
    reducer: {
        tasks: tasksReducer,
        customFields: customFieldsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});

let store: ReturnType<typeof createStore> | null = null;

export const initializeStore = async () => {
    const initialTasks = await fetchInitialTasks();
    
    store = createStore();
    store.dispatch({ type: 'tasks/setTasks', payload: initialTasks });
    
    return store;
};

export type RootState = AppState;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

export const getStore = () => {
    if (!store) {
        throw new Error('Store not initialized');
    }
    return store;
};
