import { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = store => next => action => {
    const result = next(action);
    
    if (action.type.startsWith('tasks/')) {
        const state = store.getState();
        localStorage.setItem('tasks', JSON.stringify(state.tasks.tasks));
    }
    
    if (action.type.startsWith('customFields/')) {
        const state = store.getState();
        localStorage.setItem('customFields', JSON.stringify(state.customFields.fields));
    }
    
    return result;
}; 