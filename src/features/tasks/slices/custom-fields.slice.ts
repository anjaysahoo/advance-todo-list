import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CustomField {
    key: string;
    label: string;
    type: "text" | "select" | "checkbox" | "number";
    options?: { value: string; label: string }[];
}

export interface CustomFieldsState {
    fields: CustomField[];
}

const initialState: CustomFieldsState = {
    fields: [],
};

const customFieldsSlice = createSlice({
    name: 'customFields',
    initialState,
    reducers: {
        addCustomField: (state, action: PayloadAction<CustomField>) => {
            state.fields.push(action.payload);
        },
        removeCustomField: (state, action: PayloadAction<string>) => {
            state.fields = state.fields.filter(field => field.key !== action.payload);
        },
        setCustomFields: (state, action: PayloadAction<CustomField[]>) => {
            state.fields = action.payload;
        },
    },
});

export const { addCustomField, removeCustomField, setCustomFields } = customFieldsSlice.actions;
export default customFieldsSlice.reducer; 
