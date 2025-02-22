import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../slices/task.slice.ts';
import Modal from "../../../components/ui/Modal.tsx";
import DynamicForm, {FieldConfig} from "../../../components/ui/DynamicForm.tsx";
import mustFieldsConfig from "../config/must-fields.config.ts";

function ManageTask({isOpen, onClose, isEdit, defaultValues, title=""}:  Readonly<{
    isOpen: boolean;
    onClose: () => void;
    isEdit: boolean;
    defaultValues?: Record<string, any>;
    title?: string
}>)   {
    const dispatch = useDispatch();

    const customFieldsConfig: FieldConfig[] = [];


    const handleFormSubmit = (data) => {
        if(isEdit && defaultValues?.id) {
            dispatch(updateTask({ ...data, id: defaultValues.id }));
        } else {
            dispatch(addTask(data));
        }
        onClose();
    };

    return (
        <>
            <Modal
                open={isOpen}
                title={title}
                onClose={onClose}>
                <DynamicForm config={[...mustFieldsConfig,...customFieldsConfig]} defaultValues={defaultValues} onSubmit={handleFormSubmit} />
            </Modal>
        </>
    )
}

export default ManageTask;
