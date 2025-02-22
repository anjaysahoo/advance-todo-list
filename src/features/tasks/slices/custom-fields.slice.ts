import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CustomFieldConfig = {
    key: string;
    label: string;
    type: "text" | "select" | "checkbox" | "number";
    placeholder?: string;
    options?: { value: string; label: string }[];
};

interface CustomFieldsState {
    fields: CustomFieldConfig[];
}

const initialState: CustomFieldsState = {
    fields: []
};



const customFieldsSlice = createSlice({
    name: 'customFields',
    initialState,
    reducers: {
        addCustomField: (state, action: PayloadAction<CustomFieldConfig>) => {
            console.log("Adding custom field:", action.payload);
            state.fields.push(action.payload);
        },
        deleteCustomField: (state, action: PayloadAction<string>) => {
            state.fields = state.fields.filter(field => field.key !== action.payload);
        }
    }
});

export const { addCustomField, deleteCustomField } = customFieldsSlice.actions;
export default customFieldsSlice.reducer; 
