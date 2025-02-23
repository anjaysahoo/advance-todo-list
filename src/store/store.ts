import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/slices/task.slice.ts';
import customFieldsReducer from '../features/tasks/slices/custom-fields.slice.ts';
import { localStorageMiddleware } from './localStorage.middleware.ts';
import {fetchInitialTasks} from "../features/tasks/services/task.service.ts";

// Create a store instance holder
let storeInstance: ReturnType<typeof configureStore>;

// Load initial state from localStorage
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

export const initializeStore = async () => {
    const preloadedState = await loadState();
    
    storeInstance = configureStore({
        reducer: {
            tasks: taskReducer,
            customFields: customFieldsReducer
        },
        preloadedState,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(localStorageMiddleware)
    });
    
    return storeInstance;
};

// Helper to get store instance
export const getStore = () => {
    if (!storeInstance) {
        throw new Error('Store not initialized');
    }
    return storeInstance;
};

export type RootState = ReturnType<typeof storeInstance.getState>;
export type AppDispatch = typeof storeInstance.dispatch;
