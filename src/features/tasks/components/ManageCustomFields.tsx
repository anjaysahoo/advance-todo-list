import Modal from "../../../components/ui/Modal";
import DynamicForm from "../../../components/ui/DynamicForm";
import customFieldsFormConfig from "../config/custom-fields-form.config";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {addCustomField, removeCustomField} from "../slices/custom-fields.slice";
import {addCustomFieldToTasks} from "../slices/task.slice";
import {Trash} from "lucide-react";
import { Button } from "@/components/ui/button";

function ManageCustomFields({isOpen, onClose}: Readonly<{
    isOpen: boolean;
    onClose: () => void;
}>) {
    const dispatch = useDispatch();
    const customFieldsConfig = useSelector((state: RootState) => state.customFields.fields);

    const handleFormSubmit = (data: Record<string, any>) => {
        const newField = {
            key: data.label.toLowerCase().replace(/\s+/g, '_'),
            label: data.label,
            type: data.type,
            placeholder: `Enter ${data.label}`,
            options: data.type === 'checkbox' ? [
                { value: 'clear', label: "Clear" },
                { value: 'checked', label: "Checked" },
                { value: 'unchecked', label: "Unchecked" },
            ] : [],
        };

        dispatch(addCustomField(newField));
        dispatch(addCustomFieldToTasks({
            key: newField.key,
            type: newField.type
        }));
    };

    return (
        <div>
            <Modal
                open={isOpen}
                title="Manage Custom Fields"
                onClose={onClose}>
                <h3 className="font-bold py-2">Add New Custom Field</h3>
                <DynamicForm config={customFieldsFormConfig} onSubmit={handleFormSubmit} />
                <br/>
                <hr/>
                <h3 className="font-bold py-4">Existing Custom Fields</h3>
                <ul className="flex flex-col">
                    {customFieldsConfig.map((field) => (
                        <li
                            className="flex justify-between hover:bg-gray-100 p-2 rounded-md"
                            key={field.key}>
                            <p>{field.label}</p>
                            <Button
                                variant="destructive"
                                size="icon"
                                className="cursor-pointer"
                                onClick={() => dispatch(removeCustomField(field.key))}>
                                <Trash />
                            </Button>
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
}

export default ManageCustomFields;
