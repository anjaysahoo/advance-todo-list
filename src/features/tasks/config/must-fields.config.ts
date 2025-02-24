import {FieldConfig} from "../../../components/ui/DynamicForm.tsx";
import {z} from "zod";
import {PRIORITY_OPTIONS, STATUS_OPTIONS} from "./must-task-column.config.ts";

const mustFieldsConfig: FieldConfig[] = [
    {
        key: "title",
        label: "Title",
        type: "text",
        placeholder: "Enter Title",
        validation: z.string().min(2, "Name is too short"), // Require at least 2 characters
    },
    {
        key: "status",
        label: "Status",
        type: "select",
        placeholder: "Select Status",
        options: [
            ...STATUS_OPTIONS
        ],
        validation: z.string().min(1, "Status is required"), // Ensure a value is selected
    },
    {
        key: "priority",
        label: "Priority",
        type: "select",
        placeholder: "Select Priority",
        options: [
            ...PRIORITY_OPTIONS
        ],
        validation: z.string().min(1, "Priority is required"), // Ensure a value is selected
    },
];

export default mustFieldsConfig
