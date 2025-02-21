import Modal from "../../../components/ui/Modal.tsx";
import DynamicForm, {FieldConfig} from "../../../components/ui/DynamicForm.tsx";
import { z } from "zod";

function ManageTask({isOpen, onClose, isEdit, defaultValues, title=""}:  Readonly<{
    isOpen: boolean;
    onClose: () => void;
    isEdit: boolean;
    defaultValues?: Record<string, any>;
    title?: string
}>)   {

    const formConfig: FieldConfig[] = [
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

    const handleFormSubmit = (data: Record<string, any>) => {
        if(isEdit)
            console.log("Edit form submitted with data:", data);
        else
            console.log("Create form submitted with data:", data);
    };

    return (
        <>
            <Modal
                open={isOpen}
                title={title}
                onClose={onClose}>
                <DynamicForm config={formConfig} defaultValues={defaultValues} onSubmit={handleFormSubmit} />
            </Modal>
        </>
    )
}

export default ManageTask;
