import {FieldConfig} from "../../../components/ui/DynamicForm.tsx";
import { z } from "zod";

const customFieldsFormConfig: FieldConfig[] = [
    {
        key: "label",
        label: "Name",
        type: "text",
        placeholder: "Enter Field Name",
        validation: z.string().min(2, "Name is too short").regex(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, "Special character not allowed"), // Require at least 2 characters
    },
    {
        key: "type",
        label: "Type",
        type: "select",
        options: [
            { value: "", label: "Select Field Type" },
            { value: "text", label: "Text" },
            { value: "number", label: "Number" },
            { value: "checkbox", label: "Checkbox" },
        ],
        validation: z.string().min(1, "Status is required"), // Ensure a value is selected
    }
];

export default customFieldsFormConfig;
