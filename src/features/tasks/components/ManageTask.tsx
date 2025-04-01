import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {addTask, updateTask} from "../slices/task.slice";
import Modal from "../../../components/ui/Modal";
import DynamicForm from "../../../components/ui/DynamicForm";
import mustFieldsConfig from "../config/must-fields.config";
import {Task} from "../types/task.types";

interface ManageTaskProps {
    isOpen: boolean;
    onClose: () => void;
    isEdit: boolean;
    defaultValues?: Task;
    title: string;
}

function ManageTask({isOpen, onClose, isEdit, defaultValues, title}: ManageTaskProps) {
    const dispatch = useDispatch();
    const customFieldsConfig = useSelector((state: RootState) => state.customFields.fields);

    const handleFormSubmit = (data: Record<string, any>) => {
        if (isEdit && defaultValues) {
            dispatch(updateTask({
                ...defaultValues,
                ...data,
            }));
        } else {
            dispatch(addTask(data));
        }
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            title={title}
            onClose={onClose}>
            <DynamicForm
                config={[...mustFieldsConfig, ...customFieldsConfig]}
                onSubmit={handleFormSubmit}
                defaultValues={defaultValues}
            />
        </Modal>
    );
}

export default ManageTask;
