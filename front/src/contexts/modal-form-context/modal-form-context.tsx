import React from "react";
import { Modal } from "antd";
import { modalFormReducer, ModalFormState } from "./modal-form-reducer";
import { ModalFormActionType } from "./modal-form-actions";

const INITIAL_STATE = {
    isOpen: false,
    title: '',
    openModal: (title: string, content: React.ReactNode): void => undefined,
    closeModal: (): void => undefined,
} as ModalFormState;

export const ModalFormContext = React.createContext(INITIAL_STATE);

export const ModalFormProvider = (props: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(modalFormReducer, INITIAL_STATE);

    const handleOpenModal = (title: string, content: React.ReactNode) => {
        dispatch({
            type: ModalFormActionType.OpenModal,
            title: title,
            content: content,
        });
    }

    const handleCloseModal = () => {
        dispatch({
            type: ModalFormActionType.CloseModal
        });
    }

    const value = {
        isOpen: state.isOpen,
        content: state.content,
        title: state.title,
        openModal: handleOpenModal,
        closeModal: handleCloseModal,
    } as ModalFormState;

    return (
        <ModalFormContext.Provider value={value}>
            <Modal
                open={value.isOpen}
                onCancel={value.closeModal}
                footer={[]}
                title={value.title}
            >
                {value.content}
            </Modal>

            {props.children}
        </ModalFormContext.Provider>
    )
}

export default ModalFormProvider;