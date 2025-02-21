import DynamicForm, {FieldConfig} from "../../../components/ui/DynamicForm.tsx";
import { z } from "zod";

function TaskForm() {
    const formConfig: FieldConfig[] = [
        {
            key: "name",
            label: "Name",
            type: "text",
            placeholder: "Enter your name",
            validation: z.string().min(2, "Name is too short"), // Require at least 2 characters
        },
        {
            key: "gender",
            label: "Gender",
            type: "select",
            options: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
            ],
            validation: z.string(), // Ensure a value is selected
        },
        {
            key: "subscribe",
            label: "Subscribe to newsletter",
            type: "checkbox",
            validation: z.boolean().optional(), // Checkbox is optional
        },
    ];

    const handleFormSubmit = (data: Record<string, any>) => {
        console.log("Form submitted with data:", data);
    };

    return (
        <>
            <DynamicForm config={formConfig} defaultValues={{ name: "John" }} onSubmit={handleFormSubmit} />
        </>
    )
}

export default TaskForm;
