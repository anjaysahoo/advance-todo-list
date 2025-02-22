import Modal from "../../../components/ui/Modal.tsx";
import DynamicForm from "../../../components/ui/DynamicForm.tsx";
import camelize from "../utils/helper/camelize.helper.ts";
import customFieldsFormConfig from "../config/custom-fields-form.config.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import {addCustomField, deleteCustomField} from "../slices/custom-fields.slice.ts";
import {addCustomFieldToTasks} from "../slices/task.slice.ts";

function ManageCustomFields({isOpen, onClose}:  Readonly<{
    isOpen: boolean;
    onClose: () => void;
}>)    {

    const dispatch = useDispatch();
    const customFieldsConfig = useSelector((state: RootState) => state.customFields.fields);

    const handleFormSubmit = (data: Record<string, any>) => {
        const newField = {
            key: camelize(data.label),
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
                title={"Manage Custom Fields"}
                onClose={onClose}>
                <h3>Add New Custom Field</h3>
                <DynamicForm config={customFieldsFormConfig} onSubmit={handleFormSubmit} />
                <br/>
                <h3>Existing Custom Fields</h3>
                <ul>
                    {customFieldsConfig.map((field) => (
                        <li key={field.key}>
                            <p>{field.label}</p>
                            <button onClick={() => dispatch(deleteCustomField(field.key))}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
}

export default ManageCustomFields;
