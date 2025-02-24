import {useDispatch, useSelector} from 'react-redux';
import { addTask, updateTask } from '../slices/task.slice.ts';
import Modal from "../../../components/ui/Modal.tsx";
import DynamicForm from "../../../components/ui/DynamicForm.tsx";
import mustFieldsConfig from "../config/must-fields.config.ts";
import {RootState} from "@reduxjs/toolkit/query";

function ManageTask({isOpen, onClose, isEdit, defaultValues, title=""}:  Readonly<{
    isOpen: boolean;
    onClose: () => void;
    isEdit: boolean;
    defaultValues?: Record<string, any>;
    title?: string
}>)   {
    const dispatch = useDispatch();
    const customFieldsConfig = useSelector((state: RootState) => state.customFields.fields);


    const handleFormSubmit = (data) => {
        toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        })
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
