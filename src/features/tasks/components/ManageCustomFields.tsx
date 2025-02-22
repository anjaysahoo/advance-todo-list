import Modal from "../../../components/ui/Modal.tsx";
import DynamicForm, {FieldConfig} from "../../../components/ui/DynamicForm.tsx";
import camelize from "../utils/helper/camelize.helper.ts";
import customFieldsFormConfig from "../config/custom-fields-form.config.ts";

function ManageCustomFields({isOpen, onClose}:  Readonly<{
    isOpen: boolean;
    onClose: () => void;
}>)    {

    const customFieldsConfig: FieldConfig[] = [];

    const handleFormSubmit = (data: Record<string, any>) => {
            console.log("Form submitted with data:", data);

            const newField = {
                key: camelize(data.label),
                label: data.label,
                type: data.type
            }

        console.log("New Field:", newField);
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
                            <button>Delete</button>
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
}

export default ManageCustomFields;
