import { z } from 'zod';
import { getStore } from '../../../../store/store';
import mustFieldsConfig from "../../config/must-fields.config.ts";

export const createLabelValidation = () => {
    return z.string()
        .min(2, "Name is too short")
        .regex(
            /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
            "Special character not allowed"
        )
        .refine(
            (label) => {
                const state = getStore().getState();
                const existingFields = [...state.customFields.fields, ...mustFieldsConfig];
                return !existingFields.some(
                    field => field.label.toLowerCase() === label.toLowerCase()
                );
            },
            {
                message: "This field already exists"
            }
        );
};
