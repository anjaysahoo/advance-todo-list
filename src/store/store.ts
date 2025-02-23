import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/slices/task.slice.ts';
import customFieldsReducer from '../features/tasks/slices/custom-fields.slice.ts';
import { fetchInitialTasks } from '../features/tasks/services/task.service';
import {localStorageMiddleware} from "./localStorage.middleware.ts";

const loadState = async () => {
    try {
        const tasksData = localStorage.getItem('tasks');
        const customFieldsData = localStorage.getItem('customFields');
        
        let tasks = [];
        if (tasksData) {
            tasks = JSON.parse(tasksData);
        } else {
            tasks = await fetchInitialTasks();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        
        return {
            tasks: {
                tasks
            },
            customFields: {
                fields: customFieldsData ? JSON.parse(customFieldsData) : []
            }
        };
    } catch (err) {
        console.error('Error loading state:', err);
        return undefined;
    }
};

let store: ReturnType<typeof configureStore>;
const initializeStore = async () => {
    const preloadedState = await loadState();
    
    store = configureStore({
        reducer: {
            tasks: taskReducer,
            customFields: customFieldsReducer
        },
        preloadedState,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(localStorageMiddleware)
    });
    
    return store;
};

export { initializeStore };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
