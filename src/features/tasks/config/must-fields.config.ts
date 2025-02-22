import {FieldConfig} from "../../../components/ui/DynamicForm.tsx";
import {z} from "zod";

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
        options: [
            { value: "", label: "Select Status" },
            { value: "completed", label: "Completed" },
            { value: "in_progress", label: "In Progress" },
            { value: "not_started", label: "Not Started" },
        ],
        validation: z.string().min(1, "Status is required"), // Ensure a value is selected
    },
    {
        key: "priority",
        label: "Priority",
        type: "select",
        options: [
            { value: "", label: "Select Priority" },
            { value: "urgent", label: "Urgent" },
            { value: "high", label: "High" },
            { value: "low", label: "Low" },
            { value: "none", label: "None" },
        ],
        validation: z.string().min(1, "Priority is required"), // Ensure a value is selected
    },
];

export default mustFieldsConfig
