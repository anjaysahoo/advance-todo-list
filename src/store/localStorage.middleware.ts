import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store';

interface TypedAction {
    type: string;
}

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    
    const typedAction = action as TypedAction;
    if (typeof typedAction.type === 'string') {
        if (typedAction.type.startsWith('tasks/')) {
            const state = store.getState() as RootState;
            localStorage.setItem('tasks', JSON.stringify(state.tasks.tasks));
        }

        if (typedAction.type.startsWith('customFields/')) {
            const state = store.getState() as RootState;
            localStorage.setItem('customFields', JSON.stringify(state.customFields.fields));
        }
    }

    return result;
}; 