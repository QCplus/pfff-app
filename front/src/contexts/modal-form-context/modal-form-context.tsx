import React from "react";
import { Modal } from "antd";
import { modalFormReducer, ModalFormState } from "./modal-form-reducer";
import { ModalFormActionType } from "./modal-form-actions";
import ModalFormOptions from "./modal-form-options";

const INITIAL_STATE = {
    isOpen: false,
    title: "",
    openModal: (title: string, content: React.ReactNode): void => undefined,
    closeModal: (): void => undefined,
    clearOnClose: false,
} as ModalFormState;

export const ModalFormContext = React.createContext(INITIAL_STATE);

export const ModalFormProvider = (props: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(modalFormReducer, INITIAL_STATE);

    const handleOpenModal = (
        title: string,
        content: React.ReactNode,
        openOptions?: ModalFormOptions
    ) => {
        dispatch({
            type: ModalFormActionType.OpenModal,
            title: title,
            content: content,
            openOptions: openOptions,
        });
    };

    const handleCloseModal = () => {
        dispatch({
            type: ModalFormActionType.CloseModal,
        });
    };

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
    );
};

export default ModalFormProvider;
