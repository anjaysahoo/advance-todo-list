import {FieldConfig} from "../../../components/ui/DynamicForm.tsx";
import { z } from "zod";
import { createLabelValidation } from "../utils/validation/custom-field.validation.ts";

const customFieldsFormConfig: FieldConfig[] = [
    {
        key: "label",
        label: "Name",
        type: "text",
        placeholder: "Enter Field Name",
        validation: createLabelValidation(),
    },
    {
        key: "type",
        label: "Type",
        type: "select",
        placeholder: "Select Field Type",
        options: [
            { value: "text", label: "Text" },
            { value: "number", label: "Number" },
            { value: "checkbox", label: "Checkbox" },
        ],
        validation: z.string().min(1, "Type is required"),
    }
];

export default customFieldsFormConfig;
